package com.xhhao.dataStatistics.vo;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class PieChartVO {

    private List<Tag> tags = new ArrayList<>();
    @Data
    public static class Tag {
        private String name;
        private Integer count;
    }

    private List<Category> categories = new ArrayList<>();
    @Data
    public static class Category {
        private String name;
        private Integer total;  // 总数
    }

    // 文章
    private List<Article> articles = new ArrayList<>();
    @Data
    public static class Article {
        private String name;  // 名称
        private LocalDateTime date;  // 日期
        private Integer total;  // 总数
    }

    // 评论
    private List<Comment> comments = new ArrayList<>();
    @Data
    public static class Comment {
        private String name;  // 名称
        private String email;  // 邮箱
        private String username;  // 用户名
        private Integer count;  // 数量
    }

    // top10 文章
    private List<Top10Article> top10Articles = new ArrayList<>();
    @Data
    public static class Top10Article {
        private String name;  // 名称
        private Integer views;  // 访问量
    }

}