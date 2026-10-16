import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LanguageSwitch } from "~/components/LanguageSwitch";
import { ProjectProgress } from "~/components/ProjectProgress";
import {
  PENTEST_COMPLETION_PERCENT,
  ghostProtocolAssessment,
  nexusosAssessment,
  progressById,
  weightedCompletion,
} from "~/data/projectStatus";
import { LanguageProvider } from "~/i18n/language";

function renderProgress(id: string) {
  return render(
    <LanguageProvider>
      <ProjectProgress id={id} />
    </LanguageProvider>,
  );
}

function mockMotion(reduced: boolean) {
  window.matchMedia = (query: string) =>
    ({
      matches: reduced && query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}

function mockObserver(intersecting: boolean) {
  class Observer {
    private readonly callback: IntersectionObserverCallback;
    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
    }
    observe() {
      this.callback([{ isIntersecting: intersecting } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
    }
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  vi.stubGlobal("IntersectionObserver", Observer);
}

describe("project progress", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    window.localStorage.clear();
  });

  it("recovers the weighted percentages and leaves pentest unscored", () => {
    expect(nexusosAssessment.measurements.map((item) => [item.weight, item.percent])).toEqual([
      [2, 88],
      [1, 70],
    ]);
    expect(ghostProtocolAssessment.measurements.map((item) => [item.weight, item.percent])).toEqual([
      [2, 85],
      [1, 65],
    ]);
    expect(weightedCompletion(nexusosAssessment.measurements)).toBe(82);
    expect(weightedCompletion(ghostProtocolAssessment.measurements)).toBe(78);
    expect(progressById("nexusos")?.percent).toBe(82);
    expect(progressById("ghost-protocol")?.percent).toBe(78);
    expect(PENTEST_COMPLETION_PERCENT).toBeNull();
    expect(progressById("pentest-report-generator")?.percent).toBeNull();
  });

  it("exposes the configured percentage on an accessible progressbar", () => {
    mockMotion(true);
    mockObserver(true);
    renderProgress("nexusos");
    const bar = screen.getByRole("progressbar", { name: "NexusOS completion" });
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
    expect(bar).toHaveAttribute("aria-valuenow", "82");
    expect(bar).toHaveAttribute("aria-valuetext", "82%");
    expect(bar.querySelector(".project-progress-fill")).toHaveStyle({ width: "82%" });
    expect(screen.getByText("82%")).toBeInTheDocument();
    expect(screen.getByText("NexusOS").closest("p")).toHaveTextContent("NexusOS — 82%");
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Assessed 16 October 2026")).toBeInTheDocument();
  });

  it("counts up to the configured value when motion is allowed", () => {
    mockMotion(false);
    mockObserver(true);
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      callback(performance.now() + 1000);
      return 1;
    });
    renderProgress("ghost-protocol");
    const bar = screen.getByRole("progressbar", { name: "Ghost Protocol completion" });
    expect(bar).toHaveAttribute("aria-valuenow", "78");
    expect(screen.getByText("78%")).toBeInTheDocument();
    expect(screen.getByText("Ghost Protocol").closest("p")).toHaveTextContent("Ghost Protocol — 78%");
    expect(bar.querySelector(".project-progress-fill")).toHaveStyle({ width: "78%" });
  });

  it("keeps the bar empty until the indicator is in view", () => {
    mockMotion(true);
    mockObserver(false);
    renderProgress("nexusos");
    const bar = screen.getByRole("progressbar", { name: "NexusOS completion" });
    expect(bar).toHaveAttribute("aria-valuenow", "82");
    expect(bar.querySelector(".project-progress-fill")).toHaveStyle({ width: "0%" });
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("does not invent a percentage for the pentest prototype", () => {
    mockMotion(true);
    mockObserver(true);
    renderProgress("pentest-report-generator");
    const bar = screen.getByRole("progressbar", { name: "Pentest Report Generator (v1) completion" });
    expect(bar).not.toHaveAttribute("aria-valuenow");
    expect(bar).toHaveAttribute("aria-valuetext", "Not assessed");
    expect(screen.getByText("Not assessed")).toBeInTheDocument();
    expect(bar.querySelector(".project-progress-fill")).toHaveStyle({ width: "0%" });
  });

  it("switches status copy with the language and keeps the percentage", () => {
    mockMotion(true);
    mockObserver(true);
    render(
      <LanguageProvider>
        <LanguageSwitch />
        <ProjectProgress id="nexusos" />
      </LanguageProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Deutsch" }));
    const bar = screen.getByRole("progressbar", { name: "NexusOS Fertigstellungsgrad" });
    expect(bar).toHaveAttribute("aria-valuenow", "82");
    expect(screen.getByText("In Entwicklung")).toBeInTheDocument();
    expect(screen.getByText("Bewertet am 16. Oktober 2026")).toBeInTheDocument();
    expect(screen.queryByText("In Progress")).not.toBeInTheDocument();
    expect(bar.querySelector(".project-progress-fill")).toHaveStyle({ width: "82%" });
  });
});
