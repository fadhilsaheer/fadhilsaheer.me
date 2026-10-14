// Reveal each item once, when it enters the reading viewport.
const items = document.querySelectorAll<HTMLElement>(".reveal");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!reducedMotion.matches && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      (entry.target as HTMLElement).dataset.reveal = "visible";
      observer.unobserve(entry.target);
    }
  }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });

  items.forEach((item) => {
    item.dataset.reveal = "pending";
    observer.observe(item);
  });

  // Keyboard navigation must never land on an invisible control.
  document.addEventListener("focusin", (event) => {
    if (!(event.target instanceof Element)) return;
    const item = event.target.closest<HTMLElement>(".reveal");
    if (!item) return;
    delete item.dataset.reveal;
    observer.unobserve(item);
  });

  reducedMotion.addEventListener("change", () => {
    if (!reducedMotion.matches) return;
    observer.disconnect();
    items.forEach((item) => delete item.dataset.reveal);
  });
}
