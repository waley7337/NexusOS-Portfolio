import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
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

  it("does not publish demo passwords or secrets", () => {
    const { container } = render(<ArchitectureSection />);
    fireEvent.click(screen.getByRole("button", { name: "Inspect System Architecture" }));
    expect(container.textContent).not.toMatch(/demo (login|password|user)|password:|test@|nexusos\.com/i);
    expect(container.querySelectorAll('input[type="password"], textarea')).toHaveLength(0);
    expect(screen.queryByRole("button", { name: /copy/i })).not.toBeInTheDocument();
  });
});
