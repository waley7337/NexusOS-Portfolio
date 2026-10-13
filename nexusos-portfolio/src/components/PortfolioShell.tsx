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
import { useEffect, useRef, type ReactNode } from "react";
import { Atmosphere } from "@/components/atmosphere";
import { useUiStore } from "@/stores/ui";
import { NeuralBackground } from "~/animations/NeuralBackground";
import { PortfolioNav, MobileNav } from "~/components/PortfolioNav";
import { useActiveSection } from "~/components/useActiveSection";
import { SECTIONS } from "~/sections/registry";

export function PortfolioShell({ children, onReplayIntro }: { children: ReactNode; onReplayIntro: () => void }) {
  const authEntryActive = useUiStore((s) => s.isAuthEntryActive);
  const stageRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const revealFromCinematic = useRef(useUiStore.getState().isAuthEntryActive);
  const active = useActiveSection(mainRef, SECTIONS.map((s) => s.id));
  const contactPose = useRef<"off" | "in" | "settled">("off");
  const contactEnd = useRef<((event: Event) => void) | null>(null);
  const previousActive = useRef(active);
  const smoothNav = useRef<string | null>(null);

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

  const resetContact = () => {
    const section = document.getElementById("contact");
    const panel = section?.querySelector(".contact-panel");
    if (panel && contactEnd.current) panel.removeEventListener("animationend", contactEnd.current);
    contactEnd.current = null;
    contactPose.current = "off";
    if (section) delete section.dataset.contactPose;
  };

  const presentContact = () => {
    const section = document.getElementById("contact");
    if (!section) return;
    const pose = section.dataset.contactPose;
    if (pose === "in" || pose === "settled") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.dataset.visible = "true";
    if (reduced) {
      section.dataset.contactPose = "settled";
      contactPose.current = "settled";
      return;
    }
    section.dataset.contactPose = "in";
    contactPose.current = "in";
    const panel = section.querySelector(".contact-panel");
    if (!panel) return;
    const onEnd = (event: Event) => {
      if (event.target !== panel) return;
      if (section.dataset.contactPose !== "in") return;
      section.dataset.contactPose = "settled";
      contactPose.current = "settled";
      panel.removeEventListener("animationend", onEnd);
      if (contactEnd.current === onEnd) contactEnd.current = null;
    };
    contactEnd.current = onEnd;
    panel.addEventListener("animationend", onEnd);
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
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (id === "contact") {
      const already =
        active === "contact" ||
        contactInView() ||
        contactPose.current === "in" ||
        contactPose.current === "settled";
      if (!already) presentContact();
    } else {
      resetContact();
    }
    smoothNav.current = reduced ? null : id;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  useEffect(() => {
    if (previousActive.current === "contact" && active !== "contact" && contactPose.current === "settled") {
      resetContact();
    }
    previousActive.current = active;
  }, [active]);

  useEffect(() => {
    let cancelled = false;
    const scrollToHash = () => {
      if (cancelled) return;
      const id = window.location.hash.replace(/^#/, "");
      if (!SECTIONS.some((section) => section.id === id)) return;
      const target = document.getElementById(id);
      if (!target) return;
      if (id === "contact") presentContact();
      else resetContact();
      // A tab click already started a smooth scroll to this section. A late
      // hash correction would cut that scroll short.
      if (smoothNav.current === id) return;
      target.scrollIntoView({ behavior: "auto", block: "start" });
    };
    scrollToHash();
    // Fonts and late image layout shift the inner scroller after the first
    // paint. Repeat until those settle so a hash lands on its section.
    const late = window.setTimeout(scrollToHash, 600);
    window.addEventListener("hashchange", scrollToHash);
    window.addEventListener("load", scrollToHash);
    void document.fonts?.ready.then(scrollToHash);
    return () => {
      cancelled = true;
      window.clearTimeout(late);
      window.removeEventListener("hashchange", scrollToHash);
      window.removeEventListener("load", scrollToHash);
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
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
