package com.xhhao.dataStatistics.service.impl;

import static org.apache.commons.lang3.ObjectUtils.defaultIfNull;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.xhhao.dataStatistics.common.Constants;
import com.xhhao.dataStatistics.service.SettingConfigGetter;
import com.xhhao.dataStatistics.service.StatisticalService;
import com.xhhao.dataStatistics.vo.PieChartVO;

import cn.hutool.core.util.StrUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import run.halo.app.core.extension.content.Category;
import run.halo.app.core.extension.content.Comment;
import run.halo.app.core.extension.content.Post;
import run.halo.app.core.extension.content.Tag;
import run.halo.app.extension.GroupVersionKind;
import run.halo.app.extension.ListOptions;
import run.halo.app.extension.ReactiveExtensionClient;
import run.halo.app.extension.Unstructured;
import run.halo.app.extension.index.query.Queries;
import run.halo.app.extension.router.selector.FieldSelector;

@Slf4j
@Component
@RequiredArgsConstructor
public class StatisticalServiceImpl implements StatisticalService {

    private static final GroupVersionKind MOMENT_GVK =
        new GroupVersionKind("moment.halo.run", "v1alpha1", "Moment");

    private final ReactiveExtensionClient client;
    private final SettingConfigGetter settingConfigGetter;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private volatile Mono<PieChartVO> cachedChartData;

    @Override
    public Mono<PieChartVO> getPieChartVO() {
        if (cachedChartData == null) {
            cachedChartData = buildPieChartVO()
                .cache(Duration.ofMinutes(Constants.Cache.CHART_DATA_CACHE_MINUTES));
        }
        return cachedChartData
            .onErrorResume(e -> {
                log.warn("缓存的图表数据失效，重新获取: {}", e.getMessage());
                cachedChartData = null;
                return buildPieChartVO();
            });
    }

    @Override
    public void clearCache() {
        cachedChartData = null;
        log.info("已清除站内图表统计缓存");
    }

