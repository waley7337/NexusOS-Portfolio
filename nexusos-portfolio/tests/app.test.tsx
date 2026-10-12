import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useUiStore } from "@/stores/ui";
import App from "~/App";
import { DEGREE_PRIVACY_NOTICE } from "~/data/assets";

describe("App", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    window.history.replaceState(null, "", "/");
    useUiStore.setState({ spaceStage: "off", isAuthEntryActive: false });
  });

  it("opens on the star-entry door with the NexusOS space field", () => {
    render(<App />);
    expect(screen.getByTestId("star-entry")).toBeInTheDocument();
    expect(screen.getByTestId("space-field")).toHaveAttribute("data-space-stage", "idle");
  });

  it("deep links skip the intro and render every section", () => {
    window.history.replaceState(null, "", "/#cv");
    render(<App />);
    expect(screen.getByTestId("portfolio-shell")).toBeInTheDocument();
    for (const name of ["NexusOS", "Architecture", "Library", "CV", "Education", "Contact"]) {
      expect(screen.getByRole("region", { name })).toBeInTheDocument();
    }
    const degree = within(screen.getByTestId("degree-download"));
    expect(degree.getByTestId("privacy-notice")).toHaveTextContent(DEGREE_PRIVACY_NOTICE);
    const view = degree.getByRole("link", { name: "View PDF" });
    expect(view).toHaveAttribute("href", "/documents/education/licence-etudes-anglophones-strasbourg-2020.pdf");
    expect(view).toHaveAccessibleDescription(DEGREE_PRIVACY_NOTICE);
    expect(degree.getByRole("link", { name: "Download" })).toHaveAttribute("download");
    expect(screen.queryByText(/available on request/i)).not.toBeInTheDocument();
    expect(screen.getByTestId("project-status")).toHaveTextContent(
      "actively developed software platform with core modules implemented and further development ongoing.",
    );
    expect(screen.getByRole("link", { name: "+43 676 5119613" })).toHaveAttribute("href", "tel:+436765119613");
  });

  it("lists the verified other projects and no unverified names", () => {
    window.history.replaceState(null, "", "/#projects");
    render(<App />);
    const projects = screen.getByRole("region", { name: "Other projects" });
    expect(projects).toHaveTextContent("Ghost Protocol");
    expect(projects).toHaveTextContent("Pentest Report Generator (v1)");
    expect(projects).toHaveTextContent("In progress");
    expect(projects).toHaveTextContent("Prototype · local only");
    const ghost = within(projects).getByRole("link", { name: "Live web app" });
    expect(ghost).toHaveAttribute("href", "https://ghost-protocol-pi.vercel.app");
    const repos = within(projects).getAllByRole("link", { name: "GitHub" });
    expect(repos.map((a) => a.getAttribute("href"))).toEqual([
      "https://github.com/waley7337/Ghost-Protocol",
      "https://github.com/waley7337/pentest-report-tool",
    ]);
    expect(projects).not.toHaveTextContent(/PermissionGraph|Contract Sentinel|Client Portal/i);
    expect(projects.textContent).not.toMatch(/github\.com\/waley7337\/nexusos/i);
  });

  it("links the live app's sign-in page without implying demo credentials", () => {
    window.history.replaceState(null, "", "/#nexusos");
    const { container } = render(<App />);
    const live = [...container.querySelectorAll<HTMLAnchorElement>('a[href*="nexuops"]')];
    expect(live.length).toBeGreaterThanOrEqual(3);
    for (const a of live) expect(a.getAttribute("href")).toBe("https://nexuops.com/login");
    expect(screen.getByTestId("live-app-link")).toHaveTextContent("Live app · sign in");
    expect(screen.getByTestId("live-app-note")).toHaveTextContent("No demo account or credentials are provided.");
    expect(container.textContent).not.toMatch(/demo (login|password|user)|password:|test@|nexusos\.com/i);
  });
});
