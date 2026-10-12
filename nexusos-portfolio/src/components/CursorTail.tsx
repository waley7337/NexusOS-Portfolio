/**
 * A short white trail that follows a fine pointer. Decorative only:
 * the canvas never takes hits, and the loop stays off for coarse
 * pointers, reduced motion, and hidden tabs.
 */
import { useEffect, useRef } from "react";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const FADE_MS = 420;
const MAX_LENGTH = 110;

type Sample = { x: number; y: number; t: number };

function mountTrail(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const samples: Sample[] = [];
  let raf = 0;
  let looping = false;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const trim = (now: number) => {
    while (samples.length && now - samples[0].t >= FADE_MS) samples.shift();
    let length = 0;
    for (let i = samples.length - 1; i > 0; i--) {
      length += Math.hypot(samples[i].x - samples[i - 1].x, samples[i].y - samples[i - 1].y);
      if (length > MAX_LENGTH) {
        samples.splice(0, i);
        break;
      }
    }
  };

  const draw = (now: number) => {
    raf = 0;
    looping = false;
    if (document.visibilityState !== "visible") return;
    trim(now);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowColor = "rgba(255, 255, 255, 0.28)";
    ctx.shadowBlur = 8;

    if (samples.length === 1) {
      const life = Math.min(1, Math.max(0, 1 - (now - samples[0].t) / FADE_MS));
      ctx.fillStyle = `rgba(255, 255, 255, ${0.32 * life})`;
      ctx.beginPath();
      ctx.arc(samples[0].x, samples[0].y, 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      for (let i = 1; i < samples.length; i++) {
        const point = samples[i];
        const prev = samples[i - 1];
        const life = Math.min(1, Math.max(0, 1 - (now - point.t) / FADE_MS));
        const along = i / (samples.length - 1);
        const alpha = life * (0.06 + 0.36 * along);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 1 + along * 1.4;
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      }
    }

    if (!samples.length) return;
    looping = true;
    raf = window.requestAnimationFrame(draw);
  };

  const kick = () => {
    if (looping || document.visibilityState !== "visible") return;
    looping = true;
    raf = window.requestAnimationFrame(draw);
  };

  const onMove = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    if (document.visibilityState !== "visible") return;
    const now = performance.now();
    const last = samples[samples.length - 1];
    if (last && Math.hypot(event.clientX - last.x, event.clientY - last.y) < 2) {
      last.x = event.clientX;
      last.y = event.clientY;
      last.t = now;
    } else {
      samples.push({ x: event.clientX, y: event.clientY, t: now });
    }
    kick();
  };

  const onVisibility = () => {
    if (document.visibilityState !== "visible") {
      if (raf) window.cancelAnimationFrame(raf);
      raf = 0;
      looping = false;
      return;
    }
    if (samples.length) kick();
  };

  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onMove);
  document.addEventListener("visibilitychange", onVisibility);

  return () => {
    if (raf) window.cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onMove);
    document.removeEventListener("visibilitychange", onVisibility);
    ctx.shadowBlur = 0;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  };
}

export function CursorTail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const fine = window.matchMedia(FINE_POINTER);
    const reduced = window.matchMedia(REDUCED_MOTION);
    let stop = () => {};

    const apply = () => {
      stop();
      stop = () => {};
      if (!fine.matches || reduced.matches) return;
      stop = mountTrail(canvas);
    };

    apply();
    fine.addEventListener("change", apply);
    reduced.addEventListener("change", apply);
    return () => {
      fine.removeEventListener("change", apply);
      reduced.removeEventListener("change", apply);
      stop();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-testid="cursor-tail"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 5,
      }}
    />
  );
}
