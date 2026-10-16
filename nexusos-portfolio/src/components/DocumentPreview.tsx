import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type { Asset } from "~/data/assets";
import { AssetActions } from "~/components/AssetPreviewDialog";
import { blockPreviewGesture } from "~/components/previewGuard";

/**
 * On-page document shot. Same face and inspect viewer as the architecture
 * diagrams: the existing preview image, at that image's aspect ratio, with
 * no browser PDF chrome. Opening the PDF stays on View PDF.
 */
export function DocumentPreview({ asset }: { asset: Asset }) {
  const preview = asset.preview;
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  if (!preview) return null;

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="doc-shot preview-guard focus-ring"
        data-testid={`preview-${asset.id}`}
        data-preview-guard="true"
        aria-label={`Inspect ${asset.title}`}
        onClick={() => setOpen(true)}
        onContextMenu={blockPreviewGesture}
        onDragStart={blockPreviewGesture}
      >
        <span className="arch-face">
          <img src={preview} alt="" loading="lazy" draggable={false} />
        </span>
      </button>
      {open && (
        <DocumentInspect
          asset={asset}
          src={preview}
          onClose={() => {
            setOpen(false);
            buttonRef.current?.focus();
          }}
        />
      )}
    </>
  );
}

function DocumentInspect({ asset, src, onClose }: { asset: Asset; src: string; onClose: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

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
        onCloseRef.current();
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
  }, [asset.id]);

  return createPortal(
    <div ref={rootRef} className="arch-inspect">
      <div className="arch-scrim" data-testid="cv-lightbox-scrim" onClick={() => onCloseRef.current()} />
      <div className="arch-flight" role="dialog" aria-modal="true" aria-label={asset.title}>
        <div className="arch-flight-bar">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <p className="text-h4">{asset.title}</p>
            <Badge>{asset.meta}</Badge>
          </div>
          <button type="button" className={buttonVariants({ variant: "secondary", size: "sm" })} onClick={() => onCloseRef.current()}>
            <X aria-hidden="true" />
            Close
          </button>
        </div>
        <div
          className="arch-zoom preview-guard"
          data-preview-guard="true"
          onContextMenu={blockPreviewGesture}
          onDragStart={blockPreviewGesture}
        >
          <img src={src} alt={asset.title} draggable={false} />
        </div>
        <p className="arch-flight-copy text-sm text-muted-foreground">{asset.description}</p>
        <AssetActions asset={asset} className="shrink-0" />
      </div>
    </div>,
    document.body,
  );
}
