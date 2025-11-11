package com.xhhao.dataStatistics.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.xhhao.dataStatistics.service.StatisticalService;
import com.xhhao.dataStatistics.vo.PieChartVO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import run.halo.app.core.extension.content.Category;
import run.halo.app.core.extension.content.Comment;
import run.halo.app.core.extension.content.Post;
import run.halo.app.core.extension.content.Tag;
import run.halo.app.extension.ListOptions;
import run.halo.app.extension.ReactiveExtensionClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.apache.commons.lang3.ObjectUtils.defaultIfNull;

@Component
@RequiredArgsConstructor
public class StatisticalServiceImpl implements StatisticalService {
    private final ReactiveExtensionClient client;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public Mono<PieChartVO> getPieChartVO() {
        PieChartVO pieChartVO = new PieChartVO();

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

        Mono<List<PieChartVO.Article>> articlesMono = client.listAll(Post.class, new ListOptions(),
                Sort.by(Sort.Order.desc("metadata.creationTimestamp")))
            .filter(post -> post.getSpec().getPublishTime() != null)
            .collectList()
            .map(posts -> {
                Map<String, Integer> postsByDate = posts.stream()
                    .collect(Collectors.groupingBy(post -> {
                        Instant publishTime = post.getSpec().getPublishTime();
                        if (publishTime != null) {
                            return publishTime.atZone(ZoneId.systemDefault())
                                .toLocalDate().toString();
                        }
                        return post.getMetadata().getCreationTimestamp()
                            .atZone(ZoneId.systemDefault())
                            .toLocalDate().toString();
                    }, Collectors.collectingAndThen(Collectors.counting(), Long::intValue)));

                LocalDate today = LocalDate.now();
                LocalDate startDate = today.minusYears(1);

                return Stream.iterate(startDate, date -> date.plusDays(1))
                    .limit(java.time.temporal.ChronoUnit.DAYS.between(startDate, today.plusDays(1)))
                    .map(date -> {
                        String dateStr = date.toString();
                        PieChartVO.Article articleVO = new PieChartVO.Article();
                        articleVO.setName(dateStr);
                        articleVO.setDate(date.atStartOfDay(ZoneId.systemDefault()).toLocalDateTime());
                        articleVO.setTotal(postsByDate.getOrDefault(dateStr, 0));
                        return articleVO;
                    })
                    .sorted(Comparator.comparing(PieChartVO.Article::getDate).reversed())
                    .collect(Collectors.toList());
            });

        Mono<List<PieChartVO.Comment>> commentsMono = client.listAll(Comment.class, new ListOptions(),
                Sort.by(Sort.Order.desc("metadata.creationTimestamp")))
            .collectList()
            .map(comments -> {
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
            });
        Mono<List<PieChartVO.Top10Article>> top10ArticlesMono = client.listAll(Post.class, new ListOptions(),
                Sort.by(Sort.Order.desc("metadata.creationTimestamp")))
            .filter(post -> post.getSpec().getPublishTime() != null)
            .<PieChartVO.Top10Article>handle((post, sink) -> {
                PieChartVO.Top10Article top10Article = new PieChartVO.Top10Article();
                top10Article.setName(post.getSpec().getTitle());
                int visits = 0;
                Map<String, String> annotations = post.getMetadata().getAnnotations();
                if (annotations != null) {
                    String statsJson = annotations.get("content.halo.run/stats");
                    if (statsJson != null && !statsJson.isEmpty()) {
                        JsonNode statsNode;
                        try {
                            statsNode = objectMapper.readTree(statsJson);
                        } catch (JsonProcessingException e) {
                            sink.error(new RuntimeException(e));
                            return;
                        }
                        if (statsNode.has("visit")) {
                            visits = statsNode.get("visit").asInt();
                        }
                    }
                }
                top10Article.setViews(visits);
                sink.next(top10Article);
            })
            .sort(Comparator.comparing(PieChartVO.Top10Article::getViews).reversed())
            .take(10)
            .collectList();
        return Mono.zip(tagsMono, categoriesMono, articlesMono, commentsMono, top10ArticlesMono)
            .map(tuple -> {
                pieChartVO.setTags(tuple.getT1());
                pieChartVO.setCategories(tuple.getT2());
                pieChartVO.setArticles(tuple.getT3());
                pieChartVO.setComments(tuple.getT4());
                pieChartVO.setTop10Articles(tuple.getT5());
                return pieChartVO;
            });
    }
}