    private Mono<PieChartVO> buildPieChartVO() {
        Mono<SettingConfigGetter.BasicsConfig> basicsMono = settingConfigGetter.getBasicsConfig()
            .defaultIfEmpty(new SettingConfigGetter.BasicsConfig());

        Mono<List<PieChartVO.Tag>> tagsMono = client.listAll(Tag.class, new ListOptions(),
                Sort.by(Sort.Order.desc("metadata.creationTimestamp")))
            .map(tag -> {
                PieChartVO.Tag tagVO = new PieChartVO.Tag();
                tagVO.setName(tag.getSpec().getDisplayName());
                tagVO.setCount(defaultIfNull(tag.getStatus() != null ? tag.getStatus().getVisiblePostCount() : 0, 0));
                tagVO.setPermalink(tag.getStatus() != null ? tag.getStatus().getPermalink() : null);
                return tagVO;
            })
            .collectList();

        Mono<List<PieChartVO.Category>> categoriesMono = client.listAll(Category.class, new ListOptions(),
                Sort.by(Sort.Order.desc("metadata.creationTimestamp")))
            .map(category -> {
                PieChartVO.Category categoryVO = new PieChartVO.Category();
                categoryVO.setName(category.getSpec().getDisplayName());
                categoryVO.setTotal(defaultIfNull(category.getStatus() != null ? category.getStatus().getVisiblePostCount() : 0, 0));
                categoryVO.setPermalink(category.getStatus() != null ? category.getStatus().getPermalink() : null);
                return categoryVO;
            })
            .collectList();

        Mono<List<Post>> publishedPostsMono = client.listAll(Post.class, new ListOptions(),
                Sort.by(Sort.Order.desc("metadata.creationTimestamp")))
            .filter(post -> post.getSpec() != null && post.getSpec().getPublishTime() != null)
            .collectList();

        Mono<Map<String, Integer>> momentsByDateMono = basicsMono
            .flatMap(cfg -> Boolean.TRUE.equals(cfg.getEnableMomentHeatmap())
                ? getMomentCountsByDate()
                : Mono.just(Map.of()));

        Mono<List<Comment>> allCommentsMono = client.listAll(Comment.class, new ListOptions(),
                Sort.by(Sort.Order.desc("metadata.creationTimestamp")))
            .collectList();

        return Mono.zip(basicsMono, tagsMono, categoriesMono, publishedPostsMono, momentsByDateMono, allCommentsMono)
            .map(tuple -> {
                SettingConfigGetter.BasicsConfig basics = tuple.getT1();
                List<PieChartVO.Tag> tags = tuple.getT2();
                List<PieChartVO.Category> categories = tuple.getT3();
                List<Post> posts = tuple.getT4();
                Map<String, Integer> momentsByDate = tuple.getT5();
                List<Comment> comments = tuple.getT6();

                PieChartVO pieChartVO = new PieChartVO();
                pieChartVO.setEnableMomentHeatmap(Boolean.TRUE.equals(basics.getEnableMomentHeatmap()));
                if (StrUtil.isNotBlank(basics.getAccentColor())) {
                    pieChartVO.setAccentColor(basics.getAccentColor().trim());
                }

                pieChartVO.setTags(tags);
                pieChartVO.setCategories(categories);

                // Aggregate posts by date, total views, total upvotes, earliest date, and top10
                Map<String, Integer> postsByDate = new HashMap<>();
                long totalViews = 0L;
                long totalUpvotes = 0L;
                LocalDate earliestPostDate = null;
                List<PieChartVO.Top10Article> allPostViews = new ArrayList<>(posts.size());

                for (Post post : posts) {
                    Instant publishTime = post.getSpec().getPublishTime();
                    Instant effectiveTime = publishTime != null
                        ? publishTime
                        : post.getMetadata().getCreationTimestamp();
                    if (effectiveTime != null) {
                        LocalDate localDate = effectiveTime.atZone(Constants.DEFAULT_ZONE_ID).toLocalDate();
                        postsByDate.merge(localDate.toString(), 1, Integer::sum);
                        if (earliestPostDate == null || localDate.isBefore(earliestPostDate)) {
                            earliestPostDate = localDate;
                        }
                    }

                    PostMetrics metrics = extractPostMetrics(post);
                    totalViews += metrics.views;
                    totalUpvotes += metrics.upvotes;

                    PieChartVO.Top10Article top = new PieChartVO.Top10Article();
                    top.setName(post.getSpec().getTitle());
                    top.setViews(metrics.views);
                    top.setPermalink(post.getStatus() != null ? post.getStatus().getPermalink() : null);
                    allPostViews.add(top);
                }

                List<PieChartVO.Top10Article> top10 = allPostViews.stream()
                    .sorted(Comparator.comparing(PieChartVO.Top10Article::getViews).reversed())
                    .limit(10)
                    .collect(Collectors.toList());

                pieChartVO.setArticles(buildArticleList(postsByDate, momentsByDate));
                pieChartVO.setMonthlyTrend(buildMonthlyTrend(postsByDate, momentsByDate));
                pieChartVO.setComments(buildCommentList(comments));
                pieChartVO.setTop10Articles(top10);

                // Build Site Summary
                LocalDate today = LocalDate.now(Constants.DEFAULT_ZONE_ID);
                LocalDate startDate = resolveStartDate(basics.getSiteStartDate(), earliestPostDate);
                long runningDays = startDate != null
                    ? Math.max(1L, ChronoUnit.DAYS.between(startDate, today) + 1)
                    : 0L;

                PieChartVO.SiteSummary summary = new PieChartVO.SiteSummary();
                summary.setTotalPosts(posts.size());
                summary.setTotalViews(totalViews);
                summary.setTotalUpvotes(totalUpvotes);
                summary.setTotalComments(comments.size());
                summary.setTotalTags((int) tags.stream().filter(t -> t.getCount() != null && t.getCount() > 0).count());
                summary.setTotalCategories((int) categories.stream().filter(c -> c.getTotal() != null && c.getTotal() > 0).count());
                summary.setRunningDays(runningDays);
                summary.setSiteStartDate(startDate != null ? startDate.toString() : null);
                pieChartVO.setSummary(summary);

                return pieChartVO;
            });
    }

