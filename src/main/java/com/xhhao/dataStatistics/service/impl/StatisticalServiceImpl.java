package com.xhhao.dataStatistics.service.impl;

import static org.apache.commons.lang3.ObjectUtils.defaultIfNull;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
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

    /**
     * 缓存的图表数据
     */
    private volatile Mono<PieChartVO> cachedChartData;

    @Override
    public Mono<PieChartVO> getPieChartVO() {
        // 使用 Mono.cache() 实现缓存，避免重复计算
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

    /**
     * 清除缓存（可用于强制刷新）
     */
    public void clearCache() {
        cachedChartData = null;
    }

    private Mono<PieChartVO> buildPieChartVO() {
        PieChartVO pieChartVO = new PieChartVO();

        Mono<Boolean> enableMomentHeatmapMono = settingConfigGetter.getBasicsConfig()
            .map(config -> Boolean.TRUE.equals(config.getEnableMomentHeatmap()))
            .defaultIfEmpty(false);

        Mono<List<PieChartVO.Tag>> tagsMono = client.listAll(Tag.class, new ListOptions(),
                Sort.by(Sort.Order.desc("metadata.creationTimestamp")))
            .map(tag -> {
                PieChartVO.Tag tagVO = new PieChartVO.Tag();
                tagVO.setName(tag.getSpec().getDisplayName());
                tagVO.setCount(defaultIfNull(tag.getStatus().getVisiblePostCount(), 0));
                return tagVO;
            })
            .collectList();

        Mono<List<PieChartVO.Category>> categoriesMono = client.listAll(Category.class, new ListOptions(),
                Sort.by(Sort.Order.desc("metadata.creationTimestamp")))
            .map(category -> {
                PieChartVO.Category categoryVO = new PieChartVO.Category();
                categoryVO.setName(category.getSpec().getDisplayName());
                categoryVO.setTotal(defaultIfNull(category.getStatus().getVisiblePostCount(), 0));
                return categoryVO;
            })
            .collectList();

        // 文章按日聚合
        Mono<Map<String, Integer>> postsByDateMono = client.listAll(Post.class, new ListOptions(),
                Sort.by(Sort.Order.desc("metadata.creationTimestamp")))
            .filter(post -> post.getSpec().getPublishTime() != null)
            .collectList()
            .map(posts -> posts.stream()
                .collect(Collectors.groupingBy(post -> {
                    Instant publishTime = post.getSpec().getPublishTime();
                    if (publishTime != null) {
                        return toDateStr(publishTime);
                    }
                    return toDateStr(post.getMetadata().getCreationTimestamp());
                }, Collectors.collectingAndThen(Collectors.counting(), Long::intValue))));

        // 瞬间按日聚合（受开关控制）
        Mono<Map<String, Integer>> momentsByDateMono = enableMomentHeatmapMono
            .flatMap(enabled -> enabled ? getMomentCountsByDate() : Mono.just(Map.of()));

        Mono<List<PieChartVO.Comment>> commentsMono = client.listAll(Comment.class, new ListOptions(),
                Sort.by(Sort.Order.desc("metadata.creationTimestamp")))
            .collectList()
            .map(this::buildCommentList);

        Mono<List<PieChartVO.Top10Article>> top10ArticlesMono = client.listAll(Post.class, new ListOptions(),
                Sort.by(Sort.Order.desc("metadata.creationTimestamp")))
            .filter(post -> post.getSpec().getPublishTime() != null)
            .map(this::buildTop10Article)
            .sort(Comparator.comparing(PieChartVO.Top10Article::getViews).reversed())
            .take(10)
            .collectList();

        return Mono.zip(tagsMono, categoriesMono, postsByDateMono, momentsByDateMono,
                commentsMono, top10ArticlesMono, enableMomentHeatmapMono)
            .map(tuple -> {
                pieChartVO.setTags(tuple.getT1());
                pieChartVO.setCategories(tuple.getT2());

                Map<String, Integer> postsByDate = tuple.getT3();
                Map<String, Integer> momentsByDate = tuple.getT4();
                boolean enableMoment = tuple.getT7();

                pieChartVO.setArticles(buildArticleList(postsByDate, momentsByDate));
                pieChartVO.setComments(tuple.getT5());
                pieChartVO.setTop10Articles(tuple.getT6());
                pieChartVO.setEnableMomentHeatmap(enableMoment);
                return pieChartVO;
            });
    }

    /**
     * 动态查询 moments 并按日期聚合计数
     */
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

    /**
     * 判断瞬间是否为公开已审核状态
     */
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

    /**
     * 提取瞬间的日期字符串（优先 spec.releaseTime，回退 metadata.creationTimestamp）
     */
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
            .limit(java.time.temporal.ChronoUnit.DAYS.between(startDate, today.plusDays(1)))
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

    private List<PieChartVO.Comment> buildCommentList(List<Comment> comments) {
        Map<String, List<Comment>> commentsByUser = comments.stream()
            .filter(comment -> comment.getSpec().getOwner() != null)
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

    private PieChartVO.Top10Article buildTop10Article(Post post) {
        PieChartVO.Top10Article top10Article = new PieChartVO.Top10Article();
        top10Article.setName(post.getSpec().getTitle());
        
        int visits = 0;
        Map<String, String> annotations = post.getMetadata().getAnnotations();
        if (annotations != null) {
            String statsJson = annotations.get("content.halo.run/stats");
            if (statsJson != null && !statsJson.isEmpty()) {
                try {
                    JsonNode statsNode = objectMapper.readTree(statsJson);
                    if (statsNode.has("visit")) {
                        visits = statsNode.get("visit").asInt();
                    }
                } catch (JsonProcessingException e) {
                    log.warn("解析文章统计信息失败: {}", e.getMessage());
                }
            }
        }
        top10Article.setViews(visits);
        return top10Article;
    }

}
