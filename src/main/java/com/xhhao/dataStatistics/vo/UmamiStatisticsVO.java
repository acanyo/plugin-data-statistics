package com.xhhao.dataStatistics.vo;

import lombok.Data;
import java.util.ArrayList;
import java.util.List;

/**
 * Umami统计数据VO
 *
 * @author Handsome
 * @since 1.0.0
 */
@Data
public class UmamiStatisticsVO {
    private List<Website> websites = new ArrayList<>();
    private WebsiteStats stats;
    private RealtimeData realtime;

    @Data
    public static class Website {
        private String id;
        private String name;
        private String domain;
        private String shareId;
        private Long createdAt;
    }

    @Data
    public static class WebsiteStats {
        private Long pageviews;
        private Long uniques;
        private Long bounces;
        private Long totalTime;
        private List<StatsItem> pageviewsData = new ArrayList<>();
        private List<StatsItem> uniquesData = new ArrayList<>();
        private List<StatsItem> bouncesData = new ArrayList<>();
        private List<StatsItem> totalTimeData = new ArrayList<>();
    }

    @Data
    public static class StatsItem {
        private String x; // 日期或时间
        private Long y;   // 数值
    }

    @Data
    public static class RealtimeData {
        private Long pageviews;
        private Long visitors;
        private List<RealtimeItem> data = new ArrayList<>();
    }

    @Data
    public static class RealtimeItem {
        private String x; // 时间
        private Long y;   // 数值
    }
}

