import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CursorTail } from "~/components/CursorTail";
import { PortfolioShell } from "~/components/PortfolioShell";

type Query = { matches: boolean; add: ReturnType<typeof vi.fn>; remove: ReturnType<typeof vi.fn> };

function installMedia(fine: boolean, reduced: boolean) {
  const queries = new Map<string, Query>();
  vi.spyOn(window, "matchMedia").mockImplementation((query: string) => {
    const matches = query.includes("prefers-reduced-motion") ? reduced : query.includes("hover") ? fine : false;
    const entry: Query = { matches, add: vi.fn(), remove: vi.fn() };
    queries.set(query, entry);
    return {
      matches,
      media: query,
      onchange: null,
      addEventListener: entry.add,
      removeEventListener: entry.remove,
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    } as MediaQueryList;
  });
  return queries;
}

function installCanvas() {
  const strokes: string[] = [];
  const fills: string[] = [];
  const ctx = {
    setTransform: vi.fn(),
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    lineCap: "",
    lineJoin: "",
    lineWidth: 1,
    shadowBlur: 0,
    shadowColor: "",
    fillStyle: "",
    strokeStyle: "",
  };
  Object.defineProperty(ctx, "strokeStyle", {
    set(value: string) {
      strokes.push(value);
    },
    get() {
      return strokes[strokes.length - 1] ?? "";
    },
  });
  Object.defineProperty(ctx, "fillStyle", {
    set(value: string) {
      fills.push(value);
    },
    get() {
      return fills[fills.length - 1] ?? "";
    },
  });
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(ctx as unknown as CanvasRenderingContext2D);
  return { ctx, strokes, fills };
}

let frames: FrameRequestCallback[] = [];
let raf: ReturnType<typeof vi.fn>;
let caf: ReturnType<typeof vi.fn>;

beforeEach(() => {
  frames = [];
  raf = vi.fn((cb: FrameRequestCallback) => {
    frames.push(cb);
    return frames.length;
  });
  caf = vi.fn();
  vi.stubGlobal("requestAnimationFrame", raf);
  vi.stubGlobal("cancelAnimationFrame", caf);
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function move(x: number, y: number) {
  const event = new MouseEvent("pointermove", { clientX: x, clientY: y, bubbles: true });
  Object.defineProperty(event, "pointerType", { value: "mouse" });
  window.dispatchEvent(event);
}

describe("cursor tail", () => {
  it("stays off without a fine pointer and under reduced motion", () => {
    const add = vi.spyOn(window, "addEventListener");
    installMedia(false, false);
    render(<CursorTail />);
    expect(add).not.toHaveBeenCalledWith("pointermove", expect.any(Function));
    expect(raf).not.toHaveBeenCalled();

    add.mockClear();
    installMedia(true, true);
    render(<CursorTail />);
    expect(add).not.toHaveBeenCalledWith("pointermove", expect.any(Function));
    expect(raf).not.toHaveBeenCalled();
  });

  it("draws a short white trail, fades it, and pauses while hidden", () => {
    installMedia(true, false);
    const { strokes, fills } = installCanvas();
    render(<CursorTail />);
    const canvas = screen.getByTestId("cursor-tail");
    expect(canvas).toHaveStyle({ pointerEvents: "none", position: "fixed" });

    const start = performance.now();
    move(20, 30);
    move(48, 36);
    expect(raf).toHaveBeenCalledTimes(1);

    frames[0](start + 16);
    const painted = [...strokes, ...fills].filter((color) => color.startsWith("rgba(255, 255, 255"));
    expect(painted.length).toBeGreaterThan(0);
    for (const color of painted) {
      const alpha = Number(color.slice(color.lastIndexOf(",") + 1, -1));
      expect(alpha).toBeGreaterThan(0);
      expect(alpha).toBeLessThanOrEqual(0.5);
    }

    const drawn = strokes.length + fills.length;
    frames[0](start + 520);
    expect(strokes.length + fills.length).toBe(drawn);

    move(70, 40);
    const scheduled = raf.mock.calls.length;
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    document.dispatchEvent(new Event("visibilitychange"));
    expect(caf).toHaveBeenCalled();
    move(90, 44);
    expect(raf).toHaveBeenCalledTimes(scheduled);
  });

  it("removes listeners on unmount", () => {
    installMedia(true, false);
    installCanvas();
    const removeWindow = vi.spyOn(window, "removeEventListener");
    const removeDocument = vi.spyOn(document, "removeEventListener");
    const { unmount } = render(<CursorTail />);
    unmount();
    expect(removeWindow).toHaveBeenCalledWith("pointermove", expect.any(Function));
    expect(removeWindow).toHaveBeenCalledWith("resize", expect.any(Function));
    expect(removeDocument).toHaveBeenCalledWith("visibilitychange", expect.any(Function));
  });

  it("mounts once in the portfolio shell", () => {
    installMedia(false, false);
    render(
      <PortfolioShell onReplayIntro={() => {}}>
        <p>section</p>
      </PortfolioShell>,
    );
    expect(screen.getAllByTestId("cursor-tail")).toHaveLength(1);
  });
});
