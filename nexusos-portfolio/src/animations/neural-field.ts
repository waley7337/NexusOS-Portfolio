/**
 * Neural field: a Canvas 2D engine for the portfolio's ambient network.
 *
 * Framework-free on purpose. React mounts it once (NeuralBackground) and
 * never re-renders for it; every frame is drawn here.
 *
 * Colours come from NexusOS tokens at runtime (--muted-foreground for nodes,
 * --primary for links, --info for pulses), so the field follows the theme
 * and never introduces a colour of its own.
 *
 * Nodes drift a few pixels around a home point, each with its own phase, so
 * the motion does not travel across the screen. Links fade with distance.
 * One signal pulse starts every 1–3 seconds. Pointer and scroll parallax stay
 * within a few pixels and ease in. prefers-reduced-motion draws one static
 * frame: no drift loop, no pulses, no parallax.
 */

export interface NeuralFieldHandle {
  destroy: () => void;
}

interface Node {
  /** Resting point. Drift is a few pixels around this, so the field never travels or loops. */
  ox: number;
  oy: number;
  x: number;
  y: number;
  /** 0.35 (far) … 1 (near): scales size, brightness and parallax. */
  depth: number;
  phase: number;
  phaseY: number;
  freq: number;
  freqY: number;
  ampX: number;
  ampY: number;
  glowPhase: number;
  glowRate: number;
}

interface Pulse {
  from: number;
  to: number;
  t: number;
  duration: number;
}

type Rgb = [number, number, number];

const FRAME_MS = 1000 / 30;
const RESIZE_DEBOUNCE_MS = 150;
const MAX_DPR = 2;

/** Density tiers; small screens get fewer nodes, shorter links and fewer pulses. */
function tier(width: number) {
  if (width < 640) return { area: 26000, max: 34, link: 120, pulses: 1 };
  if (width < 1024) return { area: 20000, max: 56, link: 145, pulses: 1 };
  return { area: 16000, max: 88, link: 165, pulses: 2 };
}

function tokenRgb(name: string, fallback: Rgb): Rgb {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const m = raw.match(/^(-?[\d.]+)(?:deg)?\s+([\d.]+)%\s+([\d.]+)%/);
  if (!m) return fallback;
  const h = Number(m[1]) / 360;
  const s = Number(m[2]) / 100;
  const l = Number(m[3]) / 100;
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const ch = (t: number) => {
    const u = (t + 1) % 1;
    const v = u < 1 / 6 ? p + (q - p) * 6 * u : u < 0.5 ? q : u < 2 / 3 ? p + (q - p) * (2 / 3 - u) * 6 : p;
    return Math.round(v * 255);
  };
  return [ch(h + 1 / 3), ch(h), ch(h - 1 / 3)];
}

const rgba = ([r, g, b]: Rgb, a: number) => `rgba(${r},${g},${b},${a.toFixed(3)})`;

