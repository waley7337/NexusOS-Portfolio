/**
 * Section navigation. NexusOS's app-navigation.tsx cannot be imported (it is
 * bound to react-router, route prefetch, framer-motion and permissions), so
 * this reproduces its nav-item recipe — same classes, same active marker
 * (.nav-active-glow on bg-primary/10), same icon treatment — over in-page
 * sections instead of routes.
 */
import { useEffect, useRef } from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { SECTIONS } from "~/sections/registry";
import { profile } from "~/data/profile";

interface NavProps {
  active: string;
  onNavigate: (id: string) => void;
}

export function PortfolioNav({ active, onNavigate, onReplayIntro }: NavProps & { onReplayIntro: () => void }) {
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const seen = useRef(false);

  useEffect(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!nav || !indicator) return;

    const place = (animate: boolean) => {
      const current = nav.querySelector<HTMLElement>('[aria-current="location"]');
      if (!current) {
        indicator.style.opacity = "0";
        return;
      }
      if (!animate) indicator.style.transition = "none";
      indicator.style.opacity = "1";
      indicator.style.height = `${current.offsetHeight}px`;
      indicator.style.transform = `perspective(900px) translate3d(0, ${current.offsetTop}px, 10px)`;
      if (!animate) {
        indicator.getBoundingClientRect();
        indicator.style.transition = "";
      }
    };

    place(seen.current);
    seen.current = true;
    const ro = new ResizeObserver(() => place(false));
    ro.observe(nav);
    return () => ro.disconnect();
  }, [active]);

  return (
    <aside className="hidden h-full min-h-0 flex-col md:flex" aria-label="Portfolio sections">
      <div className="flex h-shell-header shrink-0 items-center px-5">
        <img
          className="nexusos-wordmark-img h-auto w-[132px]"
          src="/brand/nexusos-wordmark.png"
          alt="NexusOS"
          width={132}
          height={20}
          draggable={false}
        />
      </div>
      <div className="px-5 pb-3">
        <p className="text-h4">{profile.name}</p>
        <p className="text-small text-muted-foreground">{profile.role}</p>
      </div>
      <nav ref={navRef} className="portfolio-nav relative flex-1 space-y-0.5 overflow-y-auto overflow-x-clip p-3 pr-4">
        <span ref={indicatorRef} className="portfolio-nav-indicator" aria-hidden="true" />
        {SECTIONS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-current={isActive ? "location" : undefined}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(id);
              }}
              className={cn(
                "portfolio-nav-item focus-ring group relative z-[1] flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-fast",
                isActive ? "font-medium text-foreground" : "text-muted-foreground hover:bg-surface-3 hover:text-foreground",
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors duration-fast",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                )}
              />
              <span className="min-w-0 truncate">{label}</span>
            </a>
          );
        })}
      </nav>
      <div className="shrink-0 border-t border-line-soft p-3">
        <button
          type="button"
          onClick={onReplayIntro}
          className="portfolio-press focus-ring text-machine flex w-full items-center gap-2 rounded-control px-3 py-2 transition-colors duration-fast hover:bg-surface-3 hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="flex-1 text-left">Replay star entry</span>
        </button>
      </div>
    </aside>
  );
}

export function MobileNav({ active, onNavigate }: NavProps) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const current = nav?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!nav || !current) return;
    const left = current.offsetLeft;
    const right = left + current.offsetWidth;
    const view = nav.scrollLeft + nav.clientWidth;
    if (left >= nav.scrollLeft && right <= view) return;
    if (typeof nav.scrollTo !== "function") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    nav.scrollTo({ left: Math.max(0, left - 12), behavior: reduced ? "auto" : "smooth" });
  }, [active]);

  return (
    <nav
      ref={navRef}
      className="portfolio-nav-scroll flex shrink-0 gap-1 overflow-x-auto border-b border-line-soft py-2 md:hidden"
      aria-label="Portfolio sections"
    >
      {SECTIONS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={active === id ? "location" : undefined}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(id);
          }}
          className={cn(
            "portfolio-nav-item focus-ring inline-flex shrink-0 items-center rounded-control px-3 text-xs transition-colors duration-fast",
            active === id ? "bg-primary/10 font-medium text-foreground" : "text-muted-foreground hover:bg-surface-3",
          )}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
