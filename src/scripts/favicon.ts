import spriteUrl from "../assets/favicon/snorlax-frames.webp?url";

const restingIcon = "/favicon.png";
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
let timer: ReturnType<typeof setTimeout> | undefined;
let faviconFrames: string[] = [];
let generation = 0;
let loading: Promise<void> | undefined;

function icon() {
  return document.querySelector<HTMLLinkElement>("#site-favicon");
}

function stop() {
  generation++;
  clearTimeout(timer);
  const link = icon();
  if (link) link.href = restingIcon;
}

function prepareFrames() {
  return (loading ??= (async () => {
    const sprite = new Image();
    sprite.fetchPriority = "low";
    sprite.src = spriteUrl;
    await sprite.decode();
    const canvas = document.createElement("canvas");
    const frameSize = sprite.naturalHeight;
    canvas.width = canvas.height = frameSize;
    const context = canvas.getContext("2d");
    if (!context) return;
    faviconFrames = Array.from(
      { length: sprite.naturalWidth / frameSize },
      (_, index) => {
        context.clearRect(0, 0, frameSize, frameSize);
        context.drawImage(
          sprite,
          index * frameSize,
          0,
          frameSize,
          frameSize,
          0,
          0,
          frameSize,
          frameSize,
        );
        return canvas.toDataURL("image/png");
      },
    );
  })());
}

function start() {
  stop();
  if (document.hidden || motionPreference.matches || !icon()) return;
  // Start with Snorlax upright; alternate waves with a full exit before the next entrance.
  const currentGeneration = generation;
  timer = setTimeout(async () => {
    try {
      await prepareFrames();
    } catch {
      return;
    }
    if (
      currentGeneration !== generation ||
      document.hidden ||
      motionPreference.matches ||
      !faviconFrames.length
    )
      return;
    const began = performance.now();
    const animate = () => {
      const elapsed = performance.now() - began;
      const frame = (Math.floor(elapsed / 80) + 7) % faviconFrames.length;
      const link = icon();
      if (link) link.href = faviconFrames[frame];
      timer = setTimeout(animate, 80);
    };
    animate();
  }, 2500);
}

document.addEventListener("astro:before-swap", stop);
document.addEventListener("astro:page-load", start);
document.addEventListener("visibilitychange", start);
motionPreference.addEventListener("change", start);
window.addEventListener("pagehide", stop);
window.addEventListener("pageshow", start);