export function createNeuralField(canvas: HTMLCanvasElement, opts: { random?: () => number } = {}): NeuralFieldHandle {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { destroy: () => {} };
  const rand = opts.random ?? Math.random;

  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let width = 0;
  let height = 0;
  let nodes: Node[] = [];
  let pulses: Pulse[] = [];
  let linkDist = 150;
  let pulseCount = 4;
  let colors = { node: [148, 163, 184] as Rgb, link: [91, 155, 255] as Rgb, pulse: [56, 189, 248] as Rgb };

  let raf = 0;
  let last = 0;
  let acc = 0;
  let time = 0;
  let nextPulse = 1 + rand() * 2;
  let visible = true;
  let onScreen = true;
  let resizeTimer: ReturnType<typeof setTimeout> | undefined;
  let parallaxX = 0;
  let parallaxY = 0;
  let pointerX = 0;
  let pointerY = 0;
  let scrollShift = 0;
  let parallaxBound = false;
  let scroller: HTMLElement | null = null;

  const makeNode = (): Node => {
    const depth = 0.35 + rand() * 0.65;
    const amp = 2.2 + rand() * 3.2;
    const ox = rand() * width;
    const oy = rand() * height;
    return {
      ox,
      oy,
      x: ox,
      y: oy,
      depth,
      phase: rand() * Math.PI * 2,
      phaseY: rand() * Math.PI * 2,
      freq: 0.03 + rand() * 0.05,
      freqY: 0.025 + rand() * 0.045,
      ampX: amp,
      ampY: amp * (0.6 + rand() * 0.5),
      glowPhase: rand() * Math.PI * 2,
      glowRate: (Math.PI * 2) / (8 + rand() * 10),
    };
  };

  const place = (n: Node, t: number) => {
    n.x = n.ox + Math.sin(t * n.freq + n.phase) * n.ampX;
    n.y = n.oy + Math.cos(t * n.freqY + n.phaseY) * n.ampY;
  };

  const readColors = () => {
    colors = {
      node: tokenRgb("--muted-foreground", colors.node),
      link: tokenRgb("--primary", colors.link),
      pulse: tokenRgb("--info", colors.pulse),
    };
  };

  /** Fit the backing store to the box; keep existing nodes (rescaled) so a resize never jumps. */
  const fit = () => {
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (width && height) {
      for (const n of nodes) {
        n.ox *= w / width;
        n.oy *= h / height;
      }
    }
    width = w;
    height = h;
    const t = tier(w);
    linkDist = t.link;
    pulseCount = t.pulses;
    const target = Math.min(t.max, Math.round((w * h) / t.area));
    while (nodes.length < target) nodes.push(makeNode());
    nodes.length = target;
    pulses = pulses.filter((p) => p.from < target && p.to < target).slice(0, pulseCount);
    readColors();
  };

  const neighbour = (i: number, exclude = -1) => {
    const a = nodes[i];
    const near: number[] = [];
    for (let j = 0; j < nodes.length; j++) {
      if (j === i || j === exclude) continue;
      const d = Math.hypot(nodes[j].x - a.x, nodes[j].y - a.y);
      if (d < linkDist * 0.85) near.push(j);
    }
    return near.length ? near[Math.floor(rand() * near.length)] : -1;
  };

  const spawnPulse = (from = Math.floor(rand() * nodes.length)) => {
    if (!nodes.length || pulses.length >= pulseCount) return;
    const to = neighbour(from);
    if (to < 0) return;
    pulses.push({ from, to, t: 0, duration: 1.15 + rand() * 0.65 });
  };

  const step = (dt: number) => {
    time += dt;
    for (const n of nodes) place(n, time);
    const ease = 1 - Math.exp(-dt * 2.2);
    const targetX = pointerX * 5;
    const targetY = pointerY * 4 + scrollShift * 4;
    parallaxX += (targetX - parallaxX) * ease;
    parallaxY += (targetY - parallaxY) * ease;
    const next: Pulse[] = [];
    for (const p of pulses) {
      p.t += dt / p.duration;
      if (p.t < 1) next.push(p);
    }
    pulses = next;
    if (time >= nextPulse) {
      spawnPulse();
      nextPulse = time + 1 + rand() * 2;
    }
  };

  const point = (n: Node) => {
    const depthShift = motion.matches ? 0 : 0.45 + n.depth * 0.55;
    return { x: n.x + parallaxX * depthShift, y: n.y + parallaxY * depthShift };
  };

  const draw = (withPulses: boolean) => {
    for (const n of nodes) place(n, time);
    ctx.clearRect(0, 0, width, height);
    const max2 = linkDist * linkDist;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      const pa = point(a);
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > max2) continue;
        const near = 1 - Math.sqrt(d2) / linkDist;
        const alpha = near ** 1.55 * Math.min(a.depth, b.depth) * 0.2;
        if (alpha < 0.012) continue;
        const pb = point(b);
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.lineWidth = 2.2;
        ctx.strokeStyle = rgba(colors.link, alpha * 0.32);
        ctx.stroke();
        ctx.lineWidth = 0.65;
        ctx.strokeStyle = rgba(colors.link, alpha);
        ctx.stroke();
      }
    }
    for (const n of nodes) {
      const glow = 0.78 + 0.22 * Math.sin(time * n.glowRate + n.glowPhase);
      const p = point(n);
      ctx.fillStyle = rgba(colors.node, 0.03 * glow);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.6 + n.depth, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = rgba(colors.node, (0.1 + 0.18 * n.depth) * glow);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 0.55 + n.depth * 0.7, 0, Math.PI * 2);
      ctx.fill();
    }
    if (!withPulses) return;
    for (const p of pulses) {
      const a = nodes[p.from];
      const b = nodes[p.to];
      if (!a || !b) continue;
      const ease = p.t * p.t * (3 - 2 * p.t);
      const pa = point(a);
      const pb = point(b);
      const x = pa.x + (pb.x - pa.x) * ease;
      const y = pa.y + (pb.y - pa.y) * ease;
      const fade = Math.sin(Math.PI * p.t);
      ctx.fillStyle = rgba(colors.pulse, 0.05 * fade);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = rgba(colors.pulse, 0.5 * fade);
      ctx.beginPath();
      ctx.arc(x, y, 1.05, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const frame = (now: number) => {
    raf = window.requestAnimationFrame(frame);
    const elapsed = last ? now - last : FRAME_MS;
    last = now;
    acc += elapsed;
    if (acc < FRAME_MS) return;
    step(Math.min(acc, 100) / 1000);
    acc = 0;
    draw(true);
  };

  const running = () => raf !== 0;
  const start = () => {
    if (running() || motion.matches || !visible || !onScreen) return;
    last = 0;
    raf = window.requestAnimationFrame(frame);
  };
  const stop = () => {
    if (!running()) return;
    window.cancelAnimationFrame(raf);
    raf = 0;
  };
  const onPointer = (e: PointerEvent) => {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    pointerX = e.clientX / w - 0.5;
    pointerY = e.clientY / h - 0.5;
  };
  const onScroll = () => {
    if (!scroller) return;
    const max = scroller.scrollHeight - scroller.clientHeight;
    const p = max > 0 ? scroller.scrollTop / max : 0;
    scrollShift = p - 0.5;
  };
  const bindParallax = () => {
    if (parallaxBound || motion.matches) return;
    scroller =
      canvas.closest(".app-stage")?.querySelector<HTMLElement>(".portfolio-main") ??
      document.querySelector<HTMLElement>(".portfolio-main");
    window.addEventListener("pointermove", onPointer, { passive: true });
    scroller?.addEventListener("scroll", onScroll, { passive: true });
    parallaxBound = true;
  };
  const unbindParallax = () => {
    if (!parallaxBound) return;
    window.removeEventListener("pointermove", onPointer);
    scroller?.removeEventListener("scroll", onScroll);
    parallaxBound = false;
    pointerX = 0;
    pointerY = 0;
    scrollShift = 0;
    parallaxX = 0;
    parallaxY = 0;
  };

  const sync = () => {
    if (motion.matches) {
      stop();
      unbindParallax();
      pulses = [];
      draw(false);
    } else {
      bindParallax();
      start();
    }
  };

  const onVisibility = () => {
    visible = document.visibilityState !== "hidden";
    if (visible) start();
    else stop();
  };
  const onMotion = () => sync();
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      fit();
      if (!running()) draw(!motion.matches);
    }, RESIZE_DEBOUNCE_MS);
  };

  const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(onResize) : null;
  ro?.observe(canvas);
  const io =
    typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(([entry]) => {
          onScreen = entry?.isIntersecting ?? true;
          if (onScreen) start();
          else stop();
        })
      : null;
  io?.observe(canvas);
  document.addEventListener("visibilitychange", onVisibility);
  motion.addEventListener?.("change", onMotion);

  fit();
  visible = document.visibilityState !== "hidden";
  sync();

  return {
    destroy() {
      stop();
      clearTimeout(resizeTimer);
      ro?.disconnect();
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener?.("change", onMotion);
      unbindParallax();
    },
  };
}
