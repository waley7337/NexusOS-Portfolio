import { readFileSync } from "node:fs";
import path from "node:path";
import { cleanup, createEvent, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useUiStore } from "@/stores/ui";
import App from "~/App";
import { cv, DEGREE_PRIVACY_NOTICE } from "~/data/assets";
import {
  DEMO_ACCESS_NOTE,
  companyPortfolioLink,
  ghostDemoAccount,
  nexusDemoAccount,
  nexusGithub,
  nexusLiveApplication,
} from "~/data/demoAccess";
import { nexusos } from "~/data/nexusos";
import { profile } from "~/data/profile";
import { otherProjects } from "~/data/projects";
import { transparencyDetail, transparencyOpening, transparencyTitle, verificationWorkflow } from "~/data/transparency";
import { SECTIONS } from "~/sections/registry";

describe("App", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    window.localStorage.clear();
    document.documentElement.lang = "en";
    window.history.replaceState(null, "", "/");
    useUiStore.setState({ spaceStage: "off", isAuthEntryActive: false });
  });

  it("disables text selection on the page and leaves text fields selectable", () => {
    const css = readFileSync(path.join(process.cwd(), "src/styles/portfolio.css"), "utf8");
    expect(css).toMatch(/html\s*\{[^}]*-webkit-user-select:\s*none;/);
    expect(css).toMatch(/html\s*\{[^}]*user-select:\s*none;/);
    expect(css).toMatch(
      /html :is\(input, textarea, select, \[contenteditable="true"\]\)\s*\{[^}]*-webkit-user-select:\s*text;[^}]*user-select:\s*text;/s,
    );
  });

  it("opens on the star-entry door with the NexusOS space field", () => {
    render(<App />);
    const door = screen.getByTestId("star-entry");
    expect(door).toBeInTheDocument();
    expect(screen.getByTestId("space-field")).toHaveAttribute("data-space-stage", "idle");
    const menu = createEvent.contextMenu(door);
    fireEvent(door, menu);
    expect(menu.defaultPrevented).toBe(true);
    expect(screen.getByRole("button", { name: /enter portfolio/i })).toBeEnabled();
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
    expect(degree.queryByRole("link", { name: "Download" })).not.toBeInTheDocument();
    const downloads = screen.getAllByRole("link", { name: "Download" });
    expect(downloads).toHaveLength(1);
    expect(downloads[0]).toHaveAttribute("href", cv.src);
    expect(downloads[0]).toHaveAttribute("download", "waley-el-nagdi-cv-de.pdf");
    const cvPreview = screen.getByTestId("preview-cv-de");
    expect(cvPreview).toHaveAttribute("data-preview-guard", "true");
    const menu = createEvent.contextMenu(cvPreview);
    fireEvent(cvPreview, menu);
    expect(menu.defaultPrevented).toBe(true);
    const bio = screen.getByText(/self-taught developer/i);
    expect(bio.closest("[data-preview-guard]")).toBeNull();
    const bioMenu = createEvent.contextMenu(bio);
    fireEvent(bio, bioMenu);
    expect(bioMenu.defaultPrevented).toBe(true);
    const interfaceShot = screen.getByRole("img", { name: "Mission Control — dark" });
    expect(interfaceShot.closest("[data-preview-guard]")).toBeNull();
    const shotMenu = createEvent.contextMenu(interfaceShot);
    fireEvent(interfaceShot, shotMenu);
    expect(shotMenu.defaultPrevented).toBe(true);
    expect(screen.queryByText(/available on request/i)).not.toBeInTheDocument();
    expect(screen.getByTestId("project-status")).toHaveTextContent(
      "actively developed software platform with core modules implemented and further development ongoing.",
    );
    expect(screen.getByRole("link", { name: "+43 676 5119613" })).toHaveAttribute("href", "tel:+436765119613");
  });

  it("shows the CV as an image shot and links Ghost Protocol from contact", () => {
    window.history.replaceState(null, "", "/#cv");
    render(<App />);
    const cvRegion = screen.getByRole("region", { name: "CV" });
    expect(cvRegion.querySelector("object, embed, iframe")).toBeNull();
    const shot = within(cvRegion).getByRole("button", { name: `Inspect ${cv.title}` });
    expect(shot).toHaveAttribute("data-preview-guard", "true");
    const preview = shot.querySelector("img");
    expect(preview).not.toBeNull();
    expect(preview).toHaveAttribute("src", cv.preview);
    expect(preview?.getAttribute("src")).toMatch(/\.webp$/);
    const css = readFileSync(path.join(process.cwd(), "src/styles/portfolio.css"), "utf8");
    expect(css).toMatch(/\.doc-shot \{[^}]*max-width:\s*17rem;/);
    expect(within(cvRegion).getByRole("link", { name: "View PDF" })).toHaveAttribute("href", cv.src);
    expect(within(cvRegion).getByRole("link", { name: "Download" })).toHaveAttribute("download", "waley-el-nagdi-cv-de.pdf");
    expect(screen.getAllByRole("link", { name: "Download" })).toHaveLength(1);

    fireEvent.click(shot);
    const dialog = screen.getByRole("dialog", { name: cv.title });
    expect(dialog.querySelector("object, embed, iframe")).toBeNull();
    expect(within(dialog).getByRole("img", { name: cv.title })).toHaveAttribute("src", cv.preview);
    expect(within(dialog).getByRole("link", { name: "View PDF" })).toHaveAttribute("href", cv.src);
    expect(within(dialog).getByRole("link", { name: "Download" })).toHaveAttribute("href", cv.src);
    fireEvent.click(screen.getByTestId("cv-lightbox-scrim"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(shot).toHaveFocus();

    const contact = screen.getByRole("region", { name: "Contact" });
    const ghost = within(contact).getByRole("link", { name: "Ghost Protocol" });
    expect(ghost).toHaveAttribute("href", "https://ghost-protocol-pi.vercel.app");
    expect(ghost).toHaveAttribute("target", "_blank");
    expect(within(contact).getByRole("link", { name: profile.email })).toHaveAttribute("href", `mailto:${profile.email}`);
    expect(within(contact).getByRole("link", { name: "+43 676 5119613" })).toHaveAttribute("href", "tel:+436765119613");
    expect(within(contact).getByRole("link", { name: "github.com/waley7337" })).toHaveAttribute("href", profile.github);
    expect(within(contact).getByRole("link", { name: "nexuops.com/login" })).toHaveAttribute("href", "https://nexuops.com/login");
    expect(within(screen.getByRole("region", { name: "Architecture" })).queryByRole("link", { name: "Download" })).not.toBeInTheDocument();
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

  it("keeps NexusOS sign-in links on /login while the demo section publishes the supplied accounts", () => {
    window.history.replaceState(null, "", "/#nexusos");
    const { container } = render(<App />);
    const nexus = screen.getByRole("region", { name: "NexusOS" });
    const nexusLinks = [...nexus.querySelectorAll<HTMLAnchorElement>('a[href*="nexuops"]')];
    expect(nexusLinks.length).toBeGreaterThanOrEqual(3);
    for (const a of nexusLinks) expect(a.getAttribute("href")).toBe("https://nexuops.com/login");
    expect(screen.getByTestId("live-app-link")).toHaveTextContent("Live app · sign in");
    expect(screen.getByTestId("live-app-note")).toHaveTextContent("Opens the sign-in page of the live NexusOS app.");
    expect(screen.getByTestId("live-app-note")).not.toHaveTextContent("No demo account");
    expect(within(nexus).getByRole("link", { name: "Open Demo" })).toHaveAttribute("href", "https://nexuops.com/login");
    expect(container.querySelectorAll('input[type="password"]')).toHaveLength(0);
    expect(container.textContent).not.toMatch(/nexusos\.com|sk-|api[_-]?key|ghp_|AKIA/i);
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

  it("shows the supplied demo credentials on the matching cards", async () => {
    window.history.replaceState(null, "", "/#demos");
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    const { container } = render(<App />);
    const demos = screen.getByRole("region", { name: "Live demos & access" });
    const ghost = otherProjects.find((project) => project.name === "Ghost Protocol");
    const nexusCard = demos.querySelector<HTMLElement>('[data-demo="NexusOS"]');
    const ghostCard = demos.querySelector<HTMLElement>('[data-demo="Ghost Protocol"]');
    expect(nexusCard).not.toBeNull();
    expect(ghostCard).not.toBeNull();

    expect(profile.liveApp.url).toBe("https://nexuops.com/login");
    expect(profile.companyPortfolioId).toBe("el-nagdi-s-portfolio");
    expect(nexusLiveApplication).toBe("https://nexuops.com");
    expect(companyPortfolioLink).toBe("https://nexus-os-portfolio-delta.vercel.app/#nexusos");
    expect(nexusDemoAccount).toEqual({ email: "waleyelnagdi7@gmail.com", password: "COMPANYcomp170106@" });
    expect(ghostDemoAccount).toEqual({ email: "nagdi9697@gmail.com", password: "COMPcomp170106@" });
    expect(ghost?.demo?.href).toBe("https://ghost-protocol-pi.vercel.app");
    expect(DEMO_ACCESS_NOTE).toBe(
      "Demo access credentials are provided above for both NexusOS and Ghost Protocol. Open the corresponding live demo and use the listed email and password to sign in.",
    );

    expect(within(nexusCard as HTMLElement).getByRole("heading", { name: "NexusOS — Company Demo Access" })).toBeInTheDocument();
    expect(nexusCard).toHaveTextContent(nexusos.subtitle);
    expect(within(nexusCard as HTMLElement).getByTestId("company-portfolio-id")).toHaveTextContent("el-nagdi-s-portfolio");
    expect(within(nexusCard as HTMLElement).getByTestId("company-portfolio-id").closest("a")).toBeNull();
    expect(within(nexusCard as HTMLElement).getByTestId("company-portfolio-link")).toHaveAttribute("href", companyPortfolioLink);
    expect(within(nexusCard as HTMLElement).getByTestId("nexusos-live-application")).toHaveAttribute("href", "https://nexuops.com");
    expect(within(nexusCard as HTMLElement).getByTestId("nexusos-open-live")).toHaveAttribute("href", "https://nexuops.com");
    expect(within(nexusCard as HTMLElement).getByTestId("nexusos-open-live")).toHaveAttribute("target", "_blank");
    expect(nexusGithub).toBe("https://github.com/waley7337/NexusOS-Portfolio");
    expect(within(nexusCard as HTMLElement).getByRole("link", { name: "GitHub" })).toHaveAttribute("href", nexusGithub);
    expect(within(nexusCard as HTMLElement).getByRole("link", { name: "GitHub" })).toHaveAttribute("target", "_blank");
    expect(within(nexusCard as HTMLElement).getByTestId("nexusos-demo-email")).toHaveTextContent("waleyelnagdi7@gmail.com");
    expect(within(nexusCard as HTMLElement).getByTestId("nexusos-demo-password")).toHaveTextContent("COMPANYcomp170106@");
    expect(nexusCard).not.toHaveTextContent("nagdi9697@gmail.com");
    expect(nexusCard).not.toHaveTextContent("COMPcomp170106@");
    expect(nexusCard).not.toHaveTextContent("/login");

    expect(within(ghostCard as HTMLElement).getByRole("heading", { name: "Ghost Protocol — Company Demo Access" })).toBeInTheDocument();
    expect(ghostCard).toHaveTextContent(ghost!.summary);
    expect(within(ghostCard as HTMLElement).getByTestId("ghost-live-application")).toHaveAttribute(
      "href",
      "https://ghost-protocol-pi.vercel.app",
    );
    expect(within(ghostCard as HTMLElement).getByRole("link", { name: "Open Ghost Protocol Demo" })).toHaveAttribute(
      "href",
      "https://ghost-protocol-pi.vercel.app",
    );
    expect(within(ghostCard as HTMLElement).getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/waley7337/Ghost-Protocol",
    );
    expect(within(ghostCard as HTMLElement).getByTestId("ghost-demo-email")).toHaveTextContent("nagdi9697@gmail.com");
    expect(within(ghostCard as HTMLElement).getByTestId("ghost-demo-password")).toHaveTextContent("COMPcomp170106@");
    expect(ghostCard).not.toHaveTextContent("waleyelnagdi7@gmail.com");
    expect(ghostCard).not.toHaveTextContent("COMPANYcomp170106@");
    expect(ghostCard).not.toHaveTextContent("nexuops.com");
    expect(demos).not.toHaveTextContent("Pentest Report Generator");

    expect(screen.getAllByTestId("demo-access-footer")).toHaveLength(1);
    expect(screen.getByTestId("demo-access-footer")).toHaveTextContent(DEMO_ACCESS_NOTE);
    expect(container.textContent).not.toMatch(/not published|provided separately|must be requested|No demo account/i);
    expect(container.textContent).not.toMatch(/nexusos\.com|sk-|api[_-]?key|ghp_|AKIA/i);
    expect(container.querySelectorAll('input[type="password"], textarea')).toHaveLength(0);

    for (const anchor of container.querySelectorAll<HTMLAnchorElement>("a")) {
      expect(anchor.getAttribute("href") ?? "").not.toMatch(/el-nagdi-s-portfolio/i);
    }
    const loginLinks = [...container.querySelectorAll<HTMLAnchorElement>('a[href="https://nexuops.com/login"]')];
    const liveLinks = [...container.querySelectorAll<HTMLAnchorElement>('a[href="https://nexuops.com"]')];
    expect(loginLinks.length).toBeGreaterThanOrEqual(3);
    expect(liveLinks.map((anchor) => anchor.getAttribute("data-testid"))).toEqual([
      "nexusos-live-application",
      "nexusos-open-live",
    ]);

    const nexusEmail = within(nexusCard as HTMLElement).getByRole("button", { name: "Copy Email for NexusOS" });
    const nexusPassword = within(nexusCard as HTMLElement).getByRole("button", { name: "Copy Password for NexusOS" });
    const ghostEmail = within(ghostCard as HTMLElement).getByRole("button", { name: "Copy Email for Ghost Protocol" });
    const ghostPassword = within(ghostCard as HTMLElement).getByRole("button", { name: "Copy Password for Ghost Protocol" });
    for (const button of [nexusEmail, nexusPassword, ghostEmail, ghostPassword]) {
      expect(button.tagName).toBe("BUTTON");
      expect(button).not.toBeDisabled();
    }

    nexusEmail.focus();
    expect(nexusEmail).toHaveFocus();
    nexusEmail.click();
    await waitFor(() => expect(within(nexusCard as HTMLElement).getByTestId("nexusos-copy-email-status")).toHaveTextContent("Copied"));
    expect(writeText).toHaveBeenCalledWith("waleyelnagdi7@gmail.com");

    ghostPassword.click();
    await waitFor(() => expect(within(ghostCard as HTMLElement).getByTestId("ghost-copy-password-status")).toHaveTextContent("Copied"));
    expect(writeText).toHaveBeenLastCalledWith("COMPcomp170106@");

    writeText.mockRejectedValueOnce(new Error("denied"));
    const exec = vi.fn().mockReturnValue(false);
    document.execCommand = exec;
    nexusPassword.click();
    await waitFor(() =>
      expect(within(nexusCard as HTMLElement).getByTestId("nexusos-copy-password-status")).toHaveTextContent("Copy failed"),
    );
    expect(exec).toHaveBeenCalled();
  });

  it("keeps nav tabs in the same order as the page sections", () => {
    window.history.replaceState(null, "", "/#overview");
    render(<App />);
    const ids = [...document.querySelectorAll("main section")].map((section) => section.id);
    expect(ids).toEqual(SECTIONS.map((section) => section.id));
    const hrefs = (nav: Element) => [...nav.querySelectorAll("a")].map((link) => link.getAttribute("href"));
    const expected = SECTIONS.map((section) => `#${section.id}`);
    expect(hrefs(document.querySelector("aside nav") as Element)).toEqual(expected);
    expect(hrefs(document.querySelector("nav.portfolio-nav-scroll") as Element)).toEqual(expected);
    expect(ids[0]).toBe("overview");
    expect(ids.at(-1)).toBe("contact");
    expect(ids.indexOf("cv")).toBeLessThan(ids.indexOf("nexusos"));
    expect(ids.indexOf("education")).toBeLessThan(ids.indexOf("nexusos"));
    expect(ids.indexOf("projects")).toBeLessThan(ids.indexOf("demos"));
    expect(ids.indexOf("demos")).toBeLessThan(ids.indexOf("contact"));
    expect(ids.indexOf("overview")).toBeLessThan(ids.indexOf("transparency"));
    expect(ids.indexOf("transparency")).toBeLessThan(ids.indexOf("cv"));
    expect(ids.indexOf("nexusos")).toBeLessThan(ids.indexOf("workflow"));
    expect(ids.indexOf("workflow")).toBeLessThan(ids.indexOf("architecture"));
  });

  it("places the supplied transparency note before the overview cards and keeps the English detail unpublished", () => {
    window.history.replaceState(null, "", "/#overview");
    render(<App />);
    const overview = screen.getByRole("region", { name: "Overview" });
    const note = within(overview).getByText(transparencyOpening.en.body, { exact: false });
    const label = within(overview).getByText(transparencyOpening.en.label);
    expect(label).toHaveClass("text-foreground");
    expect(note.textContent).not.toMatch(/[[\]]/);
    const figures = within(overview).getByText("NexusOS figures, from the project documentation");
    expect(note.compareDocumentPosition(figures) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(overview).not.toHaveTextContent(transparencyOpening.de.body);

    const tab = screen.getByRole("region", { name: transparencyTitle.en });
    expect(within(tab).getByRole("heading", { level: 3, name: verificationWorkflow.title })).toBeInTheDocument();
    for (const paragraph of verificationWorkflow.paragraphs) {
      expect(tab).toHaveTextContent(paragraph);
    }
    expect(tab).not.toHaveTextContent(transparencyDetail.de[0].paragraphs[0]);
    expect(document.documentElement).toHaveAttribute("lang", "en");
  });

  it("switches the opening note and the transparency tab to the supplied German text", () => {
    window.history.replaceState(null, "", "/#overview");
    render(<App />);
    fireEvent.click(screen.getAllByRole("button", { name: "Deutsch" })[0]);

    const overviewDe = screen.getByRole("region", { name: "Overview" });
    expect(overviewDe).toHaveTextContent(transparencyOpening.de.label);
    expect(overviewDe).toHaveTextContent(transparencyOpening.de.body);
    expect(within(overviewDe).getByText(transparencyOpening.de.label)).toHaveClass("text-foreground");
    expect(overviewDe).not.toHaveTextContent(transparencyOpening.en.body);
    const tab = screen.getByRole("region", { name: transparencyTitle.de });
    expect(tab).not.toHaveTextContent(verificationWorkflow.paragraphs[0]);
    for (const part of transparencyDetail.de) {
      expect(within(tab).getByRole("heading", { level: 3, name: part.heading })).toBeInTheDocument();
      for (const paragraph of part.paragraphs) {
        expect(tab).toHaveTextContent(paragraph);
      }
    }
    expect(screen.getAllByRole("link", { name: transparencyTitle.de }).length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByRole("link", { name: transparencyTitle.en })).not.toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute("lang", "de");
    expect(window.localStorage.getItem("nexusos-portfolio:language")).toBe("de");

    cleanup();
    window.history.replaceState(null, "", "/#transparency");
    render(<App />);
    expect(screen.getByRole("region", { name: transparencyTitle.de })).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute("lang", "de");
  });

  it("shows the NexusOS workflow without a floating motion", () => {
    window.history.replaceState(null, "", "/#overview");
    render(<App />);
    const workflow = screen.getByRole("region", { name: "NexusOS workflow" });
    expect(workflow).toHaveTextContent(
      "NexusOS is developed using an iterative, modular full-stack development workflow designed to maintain clear separation of concerns, scalability, and maintainability.",
    );
    expect(within(workflow).getByText("Architecture & Codebase Structure")).toBeInTheDocument();
    expect(within(workflow).getByText("Deployment & Production")).toBeInTheDocument();
    expect(workflow).toHaveTextContent("Architecture → Implementation → Integration → Testing → Refinement → Deployment");
    expect(workflow).toHaveTextContent("React · TypeScript · FastAPI · PostgreSQL · Redis · Git · GitHub · Vercel · Railway · Cloudflare");
    fireEvent.click(screen.getAllByRole("link", { name: "NexusOS workflow" })[0]);
    expect(workflow.dataset.spatial).toBeUndefined();
    expect(window.location.hash).toBe("#workflow");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    const css = readFileSync(path.join(process.cwd(), "src/styles/portfolio.css"), "utf8");
    expect(css).not.toMatch(/@keyframes (?:spatial-float|workflow-step-float|contact-window)/);
  });

  it("opens contact in the page instead of a floating window", () => {
    window.history.replaceState(null, "", "/#overview");
    render(<App />);
    fireEvent.click(screen.getAllByRole("link", { name: "Contact" })[0]);
    expect(window.location.hash).toBe("#contact");
    expect(document.getElementById("contact")?.dataset.contactPose).toBeUndefined();
    expect(document.getElementById("contact")?.dataset.spatial).toBeUndefined();
    expect(screen.queryByRole("dialog", { name: "Contact" })).not.toBeInTheDocument();
    const contact = screen.getByRole("region", { name: "Contact" });
    expect(within(contact).getByRole("link", { name: "Ghost Protocol" })).toHaveAttribute(
      "href",
      "https://ghost-protocol-pi.vercel.app",
    );
  });
});
