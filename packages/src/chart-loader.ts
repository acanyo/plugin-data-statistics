import type { Chart as ChartClass } from 'chart.js';

let chartCtorPromise: Promise<typeof ChartClass> | null = null;

/**
 * Lazily loads Chart.js and registers only the controllers/elements used by
 * site-charts and traffic-statistics. Components that do not render a canvas
 * (e.g. heatmap-only site-charts, uptime, activity, metrics, github) never
 * trigger this chunk download.
 */
export function loadChartJs(): Promise<typeof ChartClass> {
  if (!chartCtorPromise) {
    chartCtorPromise = import('chart.js').then((mod) => {
      mod.Chart.register(
        mod.DoughnutController,
        mod.ArcElement,
        mod.BarController,
        mod.BarElement,
        mod.LineController,
        mod.LineElement,
        mod.PointElement,
        mod.Filler,
        mod.CategoryScale,
        mod.LinearScale,
        mod.Tooltip
      );
      return mod.Chart;
    });
  }
  return chartCtorPromise;
}
