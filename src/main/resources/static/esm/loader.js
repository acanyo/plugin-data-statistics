function i(s, a, t, o = t) {
  const d = s.getAttribute(t);
  d && a.setAttribute(o, d);
}
function e(s, a) {
  s.isConnected && s.replaceWith(a);
}
function h(s) {
  s.querySelectorAll(".xhhaocom-dataStatistics-v2-traffic").forEach((a) => {
    const t = document.createElement("traffic-statistics");
    i(a, t, "data-type"), e(a, t);
  });
}
function p(s) {
  s.querySelectorAll(".xhhaocom-dataStatistics-v2-activity").forEach((a) => {
    e(a, document.createElement("activity-statistics"));
  });
}
function l(s) {
  s.querySelectorAll(".xhhaocom-dataStatistics-v2-uptime-kuma").forEach((a) => {
    e(a, document.createElement("uptime-statistics"));
  });
}
function f(s) {
  s.querySelectorAll(".xhhaocom-chartboard").forEach((a) => {
    const t = document.createElement("site-charts");
    i(a, t, "data-types"), a.hasAttribute("compact") && t.setAttribute("compact", ""), e(a, t);
  });
}
function g(s) {
  s.querySelectorAll(".github-statistics-container").forEach((a) => {
    const t = document.createElement("github-statistics");
    i(a, t, "data-types"), i(a, t, "data-stats-locale", "stats-locale"), i(a, t, "data-stats-show-icons", "stats-show-icons"), i(a, t, "data-stats-theme", "stats-theme"), i(a, t, "data-pin-repo", "pin-repo"), i(a, t, "data-top-langs-layout", "top-langs-layout"), i(a, t, "data-top-langs-hide-progress", "top-langs-hide-progress"), i(a, t, "data-top-langs-stats-format", "top-langs-stats-format"), i(a, t, "data-graph-theme", "graph-theme"), e(a, t);
  });
}
function m(s) {
  const a = [
    ".xhhaocom-dataStatistics-v2-github-stats",
    ".xhhaocom-dataStatistics-v2-github-pin",
    ".xhhaocom-dataStatistics-v2-github-top-langs",
    ".xhhaocom-dataStatistics-v2-github-graph"
  ].join(",");
  s.querySelectorAll(a).forEach((t) => {
    if (!t.isConnected || t.closest(".github-statistics-container"))
      return;
    const o = document.createElement("github-statistics");
    t.classList.contains("xhhaocom-dataStatistics-v2-github-stats") ? (o.setAttribute("data-types", "stats"), i(t, o, "data-locale", "stats-locale"), i(t, o, "data-show-icons", "stats-show-icons"), i(t, o, "data-theme", "stats-theme")) : t.classList.contains("xhhaocom-dataStatistics-v2-github-pin") ? (o.setAttribute("data-types", "pin"), i(t, o, "data-repo", "pin-repo")) : t.classList.contains("xhhaocom-dataStatistics-v2-github-top-langs") ? (o.setAttribute("data-types", "top-langs"), i(t, o, "data-layout", "top-langs-layout"), i(t, o, "data-hide-progress", "top-langs-hide-progress"), i(t, o, "data-stats-format", "top-langs-stats-format")) : t.classList.contains("xhhaocom-dataStatistics-v2-github-graph") && (o.setAttribute("data-types", "graph"), i(t, o, "data-theme", "graph-theme")), e(t, o);
  });
}
function b(s = document) {
  g(s), m(s), h(s), p(s), l(s), f(s);
}
const y = {
  "site-charts": () => import("./chunks/site-charts-D3VN8FNy.js"),
  "traffic-statistics": () => import("./chunks/traffic-statistics-DH_2wlV-.js"),
  "activity-statistics": () => import("./chunks/activity-statistics-CMHG2P4Z.js"),
  "umami-metrics": () => import("./chunks/umami-metrics-CZyGeIA1.js"),
  "uptime-statistics": () => import("./chunks/uptime-statistics-2O2D8F0u.js"),
  "github-statistics": () => import("./chunks/github-statistics-CSoJsJc6.js")
}, c = /* @__PURE__ */ new Set();
let r = !1;
function n(s = document) {
  b(s);
  for (const [a, t] of Object.entries(y))
    c.has(a) || s.querySelector(a) && (c.add(a), t().catch((o) => {
      c.delete(a), console.error(`[data-statistics] Failed to load <${a}>:`, o);
    }));
}
function S() {
  r || (r = !0, queueMicrotask(() => {
    r = !1, n(document);
  }));
}
function u() {
  if (n(document), typeof MutationObserver > "u") return;
  const s = document.body || document.documentElement;
  if (!s) return;
  new MutationObserver(() => {
    S();
  }).observe(s, {
    childList: !0,
    subtree: !0
  });
}
typeof window < "u" && typeof document < "u" && (window.xhhaocomDataStatisticsV2Init = () => n(document), document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", u, { once: !0 }) : u());
export {
  n as scanAndLoad
};