    private LocalDate resolveStartDate(String configuredStartDate, LocalDate earliestPostDate) {
        if (StrUtil.isNotBlank(configuredStartDate)) {
            try {
                return LocalDate.parse(configuredStartDate.trim());
            } catch (Exception e) {
                log.debug("解析建站日期失败 ({}), 回退首篇文章日期", configuredStartDate);
            }
        }
        return earliestPostDate;
    }

    private Mono<Map<String, Integer>> getMomentCountsByDate() {
        ListOptions listOptions = new ListOptions();
        listOptions.setFieldSelector(FieldSelector.of(Queries.and(
            Queries.equal("spec.visible", "PUBLIC"),
            Queries.equal("spec.approved", "true")
        )));

        return Flux.fromIterable(client.indexedQueryEngine().retrieveAll(
                MOMENT_GVK,
                listOptions,
                Sort.by(Sort.Order.desc("spec.releaseTime"))))
            .flatMap(name -> client.fetch(MOMENT_GVK, name))
            .filter(this::isPublicApprovedMoment)
            .collectList()
            .map(moments -> {
                Map<String, Integer> map = new HashMap<>();
                for (Unstructured moment : moments) {
                    extractMomentDate(moment).ifPresent(dateStr ->
                        map.merge(dateStr, 1, Integer::sum));
                }
                return map;
            })
            .onErrorResume(e -> {
                log.warn("查询瞬间数据失败（可能未安装 moments 插件）: {}", e.getMessage());
                return Mono.just(Map.of());
            });
    }

