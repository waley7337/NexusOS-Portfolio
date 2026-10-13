/**
 * Contact as a floating window. It is portaled to the document body so the
 * section's perspective cannot trap position:fixed. The window zooms forward
 * from the contact card, then rests slightly in front of the page.
 */
import { useEffect, useLayoutEffect, useRef, useState, type AnimationEvent } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ContactBody, ContactNote } from "~/sections/ContactSection";

export function ContactPreview({
  pose,
  onSettle,
  onClose,
}: {
  pose: "in" | "settled";
  onSettle: () => void;
  onClose: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const onSettleRef = useRef(onSettle);
  const onCloseRef = useRef(onClose);
  const started = useRef(false);
  const [phase, setPhase] = useState<"prep" | "in" | "settled">(pose === "settled" ? "settled" : "prep");
  onSettleRef.current = onSettle;
  onCloseRef.current = onClose;

  useLayoutEffect(() => {
    if (pose === "settled") {
      setPhase("settled");
      return;
    }
    if (started.current) return;
    started.current = true;
    const win = windowRef.current;
    const card = document.querySelector<HTMLElement>(".contact-stage .contact-panel");
    if (win && card) {
      const from = card.getBoundingClientRect();
      const to = win.getBoundingClientRect();
      const dx = from.left + from.width / 2 - (to.left + to.width / 2);
      const dy = from.top + from.height / 2 - (to.top + to.height / 2);
      const scale = to.width > 8 ? Math.max(0.46, Math.min(0.72, from.width / to.width)) : 0.62;
      win.style.setProperty("--contact-dx", `${dx}px`);
      win.style.setProperty("--contact-dy", `${dy}px`);
      win.style.setProperty("--contact-from", scale.toFixed(3));
    }
    setPhase("in");
  }, [pose]);

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
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const onAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target !== windowRef.current) return;
    if (event.animationName !== "contact-window" && event.animationName !== "contact-window-compact") return;
    onSettleRef.current();
  };

  return createPortal(
    <div ref={rootRef} className="contact-preview" data-pose={phase}>
      <div className="contact-preview-scrim" data-testid="contact-preview-scrim" onClick={() => onCloseRef.current()} />
      <div
        ref={windowRef}
        className="contact-preview-window"
        role="dialog"
        aria-modal="true"
        aria-label="Contact"
        onAnimationEnd={onAnimationEnd}
      >
        <div className="contact-preview-bar">
          <p className="text-h4">Contact</p>
          <button type="button" className={buttonVariants({ variant: "secondary", size: "sm" })} onClick={() => onCloseRef.current()}>
            <X aria-hidden="true" />
            Close
          </button>
        </div>
        <div className="contact-preview-body">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <ContactBody />
          </div>
        </div>
        <ContactNote />
      </div>
    </div>,
    document.body,
  );
}
