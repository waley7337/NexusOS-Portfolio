import { useCallback, useEffect, useRef, useState, type MutableRefObject, type PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import type { Asset } from "~/data/assets";

export interface ArchitectureDiagram {
  asset: Asset;
  label: string;
  copy: string;
}

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const FLY_MS = 720;
const AUTO_DPS = -8;

function useMedia(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, [query]);
  return matches;
}

function norm(deg: number) {
  return ((deg % 360) + 360) % 360;
}

function frontOf(rot: number, count: number) {
  const step = 360 / count;
  const i = Math.round(-rot / step);
  return ((i % count) + count) % count;
}

function closestDelta(from: number, to: number) {
  return ((((to - from) % 360) + 540) % 360) - 180;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/**
 * Diagrams on a CSS 3D ring. The front card is the one facing the camera.
 * Full-resolution files load only after a card is opened.
 */
export function ArchitectureCarousel({ diagrams }: { diagrams: ArchitectureDiagram[] }) {
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const mobile = useMedia("(max-width: 767px)");
  const count = diagrams.length;
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rotRef = useRef(0);
  const velRef = useRef(0);
  const modeRef = useRef<"auto" | "drag" | "coast" | "snap">("auto");
  const snapTarget = useRef(0);
  const pausedRef = useRef(false);
  const movedRef = useRef(false);
  const dragRef = useRef<{ x: number; t: number } | null>(null);
  const [front, setFront] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [inspect, setInspect] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const restoreRef = useRef<HTMLButtonElement | null>(null);

  const apply = useCallback(
    (rot: number) => {
      const ring = ringRef.current;
      const stage = stageRef.current;
      if (!ring || !stage || mobile) return;
      const step = 360 / count;
      const radius = Math.min(280, Math.max(180, stage.clientWidth * 0.26));
      ring.style.transform = `rotateY(${rot}deg)`;
      for (let i = 0; i < count; i++) {
        const card = cardRefs.current[i];
        if (!card) continue;
        const ang = i * step;
        const rel = norm(rot + ang);
        const signed = rel > 180 ? rel - 360 : rel;
        const facing = Math.cos((signed * Math.PI) / 180);
        const t = (facing + 1) / 2;
        // Residual yaw keeps the diagram readable. A full outward face at
        // ±120° would show the back of the image.
        const tilt = clamp(signed * 0.42, -48, 48);
        card.dataset.tilt = tilt.toFixed(2);
        card.style.transform = `rotateY(${ang}deg) translateZ(${radius}px) rotateY(${(-rot - ang + tilt).toFixed(3)}deg)`;
        const face = card.querySelector<HTMLElement>(".arch-face");
        if (face) {
          const recede = inspect !== null ? 0.45 : 1;
          face.style.opacity = String((0.32 + 0.68 * t) * recede);
          face.style.filter = reduced ? "none" : `blur(${((1 - t) * 1.5).toFixed(2)}px)`;
        }
        card.style.zIndex = String(10 + Math.round(t * 30));
        card.style.visibility = inspect === i ? "hidden" : "visible";
      }
    },
    [count, inspect, mobile, reduced],
  );

  useEffect(() => {
    apply(rotRef.current);
  }, [apply, front]);

  useEffect(() => {
    if (reduced || mobile || typeof requestAnimationFrame !== "function") return;
    let alive = true;
    let raf = 0;
    let last = 0;
    const loop = (now: number) => {
      if (!alive) return;
      const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
      last = now;
      const mode = modeRef.current;
      if (mode === "coast") {
        velRef.current *= Math.exp(-dt * 3.4);
        rotRef.current += velRef.current * dt;
        if (Math.abs(velRef.current) < 12) {
          const step = 360 / count;
          snapTarget.current = Math.round(rotRef.current / step) * step;
          modeRef.current = "snap";
        }
      } else if (mode === "snap") {
        const diff = snapTarget.current - rotRef.current;
        rotRef.current += diff * (1 - Math.exp(-dt * 9));
        if (Math.abs(diff) < 0.08) {
          rotRef.current = snapTarget.current;
          modeRef.current = "auto";
          velRef.current = 0;
        }
      } else if (mode === "auto" && !pausedRef.current && inspect === null) {
        rotRef.current += AUTO_DPS * dt;
      }
      apply(rotRef.current);
      const next = frontOf(rotRef.current, count);
      setFront((prev) => (prev === next ? prev : next));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, [apply, count, inspect, mobile, reduced]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el || mobile) return;
    const onWheel = (e: WheelEvent) => {
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
      if (!horizontal || inspect !== null) return;
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      rotRef.current -= delta * 0.18;
      velRef.current = -delta * 0.6;
      modeRef.current = "coast";
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [inspect, mobile]);

  const goTo = (index: number) => {
    const target = -index * (360 / count);
    if (reduced || mobile || typeof requestAnimationFrame !== "function") {
      rotRef.current = target;
      apply(target);
      setFront(index);
      return;
    }
    snapTarget.current = rotRef.current + closestDelta(rotRef.current, target);
    modeRef.current = "snap";
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (inspect !== null) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo((front + 1) % count);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo((front - 1 + count) % count);
    }
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (mobile || e.button !== 0 || inspect !== null) return;
    movedRef.current = false;
    dragRef.current = { x: e.clientX, t: performance.now() };
    modeRef.current = "drag";
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || modeRef.current !== "drag") return;
    const dx = e.clientX - drag.x;
    if (Math.abs(dx) > 5) movedRef.current = true;
    const dt = Math.max(0.016, (performance.now() - drag.t) / 1000);
    rotRef.current -= dx * 0.32;
    velRef.current = (-dx * 0.32) / dt;
    drag.x = e.clientX;
    drag.t = performance.now();
    apply(rotRef.current);
  };
  const onPointerUp = () => {
    if (modeRef.current !== "drag") return;
    dragRef.current = null;
    modeRef.current = reduced ? "auto" : "coast";
    if (reduced) {
      const step = 360 / count;
      rotRef.current = Math.round(rotRef.current / step) * step;
      apply(rotRef.current);
      setFront(frontOf(rotRef.current, count));
    }
  };

  const open = (index: number, el: HTMLButtonElement) => {
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    restoreRef.current = el;
    setLoaded((prev) => ({ ...prev, [diagrams[index].asset.id]: true }));
    setInspect(index);
    pausedRef.current = true;
  };

  const close = () => {
    setInspect(null);
    pausedRef.current = false;
  };

  const stepInspect = (dir: number) => {
    if (inspect === null) return;
    const next = (inspect + dir + count) % count;
    setLoaded((prev) => ({ ...prev, [diagrams[next].asset.id]: true }));
    setInspect(next);
    goTo(next);
  };

  return (
    <div className="space-y-6">
      {mobile ? (
        <MobileRing
          diagrams={diagrams}
          reduced={reduced}
          index={mobileIndex}
          onIndex={setMobileIndex}
          onOpen={open}
          cardRefs={cardRefs}
        />
      ) : (
        <div
          ref={stageRef}
          className="arch-scene"
          data-inspecting={inspect !== null ? "true" : "false"}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            if (inspect === null) pausedRef.current = false;
          }}
          onFocusCapture={() => {
            pausedRef.current = true;
          }}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node) && inspect === null) pausedRef.current = false;
          }}
        >
          <div ref={ringRef} className="arch-ring">
            {diagrams.map((diagram, i) => (
              <button
                key={diagram.asset.id}
                ref={(node) => {
                  cardRefs.current[i] = node;
                }}
                type="button"
                className="arch-card focus-ring"
                aria-label={`Inspect ${diagram.asset.title}`}
                aria-current={i === front ? "true" : undefined}
                onClick={(e) => open(i, e.currentTarget)}
              >
                <span className="arch-face">
                  <img src={diagram.asset.preview ?? diagram.asset.src} alt="" loading="lazy" draggable={false} />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="arch-captions">
        {diagrams.map((diagram, i) => {
          const active = (mobile ? mobileIndex : front) === i;
          return (
          <div key={diagram.asset.id} className="arch-caption" data-active={active ? "true" : "false"} aria-hidden={active ? undefined : true}>
            <p className="eyebrow">{diagram.label}</p>
            <h3 className="text-h2">{diagram.asset.title}</h3>
            <p className="text-body text-muted-foreground">{diagram.copy}</p>
          </div>
          );
        })}
      </div>

      {inspect !== null && (
        <InspectView
          diagram={diagrams[inspect]}
          reduced={reduced || mobile}
          lite={mobile}
          src={loaded[diagrams[inspect].asset.id] ? diagrams[inspect].asset.src : diagrams[inspect].asset.preview ?? diagrams[inspect].asset.src}
          origin={cardRefs.current[inspect]}
          onClose={() => {
            close();
            restoreRef.current?.focus();
          }}
          onStep={stepInspect}
        />
      )}
    </div>
  );
}

function MobileRing({
  diagrams,
  reduced,
  index,
  onIndex,
  onOpen,
  cardRefs,
}: {
  diagrams: ArchitectureDiagram[];
  reduced: boolean;
  index: number;
  onIndex: (index: number) => void;
  onOpen: (index: number, el: HTMLButtonElement) => void;
  cardRefs: MutableRefObject<(HTMLButtonElement | null)[]>;
}) {
  const [dragX, setDragX] = useState(0);
  const [animate, setAnimate] = useState(true);
  const start = useRef<{ x: number; t: number; moved: boolean } | null>(null);
  const count = diagrams.length;

  const settle = (dx: number, vx: number) => {
    let next = index;
    if (dx < -48 || vx < -0.4) next = Math.min(count - 1, index + 1);
    else if (dx > 48 || vx > 0.4) next = Math.max(0, index - 1);
    setAnimate(!reduced);
    onIndex(next);
    setDragX(0);
  };

  return (
    <div
      className="arch-swipe"
      onPointerDown={(e) => {
        if (e.button !== 0) return;
        start.current = { x: e.clientX, t: performance.now(), moved: false };
        setAnimate(false);
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!start.current) return;
        const dx = e.clientX - start.current.x;
        if (Math.abs(dx) > 6) start.current.moved = true;
        setDragX(dx);
      }}
      onPointerUp={(e) => {
        if (!start.current) return;
        const dx = e.clientX - start.current.x;
        const dt = Math.max(16, performance.now() - start.current.t);
        const moved = start.current.moved;
        start.current = null;
        if (!moved) {
          setDragX(0);
          return;
        }
        settle(dx, dx / dt);
      }}
    >
      <div
        className="arch-track"
        style={{
          transform: `translate3d(calc(${-index * 100}% + ${dragX}px), 0, 0)`,
          transition: animate ? `transform 220ms ${EASE}` : "none",
        }}
      >
        {diagrams.map((diagram, i) => (
          <button
            key={diagram.asset.id}
            ref={(node) => {
              cardRefs.current[i] = node;
            }}
            type="button"
            className="arch-card focus-ring"
            aria-label={`Inspect ${diagram.asset.title}`}
            aria-current={i === index ? "true" : undefined}
            onClick={(e) => {
              if (i !== index) {
                onIndex(i);
                return;
              }
              onOpen(i, e.currentTarget);
            }}
          >
            <span className="arch-face">
              <img src={diagram.asset.preview ?? diagram.asset.src} alt="" loading="lazy" draggable={false} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function InspectView({
  diagram,
  reduced,
  lite,
  src,
  origin,
  onClose,
  onStep,
}: {
  diagram: ArchitectureDiagram;
  reduced: boolean;
  lite: boolean;
  src: string;
  origin: HTMLButtonElement | null;
  onClose: () => void;
  onStep: (dir: number) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const canFly = !reduced && typeof requestAnimationFrame === "function";
  const [phase, setPhase] = useState<"from" | "open" | "back">(canFly ? "from" : "open");
  const onCloseRef = useRef(onClose);
  const onStepRef = useRef(onStep);
  onCloseRef.current = onClose;
  onStepRef.current = onStep;
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; scale: number } | null>(null);
  const pan = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !canFly || phase !== "from") return;
    const rect = origin?.getBoundingClientRect();
    const finalW = Math.min(960, window.innerWidth - 48);
    const tilt = Number(origin?.dataset.tilt || 18);
    const from = rect
      ? `translate(calc(-50% + ${rect.left + rect.width / 2 - window.innerWidth / 2}px), calc(-50% + ${rect.top + rect.height / 2 - window.innerHeight / 2}px)) rotateY(${Number.isFinite(tilt) ? tilt : 18}deg) scale(${Math.max(0.18, rect.width / finalW)})`
      : "translate(-50%, -50%) scale(0.92)";
    card.style.transition = "none";
    card.style.transform = from;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        card.style.transition = `transform ${FLY_MS}ms ${EASE}`;
        card.style.transform = "translate(-50%, -50%) rotateY(0deg) scale(1)";
        setPhase("open");
      });
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [canFly, origin, phase]);

  const requestClose = () => {
    const card = cardRef.current;
    const rect = origin?.getBoundingClientRect();
    if (!canFly || !card || !rect || rect.width < 2) {
      onCloseRef.current();
      return;
    }
    const finalW = Math.min(960, window.innerWidth - 48);
    card.style.transition = `transform ${FLY_MS}ms ${EASE}`;
    const tilt = Number(origin?.dataset.tilt || 18);
    card.style.transform = `translate(calc(-50% + ${rect.left + rect.width / 2 - window.innerWidth / 2}px), calc(-50% + ${rect.top + rect.height / 2 - window.innerHeight / 2}px)) rotateY(${Number.isFinite(tilt) ? tilt : 18}deg) scale(${Math.max(0.18, rect.width / finalW)})`;
    setPhase("back");
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      onCloseRef.current();
    };
    card.addEventListener("transitionend", finish, { once: true });
    window.setTimeout(finish, FLY_MS + 50);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const focusable = () =>
      [...root.querySelectorAll<HTMLElement>("button, [href], [tabindex]:not([tabindex='-1'])")].filter(
        (el) => !el.hasAttribute("disabled"),
      );
    const timer = window.setTimeout(() => focusable()[0]?.focus(), 0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        requestClose();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setView({ scale: 1, x: 0, y: 0 });
        onStepRef.current(1);
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setView({ scale: 1, x: 0, y: 0 });
        onStepRef.current(-1);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
    };
  }, [diagram.asset.id]);

  useEffect(() => {
    const el = rootRef.current?.querySelector<HTMLElement>(".arch-zoom");
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const dir = e.deltaY < 0 ? 1.08 : 0.92;
      setView((v) => ({ ...v, scale: clamp(v.scale * dir, 1, 4), x: v.scale * dir <= 1 ? 0 : v.x, y: v.scale * dir <= 1 ? 0 : v.y }));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const onZoomPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    e.currentTarget.setPointerCapture(e.pointerId);
    if (pointers.current.size === 1) pan.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y };
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale: view.scale };
      pan.current = null;
    }
  };
  const onZoomPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y) || 1;
      const scale = clamp(pinch.current.scale * (dist / pinch.current.dist), 1, 4);
      setView((v) => ({ ...v, scale, x: scale <= 1 ? 0 : v.x, y: scale <= 1 ? 0 : v.y }));
      return;
    }
    if (pan.current && view.scale > 1) {
      setView((v) => ({
        ...v,
        x: pan.current!.vx + (e.clientX - pan.current!.x),
        y: pan.current!.vy + (e.clientY - pan.current!.y),
      }));
    }
  };
  const onZoomPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (pointers.current.size === 0) pan.current = null;
  };

  return createPortal(
    <div ref={rootRef} className="arch-inspect" data-lite={lite ? "true" : "false"} data-reduced={reduced ? "true" : "false"}>
      <div className="arch-scrim" onClick={requestClose} />
      <div
        ref={cardRef}
        className="arch-flight"
        role="dialog"
        aria-modal="true"
        aria-label={diagram.asset.title}
        data-phase={phase}
      >
        <div className="arch-flight-bar">
          <p className="text-h4">{diagram.asset.title}</p>
          <button type="button" className={buttonVariants({ variant: "secondary", size: "sm" })} onClick={requestClose}>
            <X aria-hidden="true" />
            Close
          </button>
        </div>
        <div
          className="arch-zoom"
          onPointerDown={onZoomPointerDown}
          onPointerMove={onZoomPointerMove}
          onPointerUp={onZoomPointerUp}
          onPointerCancel={onZoomPointerUp}
          onDoubleClick={() => setView({ scale: 1, x: 0, y: 0 })}
        >
          <img
            src={src}
            alt={diagram.asset.title}
            draggable={false}
            style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}
          />
        </div>
        <div className="arch-flight-foot">
          <button type="button" className={buttonVariants({ variant: "outline", size: "sm" })} onClick={() => onStep(-1)}>
            Previous diagram
          </button>
          <p className="text-small text-muted-foreground">{diagram.copy}</p>
          <button type="button" className={buttonVariants({ variant: "outline", size: "sm" })} onClick={() => onStep(1)}>
            Next diagram
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
