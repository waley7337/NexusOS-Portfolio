import { createEvent, fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { multiTenantFlow, securityArchitecture, systemArchitecture } from "~/data/assets";
import { LanguageProvider } from "~/i18n/language";
import { nexusos } from "~/data/nexusos";
import { ArchitectureSection } from "~/sections/ArchitectureSection";

function renderArchitecture() {
  window.localStorage.clear();
  return render(
    <LanguageProvider>
      <ArchitectureSection />
    </LanguageProvider>,
  );
}

describe("architecture carousel", () => {
  it("exposes every diagram as a button and keeps the existing copy", () => {
    renderArchitecture();
    const region = screen.getByRole("region", { name: "NexusOS Architecture" });
    expect(region).toHaveTextContent("Click to inspect at full size.");
    for (const title of ["System Architecture", "Security Architecture", "Multi-Tenant Request Flow"]) {
      expect(screen.getByRole("button", { name: `Inspect ${title}` })).toBeInTheDocument();
    }
    expect(region).toHaveTextContent(nexusos.architecture.system);
    expect(region).toHaveTextContent(nexusos.architecture.security);
    expect(region).toHaveTextContent(nexusos.architecture.tenancy);
    expect(region).toHaveTextContent("System Architecture");
    expect(region).toHaveTextContent("Security Architecture");
    expect(region).toHaveTextContent("Multi-Tenant Request Flow");
  });

  it("opens a zoomed diagram and returns focus on Escape", () => {
    renderArchitecture();
    const card = screen.getByRole("button", { name: "Inspect System Architecture" });
    fireEvent.click(card);
    const dialog = screen.getByRole("dialog", { name: "System Architecture" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    const preview = card.querySelector("img");
    expect(preview?.getAttribute("src")).toContain("system-architecture.preview.webp");
    const full = within(dialog).getByRole("img", { name: "System Architecture" });
    expect(full.getAttribute("src")).toBe(systemArchitecture.src);
    expect(full.getAttribute("src")).toContain("system-architecture.png");
    expect(full.getAttribute("src")).not.toContain(".preview.");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(card).toHaveFocus();
  });

  it("opens from the image, locks background scroll, and closes from the backdrop", () => {
    const main = document.createElement("main");
    main.id = "main";
    document.body.appendChild(main);
    renderArchitecture();
    const card = screen.getByRole("button", { name: "Inspect System Architecture" });
    const track = card.parentElement as HTMLElement;
    const capture = vi.fn();
    track.setPointerCapture = capture;
    track.hasPointerCapture = () => false;
    const img = card.querySelector("img");
    expect(img).not.toBeNull();
    fireEvent.pointerDown(img!, { button: 0, clientX: 12, clientY: 10, pointerId: 1 });
    expect(capture).not.toHaveBeenCalled();
    fireEvent.click(img!);
    expect(screen.getByRole("dialog", { name: "System Architecture" })).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
    expect(document.documentElement.style.overflow).toBe("hidden");
    expect(main.style.overflow).toBe("hidden");
    fireEvent.click(screen.getByTestId("architecture-lightbox-scrim"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
    expect(document.documentElement.style.overflow).toBe("");
    expect(main.style.overflow).toBe("");
    main.remove();
  });

  it("captures the pointer only after a drag starts", () => {
    renderArchitecture();
    const card = screen.getByRole("button", { name: "Inspect Security Architecture" });
    const track = card.parentElement as HTMLElement;
    const capture = vi.fn();
    track.setPointerCapture = capture;
    track.hasPointerCapture = () => false;
    fireEvent.pointerDown(track, { button: 0, clientX: 12, clientY: 10, pointerId: 3, bubbles: true });
    fireEvent.pointerMove(track, { button: 0, clientX: 36, clientY: 10, pointerId: 3, bubbles: true });
    expect(capture).toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("moves to the neighbouring diagram from the zoomed view", () => {
    renderArchitecture();
    fireEvent.click(screen.getByRole("button", { name: "Inspect Security Architecture" }));
    fireEvent.click(screen.getByRole("button", { name: "Next diagram" }));
    expect(screen.getByRole("dialog", { name: "Multi-Tenant Request Flow" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Previous diagram" }));
    expect(screen.getByRole("dialog", { name: "Security Architecture" })).toBeInTheDocument();
  });

  it("does not advance until commanded", () => {
    vi.useFakeTimers();
    try {
      renderArchitecture();
      const system = screen.getByRole("button", { name: "Inspect System Architecture" });
      expect(system).toHaveAttribute("aria-current", "true");
      expect(screen.getByRole("heading", { name: "System Architecture" })).toBeInTheDocument();
      vi.advanceTimersByTime(20000);
      expect(system).toHaveAttribute("aria-current", "true");
      expect(screen.getByRole("heading", { name: "System Architecture" })).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "Next architecture diagram" }));
      const security = screen.getByRole("button", { name: "Inspect Security Architecture" });
      expect(security).toHaveAttribute("aria-current", "true");
      expect(screen.getByRole("heading", { name: "Security Architecture" })).toHaveTextContent("Security Architecture");
      expect(screen.getByRole("region", { name: "NexusOS Architecture" })).toHaveTextContent(nexusos.architecture.security);

      fireEvent.keyDown(screen.getByRole("button", { name: "Next architecture diagram" }), { key: "ArrowRight" });
      expect(screen.getByRole("button", { name: "Inspect Multi-Tenant Request Flow" })).toHaveAttribute("aria-current", "true");
      expect(screen.getByRole("heading", { name: "Multi-Tenant Request Flow" })).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "Previous architecture diagram" }));
      expect(security).toHaveAttribute("aria-current", "true");
    } finally {
      vi.useRealTimers();
    }
  });

  it("opens the original image for viewing and does not offer a download", () => {
    renderArchitecture();
    const card = screen.getByRole("button", { name: "Inspect System Architecture" });
    expect(card).toHaveAttribute("data-preview-guard", "true");
    const menu = createEvent.contextMenu(card);
    fireEvent(card, menu);
    expect(menu.defaultPrevented).toBe(true);
    const drag = createEvent.dragStart(card);
    fireEvent(card, drag);
    expect(drag.defaultPrevented).toBe(true);

    fireEvent.click(card);
    const dialog = screen.getByRole("dialog", { name: "System Architecture" });
    expect(within(dialog).getByText(systemArchitecture.meta)).toBeInTheDocument();
    expect(within(dialog).getByText(systemArchitecture.description)).toBeInTheDocument();
    expect(within(dialog).getByText(nexusos.architecture.system)).toBeInTheDocument();
    const full = within(dialog).getByRole("link", { name: "Open in Full Resolution" });
    expect(full).toHaveAttribute("href", systemArchitecture.src);
    expect(full).toHaveAttribute("target", "_blank");
    expect(full).toHaveAttribute("rel", "noreferrer");
    expect(full.getAttribute("href")).toMatch(/\.png$/);
    expect(within(dialog).queryByRole("link", { name: "Download" })).not.toBeInTheDocument();
    expect(within(dialog).getByRole("img", { name: "System Architecture" }).closest("[data-preview-guard]")).not.toBeNull();

    fireEvent.click(within(dialog).getByRole("button", { name: "Next diagram" }));
    const security = screen.getByRole("dialog", { name: "Security Architecture" });
    expect(within(security).getByText(securityArchitecture.meta)).toBeInTheDocument();
    expect(within(security).queryByRole("link", { name: "Download" })).not.toBeInTheDocument();
    expect(within(security).getByRole("link", { name: "Open in Full Resolution" })).toHaveAttribute("href", securityArchitecture.src);

    fireEvent.click(within(security).getByRole("button", { name: "Next diagram" }));
    const tenancy = screen.getByRole("dialog", { name: "Multi-Tenant Request Flow" });
    expect(within(tenancy).getByText(multiTenantFlow.meta)).toBeInTheDocument();
    expect(within(tenancy).getByText(nexusos.architecture.tenancy)).toBeInTheDocument();
    expect(within(tenancy).getByRole("link", { name: "Open in Full Resolution" })).toHaveAttribute("href", multiTenantFlow.src);
    expect(within(tenancy).queryByRole("link", { name: "Download" })).not.toBeInTheDocument();
  });

  it("does not publish demo passwords or secrets", () => {
    const { container } = renderArchitecture();
    fireEvent.click(screen.getByRole("button", { name: "Inspect System Architecture" }));
    expect(container.textContent).not.toMatch(/demo (login|password|user)|password:|test@|nexusos\.com/i);
    expect(container.textContent).not.toContain("COMPANYcomp170106@");
    expect(container.textContent).not.toContain("COMPcomp170106@");
    expect(systemArchitecture.src).not.toContain("ghost-protocol");
    expect(securityArchitecture.src).not.toContain("ghost-protocol");
    expect(multiTenantFlow.src).not.toContain("ghost-protocol");
    expect(container.textContent).not.toMatch(/sk-|api[_-]?key|ghp_|AKIA/i);
    expect(container.querySelectorAll('input[type="password"], textarea')).toHaveLength(0);
    expect(screen.queryByRole("button", { name: /copy/i })).not.toBeInTheDocument();
  });
});
