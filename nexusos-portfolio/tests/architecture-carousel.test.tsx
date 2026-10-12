import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { multiTenantFlow, securityArchitecture, systemArchitecture } from "~/data/assets";
import { nexusos } from "~/data/nexusos";
import { ArchitectureSection } from "~/sections/ArchitectureSection";

describe("architecture carousel", () => {
  it("exposes every diagram as a button and keeps the existing copy", () => {
    render(<ArchitectureSection />);
    const region = screen.getByRole("region", { name: "Architecture" });
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
    render(<ArchitectureSection />);
    const card = screen.getByRole("button", { name: "Inspect System Architecture" });
    fireEvent.click(card);
    const dialog = screen.getByRole("dialog", { name: "System Architecture" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    const full = within(dialog).getByRole("img", { name: "System Architecture" });
    expect(full.getAttribute("src")).toContain("system-architecture.png");
    expect(full.getAttribute("src")).not.toContain(".preview.");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(card).toHaveFocus();
  });

  it("moves to the neighbouring diagram from the zoomed view", () => {
    render(<ArchitectureSection />);
    fireEvent.click(screen.getByRole("button", { name: "Inspect Security Architecture" }));
    fireEvent.click(screen.getByRole("button", { name: "Next diagram" }));
    expect(screen.getByRole("dialog", { name: "Multi-Tenant Request Flow" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Previous diagram" }));
    expect(screen.getByRole("dialog", { name: "Security Architecture" })).toBeInTheDocument();
  });

  it("does not advance until commanded", () => {
    vi.useFakeTimers();
    try {
      render(<ArchitectureSection />);
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
      expect(screen.getByRole("region", { name: "Architecture" })).toHaveTextContent(nexusos.architecture.security);

      fireEvent.keyDown(screen.getByRole("button", { name: "Next architecture diagram" }), { key: "ArrowRight" });
      expect(screen.getByRole("button", { name: "Inspect Multi-Tenant Request Flow" })).toHaveAttribute("aria-current", "true");
      expect(screen.getByRole("heading", { name: "Multi-Tenant Request Flow" })).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "Previous architecture diagram" }));
      expect(security).toHaveAttribute("aria-current", "true");
    } finally {
      vi.useRealTimers();
    }
  });

  it("offers download and full resolution from the enlarged diagram", () => {
    render(<ArchitectureSection />);
    fireEvent.click(screen.getByRole("button", { name: "Inspect System Architecture" }));
    const dialog = screen.getByRole("dialog", { name: "System Architecture" });
    expect(within(dialog).getByText(systemArchitecture.meta)).toBeInTheDocument();
    expect(within(dialog).getByText(systemArchitecture.description)).toBeInTheDocument();
    expect(within(dialog).getByText(nexusos.architecture.system)).toBeInTheDocument();
    const full = within(dialog).getByRole("link", { name: "Open full resolution" });
    const download = within(dialog).getByRole("link", { name: "Download" });
    expect(full).toHaveAttribute("href", systemArchitecture.src);
    expect(download).toHaveAttribute("href", systemArchitecture.src);
    expect(download).toHaveAttribute("download", "system-architecture.png");

    fireEvent.click(within(dialog).getByRole("button", { name: "Next diagram" }));
    const security = screen.getByRole("dialog", { name: "Security Architecture" });
    expect(within(security).getByText(securityArchitecture.meta)).toBeInTheDocument();
    expect(within(security).getByRole("link", { name: "Download" })).toHaveAttribute("href", securityArchitecture.src);

    fireEvent.click(within(security).getByRole("button", { name: "Next diagram" }));
    const tenancy = screen.getByRole("dialog", { name: "Multi-Tenant Request Flow" });
    expect(within(tenancy).getByText(multiTenantFlow.meta)).toBeInTheDocument();
    expect(within(tenancy).getByText(nexusos.architecture.tenancy)).toBeInTheDocument();
    expect(within(tenancy).getByRole("link", { name: "Open full resolution" })).toHaveAttribute("href", multiTenantFlow.src);
  });

  it("does not publish demo passwords or secrets", () => {
    const { container } = render(<ArchitectureSection />);
    fireEvent.click(screen.getByRole("button", { name: "Inspect System Architecture" }));
    expect(container.textContent).not.toMatch(/demo (login|password|user)|password:|test@|nexusos\.com/i);
    expect(container.querySelectorAll('input[type="password"], textarea')).toHaveLength(0);
    expect(screen.queryByRole("button", { name: /copy/i })).not.toBeInTheDocument();
  });
});
