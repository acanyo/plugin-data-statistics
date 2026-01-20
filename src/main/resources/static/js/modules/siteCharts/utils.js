export function ready(fn) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        fn();
    }
}

export function formatNumber(num) {
    const value = Number(num) || 0;
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + 'M';
    if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K';
    return value.toString();
}

export function safeGet(target, path, fallback = undefined) {
    return path.split('.').reduce((acc, key) => {
        if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
            return acc[key];
        }
        return undefined;
    }, target) ?? fallback;
}

export function formatDateYMD(date) {
    return date.toISOString().slice(0, 10);
}

export function createBarColors(length, softColors, strongColors) {
    return Array.from({ length }, (_, index) => ({
        background: softColors[index % softColors.length],
        border: strongColors[index % strongColors.length]
    }));
}
