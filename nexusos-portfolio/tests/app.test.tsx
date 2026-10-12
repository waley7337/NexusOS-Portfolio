import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useUiStore } from "@/stores/ui";
import App from "~/App";
import { DEGREE_PRIVACY_NOTICE } from "~/data/assets";
import { profile } from "~/data/profile";
import { otherProjects } from "~/data/projects";
import { SECTIONS } from "~/sections/registry";

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
    for (const name of ["NexusOS", "Architecture", "Library", "CV", "Education", "Other projects", "Live demos & access", "Contact"]) {
      expect(screen.getByRole("region", { name })).toBeInTheDocument();
    }
    for (const label of SECTIONS.map((section) => section.label)) {
      expect(screen.getAllByRole("link", { name: label }).length).toBeGreaterThanOrEqual(1);
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
    const ghostCard = projects.querySelector<HTMLElement>('[data-project="Ghost Protocol"]');
    expect(ghostCard).not.toBeNull();
    expect(within(ghostCard as HTMLElement).getByRole("link", { name: "Open Demo" })).toHaveAttribute(
      "href",
      "https://ghost-protocol-pi.vercel.app",
    );
    const pentest = projects.querySelector<HTMLElement>('[data-project="Pentest Report Generator (v1)"]');
    expect(pentest).not.toBeNull();
    expect(within(pentest as HTMLElement).queryByRole("link", { name: /demo/i })).not.toBeInTheDocument();
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
    expect(within(screen.getByRole("region", { name: "NexusOS" })).getByRole("link", { name: "Open Demo" })).toHaveAttribute(
      "href",
      "https://nexuops.com/login",
    );
    expect(container.textContent).not.toMatch(/demo (login|password|user)|password:|test@|nexusos\.com/i);
    expect(container.querySelectorAll('input[type="password"]')).toHaveLength(0);
    expect(screen.queryByRole("button", { name: /copy/i })).not.toBeInTheDocument();
  });

  it("opens a deep link on the requested section inside the shell", () => {
    window.history.replaceState(null, "", "/#demos");
    const spy = vi.spyOn(HTMLElement.prototype, "scrollIntoView").mockImplementation(() => {});
    render(<App />);
    const demos = document.getElementById("demos");
    expect(demos).not.toBeNull();
    expect(spy.mock.instances).toContain(demos);
    spy.mockRestore();
  });

  it("keeps demo access on verified URLs and publishes no credentials", () => {
    window.history.replaceState(null, "", "/#demos");
    const { container } = render(<App />);
    const demos = screen.getByRole("region", { name: "Live demos & access" });
    const ghost = otherProjects.find((project) => project.name === "Ghost Protocol");

    expect(profile.liveApp.url).toBe("https://nexuops.com/login");
    expect(profile.companyPortfolioId).toBe("el-nagdi-s-portfolio");
    expect(ghost?.demo?.href).toBe("https://ghost-protocol-pi.vercel.app");

    expect(within(demos).getByRole("link", { name: "Open NexusOS Demo" })).toHaveAttribute("href", profile.liveApp.url);
    expect(within(demos).getByRole("link", { name: "Open Ghost Protocol Demo" })).toHaveAttribute("href", ghost?.demo?.href);
    expect(within(demos).getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/waley7337/Ghost-Protocol",
    );

    const identifier = within(demos).getByTestId("company-portfolio-id");
    expect(identifier).toHaveTextContent("el-nagdi-s-portfolio");
    expect(identifier.closest("a")).toBeNull();
    expect(demos).toHaveTextContent("A public address for this identifier is still unconfirmed");
    expect(within(demos).getByTestId("nexusos-demo-note")).toHaveTextContent(
      "Opens the live sign-in page. Demo credentials are not published yet.",
    );
    expect(within(demos).getByTestId("nexusos-demo-note")).toHaveTextContent("No demo account or credentials are provided.");
    expect(within(demos).getByTestId("ghost-demo-note")).toHaveTextContent("Opens the deployed web client.");
    expect(demos).not.toHaveTextContent("Pentest Report Generator");

    for (const anchor of container.querySelectorAll<HTMLAnchorElement>("a")) {
      expect(anchor.getAttribute("href") ?? "").not.toMatch(/el-nagdi-s-portfolio/i);
    }
    const nexuops = [...container.querySelectorAll<HTMLAnchorElement>('a[href*="nexuops"]')];
    expect(nexuops.length).toBeGreaterThanOrEqual(3);
    for (const anchor of nexuops) expect(anchor.getAttribute("href")).toBe("https://nexuops.com/login");

    expect(container.textContent).not.toMatch(/demo (login|password|user)|password:|test@|nexusos\.com/i);
    expect(container.querySelectorAll("input, textarea")).toHaveLength(0);
    expect(screen.queryByRole("button", { name: /copy/i })).not.toBeInTheDocument();
    expect(container.textContent).not.toMatch(/username|e-mail|email address/i);
  });
});
