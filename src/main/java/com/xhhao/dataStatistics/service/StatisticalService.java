package com.xhhao.dataStatistics.service;

import com.xhhao.dataStatistics.vo.PieChartVO;
import reactor.core.publisher.Mono;

public interface StatisticalService {
    Mono<PieChartVO> getPieChartVO();
    void clearCache();
}
