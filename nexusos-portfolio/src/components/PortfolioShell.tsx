/**
 * PortfolioShell — the framed NexusOS workspace the star-entry resolves
 * into.
 *
 * Markup and classes are AppLayout's (.app-stage > Atmosphere +
 * .app-shell-frame > .chassis with a real rail track), so the shell picks up
 * the product's frame, ambient light and reveal keyframe from globals.css.
 * The two DOM-only effects below are AppLayout's reveal logic, unchanged in
 * behaviour: data-reveal="cinematic" is set only when this shell mounted
 * during the cinematic, and removed once it settles.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Atmosphere } from "@/components/atmosphere";
import { useUiStore } from "@/stores/ui";
import { NeuralBackground } from "~/animations/NeuralBackground";
import { ContactPreview } from "~/components/ContactPreview";
import { PortfolioNav, MobileNav } from "~/components/PortfolioNav";
import { useActiveSection } from "~/components/useActiveSection";
import { ContactPreviewRequest } from "~/sections/ContactSection";
import { SECTIONS } from "~/sections/registry";

export function PortfolioShell({ children, onReplayIntro }: { children: ReactNode; onReplayIntro: () => void }) {
  const authEntryActive = useUiStore((s) => s.isAuthEntryActive);
  const stageRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const revealFromCinematic = useRef(useUiStore.getState().isAuthEntryActive);
  const active = useActiveSection(mainRef, SECTIONS.map((s) => s.id));
  const contactPose = useRef<"off" | "in" | "settled">("off");
  const [contactPreview, setContactPreview] = useState<"off" | "in" | "settled">("off");
  const openerRef = useRef<HTMLElement | null>(null);
  const spatialEnd = useRef<((event: AnimationEvent) => void) | null>(null);
  const previousActive = useRef(active);
  const smoothNav = useRef<string | null>(null);
  const contactArrival = useRef(0);

  useEffect(() => {
    const el = stageRef.current;
    if (!el || !revealFromCinematic.current) return;
    if (authEntryActive) {
      el.dataset.reveal = "cinematic";
    } else {
      delete el.dataset.reveal;
      revealFromCinematic.current = false;
    }
  }, [authEntryActive]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    el.dataset.entry = "in";
    if (authEntryActive) return;
    let f2 = 0;
    const f1 = window.requestAnimationFrame(() => {
      f2 = window.requestAnimationFrame(() => {
        el.dataset.entry = "settled";
      });
    });
    return () => {
      window.cancelAnimationFrame(f1);
      window.cancelAnimationFrame(f2);
    };
  }, [authEntryActive]);

  const resetContact = (restoreFocus: boolean) => {
    const section = document.getElementById("contact");
    contactPose.current = "off";
    if (section) delete section.dataset.contactPose;
    setContactPreview("off");
    if (!restoreFocus) return;
    const opener = openerRef.current;
    openerRef.current = null;
    opener?.focus();
  };

  const presentContact = () => {
    const section = document.getElementById("contact");
    if (!section) return;
    const pose = section.dataset.contactPose;
    if (pose === "in" || pose === "settled") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const next = reduced ? "settled" : "in";
    section.dataset.visible = "true";
    section.dataset.contactPose = next;
    contactPose.current = next;
    setContactPreview(next);
  };

  const settleContact = () => {
    const section = document.getElementById("contact");
    if (!section || section.dataset.contactPose !== "in") return;
    section.dataset.contactPose = "settled";
    contactPose.current = "settled";
    setContactPreview("settled");
  };

  const clearSpatial = () => {
    const current = document.querySelector<HTMLElement>('[data-spatial="in"]');
    if (current && spatialEnd.current) current.removeEventListener("animationend", spatialEnd.current);
    spatialEnd.current = null;
    document.querySelectorAll<HTMLElement>("[data-spatial]").forEach((node) => {
      delete node.dataset.spatial;
    });
  };

  const presentSpatial = (id: string) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = document.getElementById(id);
    if (!section || section.dataset.spatial === "in") return;
    clearSpatial();
    section.dataset.spatial = "in";
    const onEnd = (event: AnimationEvent) => {
      if (event.target !== section || event.animationName !== "spatial-float") return;
      delete section.dataset.spatial;
      section.removeEventListener("animationend", onEnd);
      if (spatialEnd.current === onEnd) spatialEnd.current = null;
    };
    spatialEnd.current = onEnd;
    section.addEventListener("animationend", onEnd);
  };

  const requestContactPreview = () => {
    if (contactPose.current === "in" || contactPose.current === "settled") return;
    clearSpatial();
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    window.history.replaceState(null, "", "#contact");
    presentContact();
  };

  const contactInView = () => {
    const main = mainRef.current;
    const section = document.getElementById("contact");
    if (!main || !section) return false;
    const mainBox = main.getBoundingClientRect();
    const box = section.getBoundingClientRect();
    return box.top < mainBox.top + 80 && box.bottom > mainBox.top + 48;
  };

  const goTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const arrival = ++contactArrival.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wasHere =
      id === "contact" &&
      (active === "contact" || contactInView() || contactPose.current === "in" || contactPose.current === "settled");
    if (id === "contact") clearSpatial();
    else resetContact(false);
    const before = mainRef.current?.scrollTop ?? 0;
    smoothNav.current = reduced ? null : id;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    const sameSection = id !== "contact" && active === id;
    if (id === "contact" && !wasHere) {
      openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    }
    if (wasHere || sameSection || reduced) {
      if (id === "contact" && !wasHere && reduced) presentContact();
      return;
    }
    const main = mainRef.current;
    let played = false;
    const play = () => {
      if (played || arrival !== contactArrival.current) return;
      played = true;
      if (id === "contact") presentContact();
      else presentSpatial(id);
    };
    main?.addEventListener("scrollend", play, { once: true });
    window.setTimeout(() => {
      if (main && main.scrollTop !== before) return;
      play();
    }, 80);
    // Some browsers never emit scrollend. Play once the smooth scroll has
    // had time to land, and not while the section is still off screen.
    window.setTimeout(play, 900);
  };

  useEffect(() => {
    if (previousActive.current === "contact" && active !== "contact" && contactPose.current === "settled") {
      resetContact(false);
    }
    previousActive.current = active;
  }, [active]);

  useEffect(() => {
    let cancelled = false;
    const scrollToHash = (animate: boolean) => {
      if (cancelled) return;
      const id = window.location.hash.replace(/^#/, "");
      if (!SECTIONS.some((section) => section.id === id)) return;
      const target = document.getElementById(id);
      if (!target) return;
      // A tab click already started a smooth scroll to this section. A late
      // hash correction would cut that scroll short and start the contact
      // travel before the section is in view.
      if (smoothNav.current === id) return;
      if (id === "contact") presentContact();
      else {
        resetContact(false);
        if (animate) presentSpatial(id);
      }
      target.scrollIntoView({ behavior: "auto", block: "start" });
    };
    const align = () => scrollToHash(false);
    align();
    // Fonts and late image layout shift the inner scroller after the first
    // paint. Repeat until those settle so a hash lands on its section.
    const late = window.setTimeout(align, 600);
    const onHash = () => scrollToHash(true);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("load", align);
    void document.fonts?.ready.then(align);
    return () => {
      cancelled = true;
      window.clearTimeout(late);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("load", align);
    };
  }, []);

  return (
    <div ref={stageRef} className="app-stage h-dvh overflow-hidden text-foreground" data-testid="portfolio-shell">
      <Atmosphere />
      <div className="app-shell-frame">
        <div className="chassis h-full overflow-hidden bg-transparent">
          {/* Inside the chassis, not behind it. The shell fill is opaque, so a
              stage-level canvas never reaches the page. The layer still spans
              the nav and the workspace. */}
          <NeuralBackground />
          <PortfolioNav active={active} onNavigate={goTo} onReplayIntro={onReplayIntro} />
          <div className="chassis-rail hidden md:block" aria-hidden="true" />
          <div className="flex min-h-0 min-w-0 flex-col overflow-hidden">
            <MobileNav active={active} onNavigate={goTo} />
            <main ref={mainRef} id="main" className="portfolio-main relative h-full min-h-0 flex-1 overflow-y-auto" tabIndex={-1}>
              <ContactPreviewRequest.Provider value={requestContactPreview}>{children}</ContactPreviewRequest.Provider>
            </main>
          </div>
        </div>
      </div>
      {contactPreview !== "off" && (
        <ContactPreview pose={contactPreview} onSettle={settleContact} onClose={() => resetContact(true)} />
      )}
    </div>
  );
}
