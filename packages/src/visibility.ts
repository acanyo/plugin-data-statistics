/**
 * Defers callback execution until the element enters (or approaches) the viewport.
 * Falls back to immediate execution when IntersectionObserver is unavailable.
 */
export function observeOnceVisible(
  element: Element,
  onVisible: () => void,
  rootMargin = '240px 0px'
): () => void {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
    onVisible();
    return () => {};
  }

  let triggered = false;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          triggered = true;
          observer.disconnect();
          onVisible();
          return;
        }
      }
    },
    { rootMargin }
  );

  observer.observe(element);

  return () => {
    if (!triggered) {
      observer.disconnect();
    }
  };
}
