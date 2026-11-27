const f = [
  { value: "daily", label: "今日概览", shortLabel: "今日" },
  { value: "weekly", label: "近 7 天", shortLabel: "7 天" },
  { value: "monthly", label: "近 30 天", shortLabel: "30 天" },
  { value: "quarterly", label: "近 90 天", shortLabel: "90 天" },
  { value: "yearly", label: "近一年", shortLabel: "1 年" }
];
function m(t) {
  const e = Number(t) || 0;
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${(e / 1e3).toFixed(1)}K` : e.toLocaleString("zh-CN");
}
function p(t) {
  return (Number(t) || 0).toLocaleString("zh-CN");
}
function d(t, e) {
  if (!e) return "0%";
  const r = t / e * 100;
  return r >= 10 ? `${Math.round(r)}%` : `${r.toFixed(1)}%`;
}
function g(t) {
  const e = Math.max(0, Math.round(t || 0));
  if (e < 60) return `${e}s`;
  const r = Math.floor(e / 60), n = e % 60;
  return r < 60 ? n > 0 ? `${r}m ${n}s` : `${r}m` : `${Math.floor(r / 60)}h ${r % 60}m`;
}
function h(t) {
  return t == null ? 0 : typeof t == "object" && "value" in t ? parseInt(String(t.value), 10) || 0 : parseInt(String(t), 10) || 0;
}
function b(t, e) {
  if (!t) return null;
  const r = t[e];
  if (r && typeof r == "object" && "prev" in r && typeof r.prev == "number")
    return r.prev;
  const n = t.comparison?.[e];
  return typeof n == "number" && Number.isFinite(n) ? n : null;
}
function $(t, e) {
  return e == null || e <= 0 ? null : (t - e) / e * 100;
}
function S(t) {
  const e = t.getFullYear(), r = String(t.getMonth() + 1).padStart(2, "0"), n = String(t.getDate()).padStart(2, "0");
  return `${e}-${r}-${n}`;
}
function y(t) {
  if (Number.isNaN(t.valueOf())) return "--:--:--";
  const e = String(t.getHours()).padStart(2, "0"), r = String(t.getMinutes()).padStart(2, "0"), n = String(t.getSeconds()).padStart(2, "0");
  return `${e}:${r}:${n}`;
}
function M(t) {
  if (Number.isNaN(t.valueOf())) return "";
  const e = Math.max(0, Math.floor((Date.now() - t.getTime()) / 1e3));
  return e < 60 ? "刚刚" : e < 3600 ? `${Math.floor(e / 60)} 分钟前` : `${Math.floor(e / 3600)} 小时前`;
}
function N(t, e) {
  const r = new Date(t);
  if (Number.isNaN(r.valueOf()))
    return t.length > 10 ? t.slice(5, 10) : t;
  const n = String(r.getMonth() + 1).padStart(2, "0"), i = String(r.getDate()).padStart(2, "0"), a = String(r.getHours()).padStart(2, "0");
  return e === "daily" ? `${a}:00` : e === "yearly" ? `${r.getFullYear()}-${n}` : `${n}-${i}`;
}
const u = typeof Intl < "u" && typeof Intl.DisplayNames == "function" ? new Intl.DisplayNames(["zh-CN"], { type: "region" }) : null, l = {
  HK: "中国香港",
  MO: "中国澳门",
  TW: "中国台湾"
};
function c(t = "") {
  const e = String(t || "").toUpperCase();
  if (!e) return "";
  let r = e;
  if (u)
    try {
      const n = u.of(e);
      n && n !== e && (r = n);
    } catch {
    }
  return l[e] && (r.includes("中国") ? r = `中国${r.replace(/^中国/, "")}` : r = l[e]), r;
}
function x(t) {
  const e = (t || "").toLowerCase();
  return e === "desktop" || e === "laptop" ? "desktop" : e === "mobile" || e === "tablet" ? "mobile" : "other";
}
function v(t) {
  const e = {
    "Mac OS": "macOS",
    Windows: "Windows",
    Android: "Android",
    iOS: "iOS",
    Linux: "Linux"
  }, r = {
    desktop: "桌面端",
    mobile: "移动端",
    tablet: "平板",
    laptop: "笔记本"
  };
  let n = t.browser || "";
  n && n.toLowerCase().includes("webview") && (!n.includes("(") || !n.includes(")")) && (n = n.replace(/\s*webview\s*/gi, " (WebView)"));
  const i = c(t.country), a = t.os ? e[t.os] || t.os : "", s = t.device ? r[t.device] || t.device : "", o = [];
  return i && o.push(i), a && o.push(a), s && o.push(s), n && o.push(n), o.length > 0 ? o : ["访客访问"];
}
function w(t) {
  return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test((t || "").trim());
}
function L(t, e) {
  const r = t.replace("#", "").trim(), n = r.length === 3 ? r.split("").map((o) => o + o).join("") : r;
  if (n.length !== 6) return `rgba(37, 99, 235, ${e})`;
  const i = parseInt(n.slice(0, 2), 16), a = parseInt(n.slice(2, 4), 16), s = parseInt(n.slice(4, 6), 16);
  return `rgba(${i}, ${a}, ${s}, ${e})`;
}
export {
  f as T,
  p as a,
  S as b,
  m as c,
  N as d,
  h as e,
  d as f,
  y as g,
  L as h,
  w as i,
  b as j,
  $ as k,
  g as l,
  M as m,
  x as n,
  v as o,
  c as p
};
