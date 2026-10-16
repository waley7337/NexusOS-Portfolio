import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import App from "~/App";
import { LanguageSwitch } from "~/components/LanguageSwitch";
import { ProjectProgress } from "~/components/ProjectProgress";
import { translationCatalog, pick, type PortfolioLanguage } from "~/i18n/l10n";
import { LanguageProvider } from "~/i18n/language";
import { SECTIONS } from "~/sections/registry";
import { transparencyDetail, transparencyOpening } from "~/data/transparency";
import "~/data/assets";
import "~/data/ghostProtocol";
import "~/data/nexusos";
import "~/data/profile";
import "~/data/projects";
import "~/data/workflow";
import "~/i18n/ui";

describe("portfolio languages", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    window.localStorage.clear();
    document.documentElement.lang = "en";
    window.history.replaceState(null, "", "/#education");
  });

  it("stores a complete catalog with no empty language", () => {
    expect(translationCatalog().length).toBeGreaterThan(80);
    for (const entry of translationCatalog()) {
      for (const language of ["en", "de", "fr"] as const) {
        expect(entry[language].trim().length, language).toBeGreaterThan(0);
      }
    }
    for (const section of SECTIONS) {
      for (const language of ["en", "de", "fr"] as const) {
        expect(section.labels[language].trim().length).toBeGreaterThan(0);
        if (section.groupLabels) expect(section.groupLabels[language].trim().length).toBeGreaterThan(0);
      }
    }
    for (const language of ["en", "de", "fr"] as const) {
      expect(transparencyDetail[language]).toHaveLength(transparencyDetail.en.length);
      expect(transparencyOpening[language].body.trim().length).toBeGreaterThan(0);
    }
  });

  it("throws instead of falling back when a language is missing", () => {
    const incomplete = { en: "English only", de: "Nur Deutsch" } as Record<PortfolioLanguage, string>;
    expect(() => pick(incomplete, "fr")).toThrow(/Missing fr translation/);
  });

  it("offers English, Deutsch and Français and switches the visible UI without leaving the section", () => {
    render(<App />);
    expect(screen.getAllByRole("button", { name: "English" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: "Deutsch" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: "Français" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: "English" })[0]).toHaveAttribute("aria-pressed", "true");

    expect(screen.getByRole("region", { name: "Education" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "View PDF" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Overview" }).length).toBeGreaterThan(0);
    expect(document.title).toMatch(/Software Developer/);

    fireEvent.click(screen.getAllByRole("button", { name: "Français" })[0]);
    expect(window.location.hash).toBe("#education");
    expect(document.documentElement).toHaveAttribute("lang", "fr");
    expect(window.localStorage.getItem("nexusos-portfolio:language")).toBe("fr");
    expect(screen.getAllByRole("button", { name: "Français" })[0]).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("region", { name: "Formation" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Aperçu" }).length).toBeGreaterThan(0);
    expect(screen.queryByRole("link", { name: "Overview" })).not.toBeInTheDocument();
    expect(screen.queryAllByRole("link", { name: "View PDF" })).toHaveLength(0);
    expect(screen.getAllByRole("link", { name: "Voir le PDF" }).length).toBeGreaterThan(0);
    expect(screen.getByRole("region", { name: "Transparence et démarche de développement" })).toHaveTextContent(
      transparencyDetail.fr[0].heading,
    );
    expect(screen.getByRole("region", { name: "Formation" })).not.toHaveTextContent(transparencyOpening.en.body);
    expect(document.title).toMatch(/Développeur logiciel/);

    fireEvent.click(screen.getAllByRole("button", { name: "Deutsch" })[0]);
    expect(window.location.hash).toBe("#education");
    expect(screen.getByRole("region", { name: "Ausbildung" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "PDF ansehen" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Überblick" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Weitere Projekte" }).length).toBeGreaterThan(0);
    expect(screen.queryByRole("link", { name: "Other projects" })).not.toBeInTheDocument();
    expect(screen.getAllByText("In Entwicklung").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Nicht bewertet").length).toBeGreaterThan(0);
    expect(screen.queryByText("In Progress")).not.toBeInTheDocument();
    expect(screen.queryByText("Not assessed")).not.toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute("lang", "de");
  });

  it("switches the progress chrome in French without inventing a percentage", () => {
    render(
      <LanguageProvider>
        <LanguageSwitch />
        <ProjectProgress id="pentest-report-generator" />
        <ProjectProgress id="nexusos" />
      </LanguageProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Français" }));
    const pentest = screen.getByRole("progressbar", { name: "Pentest Report Generator (v1) avancement" });
    expect(pentest).toHaveAttribute("aria-valuetext", "Non évalué");
    expect(within(pentest.parentElement as HTMLElement).getByText("Non évalué")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "NexusOS avancement" })).toHaveAttribute("aria-valuenow", "82");
    expect(screen.getAllByText("En cours").length).toBeGreaterThan(0);
    expect(screen.getByText("Évalué le 16 octobre 2026")).toBeInTheDocument();
    expect(screen.queryByText("In Progress")).not.toBeInTheDocument();
    expect(screen.queryByText("Not assessed")).not.toBeInTheDocument();
  });
});
