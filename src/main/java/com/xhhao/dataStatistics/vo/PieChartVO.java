package com.xhhao.dataStatistics.vo;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class PieChartVO {

    private Boolean enableMomentHeatmap;
    private String accentColor;
    private SiteSummary summary = new SiteSummary();

    @Data
    public static class SiteSummary {
        private Integer totalPosts = 0;
        private Long totalViews = 0L;
        private Long totalUpvotes = 0L;
        private Integer totalComments = 0;
        private Integer totalTags = 0;
        private Integer totalCategories = 0;
        private Long runningDays = 0L;
        private String siteStartDate;
    }

    private List<Tag> tags = new ArrayList<>();
    @Data
    public static class Tag {
        private String name;
        private Integer count;
        private String permalink;
    }

    private List<Category> categories = new ArrayList<>();
    @Data
    public static class Category {
        private String name;
        private Integer total;
        private String permalink;
    }

    private List<Article> articles = new ArrayList<>();
    @Data
    public static class Article {
        private String name;
        private LocalDateTime date;
        private Integer total;
        private Integer articleTotal;
        private Integer momentTotal;
    }

    private List<MonthlyTrend> monthlyTrend = new ArrayList<>();
    @Data
    public static class MonthlyTrend {
        private String month;
        private Integer articleCount;
        private Integer momentCount;
        private Integer total;
    }

    private List<Comment> comments = new ArrayList<>();
    @Data
    public static class Comment {
        private String name;
        private String email;
        private String username;
        private Integer count;
    }

    private List<Top10Article> top10Articles = new ArrayList<>();
    @Data
    public static class Top10Article {
        private String name;
        private Integer views;
        private String permalink;
    }
}
