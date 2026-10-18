import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { progressById, progressChrome, progressStatusLabel, type ProgressStatus } from "~/data/projectStatus";
import { usePortfolioLanguage } from "~/i18n/language";

const STATUS_VARIANT: Record<ProgressStatus, "success" | "info" | "warning" | "default"> = {
  completed: "success",
  "in-progress": "info",
  planned: "default",
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(query.matches);
    apply();
    query.addEventListener?.("change", apply);
    return () => query.removeEventListener?.("change", apply);
  }, []);
  return reduced;
}

function useOnScreen() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    if (typeof IntersectionObserver !== "function") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);
  return { ref, visible };
}

function easeOut(t: number) {
  return 1 - (1 - t) ** 3;
}

/**
 * One data record drives the readable number, the status label and the bar.
 * The number counts up once when the indicator enters the viewport. It does
 * not keep moving, and it never invents a value the record does not hold.
 */
export function ProjectProgress({ id }: { id: string }) {
  const entry = progressById(id);
  const { language } = usePortfolioLanguage();
  const reduced = useReducedMotion();
  const { ref, visible } = useOnScreen();
  const percent = entry?.percent ?? null;
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!entry || percent === null || !visible) return;
    if (reduced) {
      setShown(percent);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const duration = 800;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setShown(Math.round(percent * easeOut(t)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [entry, percent, reduced, visible]);

  if (!entry) return null;

  const chrome = progressChrome[language];
  const status = entry.status;
  const statusLabel = status ? progressStatusLabel[language][status] : null;
  const scope = entry.scope[language];
  const assessed = entry.updatedLabel ? `${chrome.assessed} ${entry.updatedLabel[language]}` : null;
  const valueText = percent === null ? chrome.notAssessed : `${percent}%`;
  const fill = percent !== null && visible ? percent : 0;

  return (
    <div
      ref={ref}
      className="project-progress space-y-2"
      data-progress-id={entry.id}
      data-reduced={reduced ? "true" : "false"}
      data-visible={visible ? "true" : "false"}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <p className="min-w-0 text-sm font-medium text-foreground">
          <span>{entry.name}</span>
          {percent !== null ? (
            <>
              <span aria-hidden="true"> — </span>
              <span className="num font-mono text-[28px] font-semibold leading-none" aria-hidden="true">
                {shown}%
              </span>
            </>
          ) : null}
        </p>
        {status && statusLabel ? <Badge variant={STATUS_VARIANT[status]}>{statusLabel}</Badge> : null}
      </div>
      {percent === null ? (
        <p className="num font-mono text-[28px] font-semibold leading-none text-foreground" aria-hidden="true">
          {chrome.notAssessed}
        </p>
      ) : null}
      <div
        className="project-progress-track"
        role="progressbar"
        aria-label={`${entry.name} ${chrome.completion}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent === null ? undefined : percent}
        aria-valuetext={valueText}
      >
        <span className="project-progress-fill" style={{ width: `${fill}%` }} />
      </div>
      <p className="text-small leading-relaxed text-muted-foreground">{scope}</p>
      {assessed ? <p className="text-machine">{assessed}</p> : null}
      <p className="sr-only">
        {entry.name}. {valueText}. {statusLabel ? `${statusLabel}. ` : ""}{scope}
        {assessed ? ` ${assessed}.` : ""}
      </p>
    </div>
  );
}
