type FrameCallback = (time: number, delta: number) => void;

type Subscriber = {
  callback: FrameCallback;
  fps: number;
  lastRun: number;
};

type SubscribeOptions = {
  fps?: number;
};

const DEFAULT_FPS = 60;
const MAX_DELTA_MS = 50;

const subscribers = new Set<Subscriber>();
let rafId: number | null = null;
let visibilityBound = false;

function schedule(): void {
  if (rafId !== null || subscribers.size === 0) return;
  if (typeof window === "undefined") return;
  rafId = window.requestAnimationFrame(tick);
}

function tick(time: number): void {
  rafId = null;

  if (typeof document !== "undefined" && document.hidden) return;

  for (const subscriber of subscribers) {
    const interval = 1000 / subscriber.fps;
    if (time - subscriber.lastRun < interval) continue;

    const delta = Math.min(time - subscriber.lastRun, MAX_DELTA_MS);
    subscriber.lastRun = time;

    try {
      subscriber.callback(time, delta);
    } catch (error) {
      subscribers.delete(subscriber);
      console.error("[frame-scheduler] Animation callback failed", error);
    }
  }

  schedule();
}

function handleVisibilityChange(): void {
  if (document.hidden) {
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
    return;
  }

  for (const subscriber of subscribers) {
    subscriber.lastRun = 0;
  }
  schedule();
}

function bindVisibility(): void {
  if (visibilityBound || typeof document === "undefined") return;
  document.addEventListener("visibilitychange", handleVisibilityChange);
  visibilityBound = true;
}

function unbindVisibilityIfIdle(): void {
  if (!visibilityBound || subscribers.size > 0) return;
  document.removeEventListener("visibilitychange", handleVisibilityChange);
  visibilityBound = false;
}

export function subscribe(
  callback: FrameCallback,
  { fps = DEFAULT_FPS }: SubscribeOptions = {},
): () => void {
  const subscriber: Subscriber = {
    callback,
    fps: Math.max(1, fps),
    lastRun: 0,
  };

  subscribers.add(subscriber);
  bindVisibility();
  schedule();

  return () => {
    subscribers.delete(subscriber);

    if (subscribers.size === 0 && rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }

    unbindVisibilityIfIdle();
  };
}
