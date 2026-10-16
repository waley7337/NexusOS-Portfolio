import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { AssetActions } from "~/components/AssetPreviewDialog";
import { blockPreviewGesture } from "~/components/previewGuard";
import type { Asset } from "~/data/assets";

export interface ArchitectureDiagram {
  asset: Asset;
  label: string;
  copy: string;
}

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const FLY_MS = 720;
/** Index steps start slow and then move quickly, matching the eased slider in the linear-carousel reference. */
const SLIDE_EASE = "cubic-bezier(0.62, 0.05, 0.9, 0.35)";
const TRAVEL_MS = 900;
const MAX_SCALE = 1;
const MIN_SCALE = 0.5;
/** Matches `.arch-flight` so the open animation scales to the real viewer. */
function flightWidth() {
  return Math.min(1680, window.innerWidth - 48);
}

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

function wrappedDelta(i: number, index: number, count: number) {
  let d = i - index;
  d %= count;
  if (d > count / 2) d -= count;
  if (d < -count / 2) d += count;
  return d;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/**
 * Linear carousel. An index slider centres one diagram; the others sit beside
 * it at the reference minimum scale (50 when the centre is 100). The strip
 * eases to a new index only when commanded — click, drag, arrow keys, or the
 * previous and next controls — and wraps. prefers-reduced-motion replaces the
 * travel with an instant change. Full-resolution files load only after a card
 * is opened.
 */
export function ArchitectureCarousel({
  diagrams,
  controlLabel = "architecture diagram",
}: {
  diagrams: ArchitectureDiagram[];
  /** Accessible name for the previous and next controls. Defaults keep the architecture tests stable. */
  controlLabel?: string;
}) {
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const mobile = useMedia("(max-width: 767px)");
  const count = diagrams.length;
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const movedRef = useRef(false);
  const dragRef = useRef<{ x: number } | null>(null);
  const placed = useRef<number[] | null>(null);
  const [index, setIndex] = useState(0);
  const [inspect, setInspect] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const restoreRef = useRef<HTMLButtonElement | null>(null);
  const deltas = diagrams.map((_, i) => wrappedDelta(i, index, count));
  const jumps = deltas.map((d, i) => placed.current !== null && Math.abs(d - placed.current[i]) > 1);

  useEffect(() => {
    placed.current = deltas;
  });

  const goTo = (next: number) => setIndex(((next % count) + count) % count);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (inspect !== null) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(index - 1);
    }
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if ((e.button ?? 0) !== 0 || inspect !== null) return;
    // Capturing here retargets the click away from the diagram button, so a
    // tap never opens the viewer. Capture only after the gesture is a drag.
    movedRef.current = false;
    dragRef.current = { x: e.clientX };
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    if (Math.abs(e.clientX - drag.x) <= 8) return;
    movedRef.current = true;
    const el = e.currentTarget;
    if (typeof el.setPointerCapture !== "function") return;
    try {
      if (typeof el.hasPointerCapture !== "function" || !el.hasPointerCapture(e.pointerId)) {
        el.setPointerCapture(e.pointerId);
      }
    } catch {
      /* The pointer can already be gone in tests. */
    }
  };
  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag || !movedRef.current) return;
    const dx = e.clientX - drag.x;
    if (dx <= -48) goTo(index + 1);
    else if (dx >= 48) goTo(index - 1);
  };

  const open = (i: number, el: HTMLButtonElement) => {
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    restoreRef.current = el;
    setLoaded((prev) => ({ ...prev, [diagrams[i].asset.id]: true }));
    setInspect(i);
    goTo(i);
  };

  const close = () => setInspect(null);

  const stepInspect = (dir: number) => {
    if (inspect === null) return;
    const next = (inspect + dir + count) % count;
    setLoaded((prev) => ({ ...prev, [diagrams[next].asset.id]: true }));
    setInspect(next);
    goTo(next);
  };

  return (
    <div
      className="grid items-center gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]"
      onKeyDown={onKeyDown}
    >
      <div
        className="arch-linear"
        data-reduced={reduced ? "true" : "false"}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {diagrams.map((diagram, i) => {
          const d = deltas[i];
          const scale = d === 0 ? MAX_SCALE : MIN_SCALE;
          return (
            <button
              key={diagram.asset.id}
              ref={(node) => {
                cardRefs.current[i] = node;
              }}
              type="button"
              className="arch-card preview-guard focus-ring"
              data-tilt="0"
              data-preview-guard="true"
              aria-label={`Inspect ${diagram.asset.title}`}
              aria-current={i === index ? "true" : undefined}
              onContextMenu={blockPreviewGesture}
              onDragStart={blockPreviewGesture}
              onClick={(e) => open(i, e.currentTarget)}
              style={{
                transform: `translate(-50%, -50%) translateX(calc(${d} * (92% + 18px))) scale(${scale})`,
                transition: reduced || jumps[i] ? "none" : `transform ${TRAVEL_MS}ms ${SLIDE_EASE}`,
                zIndex: d === 0 ? 3 : 1,
              }}
            >
              <span className="arch-face">
                <img src={diagram.asset.preview ?? diagram.asset.src} alt="" loading="lazy" draggable={false} />
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        <div className="arch-captions">
          {diagrams.map((diagram, i) => {
            const active = index === i;
            return (
              <div key={diagram.asset.id} className="arch-caption space-y-2" data-active={active ? "true" : "false"} aria-hidden={active ? undefined : true}>
                <p className="eyebrow">{diagram.label}</p>
                <h3 className="text-h2">{diagram.asset.title}</h3>
                <p className="text-body text-muted-foreground">{diagram.copy}</p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={buttonVariants({ variant: "outline", size: "sm" })}
            aria-label={`Previous ${controlLabel}`}
            onClick={() => goTo(index - 1)}
          >
            Previous
          </button>
          <button
            type="button"
            className={buttonVariants({ variant: "outline", size: "sm" })}
            aria-label={`Next ${controlLabel}`}
            onClick={() => goTo(index + 1)}
          >
            Next
          </button>
        </div>
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
    const finalW = flightWidth();
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
    const finalW = flightWidth();
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
    const nodes = [document.documentElement, document.body];
    const main = document.getElementById("main");
    if (main) nodes.push(main);
    const previous = nodes.map((el) => el.style.overflow);
    for (const el of nodes) el.style.overflow = "hidden";
    return () => {
      nodes.forEach((el, i) => {
        el.style.overflow = previous[i] ?? "";
      });
    };
  }, []);

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
      <div className="arch-scrim" data-testid="architecture-lightbox-scrim" onClick={requestClose} />
      <div
        ref={cardRef}
        className="arch-flight"
        role="dialog"
        aria-modal="true"
        aria-label={diagram.asset.title}
        data-phase={phase}
      >
        <div className="arch-flight-bar">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <p className="text-h4">{diagram.asset.title}</p>
            <Badge>{diagram.asset.meta}</Badge>
          </div>
          <button type="button" className={buttonVariants({ variant: "secondary", size: "sm" })} onClick={requestClose}>
            <X aria-hidden="true" />
            Close
          </button>
        </div>
        <div
          className="arch-zoom preview-guard"
          data-preview-guard="true"
          onContextMenu={blockPreviewGesture}
          onDragStart={blockPreviewGesture}
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
        <div className="arch-flight-copy space-y-1">
          <p className="text-sm text-muted-foreground">{diagram.asset.description}</p>
          <p className="text-small text-muted-foreground">{diagram.copy}</p>
        </div>
        <AssetActions asset={diagram.asset} className="shrink-0" />
        <div className="arch-flight-foot">
          <button type="button" className={buttonVariants({ variant: "outline", size: "sm" })} onClick={() => onStep(-1)}>
            Previous diagram
          </button>
          <button type="button" className={buttonVariants({ variant: "outline", size: "sm" })} onClick={() => onStep(1)}>
            Next diagram
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
