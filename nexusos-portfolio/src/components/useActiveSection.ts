import { useEffect, useState, type RefObject } from "react";

/**
 * Scroll-spy over the shell's own scroll container (not the window).
 * The current section is the last one whose top has crossed the anchor
 * line, so a short section at the end of the page can still own the tab.
 */
function idsInDomOrder(root: HTMLElement, ids: string[]): string[] {
  const known = new Set(ids);
  const present = [...root.querySelectorAll<HTMLElement>("section[id]")]
    .map((el) => el.id)
    .filter((id) => known.has(id));
  return present.length > 0 ? present : ids;
}

export function useActiveSection(rootRef: RefObject<HTMLElement | null>, ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join("|");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const pick = () => {
      const order = idsInDomOrder(root, ids);
      const line = root.getBoundingClientRect().top + 48;
      let current = order[0];
      for (const id of order) {
        const el = document.getElementById(id);
        if (!el || el.getBoundingClientRect().height === 0) continue;
        if (el.getBoundingClientRect().top <= line) current = id;
      }
      setActive((prev) => (prev === current ? prev : current));
    };
    pick();
    root.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      root.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootRef, key]);

  return active;
}