    private boolean isPublicApprovedMoment(Unstructured unstructured) {
        try {
            Map<String, Object> data = unstructured.getData();
            Map<String, Object> spec = Unstructured.getNestedMap(data, "spec").orElse(null);
            if (spec == null) return false;
            Object visible = spec.get("visible");
            if (visible != null && !"PUBLIC".equals(visible.toString())) return false;
            Object approved = spec.get("approved");
            if (approved != null && !Boolean.parseBoolean(approved.toString())) return false;
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private Optional<String> extractMomentDate(Unstructured unstructured) {
        try {
            Map<String, Object> data = unstructured.getData();
            Optional<Instant> releaseTime = Unstructured.getNestedInstant(data, "spec", "releaseTime");
            if (releaseTime.isPresent()) {
                return Optional.of(toDateStr(releaseTime.get()));
            }
            Instant creation = unstructured.getMetadata().getCreationTimestamp();
            if (creation != null) {
                return Optional.of(toDateStr(creation));
            }
        } catch (Exception e) {
            log.debug("提取瞬间日期失败: {}", e.getMessage());
        }
        return Optional.empty();
    }

    private String toDateStr(Instant instant) {
        return instant.atZone(Constants.DEFAULT_ZONE_ID).toLocalDate().toString();
    }

    private List<PieChartVO.Article> buildArticleList(Map<String, Integer> postsByDate,
                                                      Map<String, Integer> momentsByDate) {
        LocalDate today = LocalDate.now(Constants.DEFAULT_ZONE_ID);
        LocalDate startDate = today.minusYears(1);

        return Stream.iterate(startDate, date -> date.plusDays(1))
            .limit(ChronoUnit.DAYS.between(startDate, today.plusDays(1)))
            .map(date -> {
                String dateStr = date.toString();
                int articleCount = postsByDate.getOrDefault(dateStr, 0);
                int momentCount = momentsByDate.getOrDefault(dateStr, 0);
                PieChartVO.Article articleVO = new PieChartVO.Article();
                articleVO.setName(dateStr);
                articleVO.setDate(date.atStartOfDay(Constants.DEFAULT_ZONE_ID).toLocalDateTime());
                articleVO.setArticleTotal(articleCount);
                articleVO.setMomentTotal(momentCount);
                articleVO.setTotal(articleCount + momentCount);
                return articleVO;
            })
            .sorted(Comparator.comparing(PieChartVO.Article::getDate).reversed())
            .collect(Collectors.toList());
    }

    private List<PieChartVO.MonthlyTrend> buildMonthlyTrend(Map<String, Integer> postsByDate,
                                                            Map<String, Integer> momentsByDate) {
        YearMonth currentMonth = YearMonth.now(Constants.DEFAULT_ZONE_ID);
        Map<String, Integer> articlesByMonth = new HashMap<>();
        Map<String, Integer> momentsByMonth = new HashMap<>();

        postsByDate.forEach((dateStr, count) -> {
            if (dateStr.length() >= 7) {
                articlesByMonth.merge(dateStr.substring(0, 7), count, Integer::sum);
            }
        });
        momentsByDate.forEach((dateStr, count) -> {
            if (dateStr.length() >= 7) {
                momentsByMonth.merge(dateStr.substring(0, 7), count, Integer::sum);
            }
        });

        List<PieChartVO.MonthlyTrend> result = new ArrayList<>(12);
        for (int i = 11; i >= 0; i--) {
            String ym = currentMonth.minusMonths(i).toString();
            int a = articlesByMonth.getOrDefault(ym, 0);
            int m = momentsByMonth.getOrDefault(ym, 0);
            PieChartVO.MonthlyTrend trend = new PieChartVO.MonthlyTrend();
            trend.setMonth(ym);
            trend.setArticleCount(a);
            trend.setMomentCount(m);
            trend.setTotal(a + m);
            result.add(trend);
        }
        return result;
    }

    private List<PieChartVO.Comment> buildCommentList(List<Comment> comments) {
        Map<String, List<Comment>> commentsByUser = comments.stream()
            .filter(comment -> comment.getSpec() != null && comment.getSpec().getOwner() != null)
            .collect(Collectors.groupingBy(comment -> {
                String name = comment.getSpec().getOwner().getName();
                return name != null ? name : "unknown";
            }));

        return commentsByUser.entrySet().stream()
            .map(entry -> {
                Comment firstComment = entry.getValue().getFirst();
                PieChartVO.Comment commentVO = new PieChartVO.Comment();
                commentVO.setName(firstComment.getSpec().getOwner().getName());
                commentVO.setEmail(entry.getKey());
                commentVO.setUsername(firstComment.getSpec().getOwner().getDisplayName());
                commentVO.setCount(entry.getValue().size());
                return commentVO;
            })
            .sorted(Comparator.comparing(PieChartVO.Comment::getCount).reversed())
            .collect(Collectors.toList());
    }

    private PostMetrics extractPostMetrics(Post post) {
        int visits = 0;
        int upvotes = 0;
        Map<String, String> annotations = post.getMetadata().getAnnotations();
        if (annotations != null) {
            String statsJson = annotations.get("content.halo.run/stats");
            if (statsJson != null && !statsJson.isEmpty()) {
                try {
                    JsonNode statsNode = objectMapper.readTree(statsJson);
                    if (statsNode.has("visit")) {
                        visits = statsNode.get("visit").asInt(0);
                    }
                    if (statsNode.has("upvote")) {
                        upvotes = statsNode.get("upvote").asInt(0);
                    }
                } catch (JsonProcessingException e) {
                    log.warn("解析文章统计信息失败: {}", e.getMessage());
                }
            }
        }
        return new PostMetrics(visits, upvotes);
    }

    private record PostMetrics(int views, int upvotes) {}
}
