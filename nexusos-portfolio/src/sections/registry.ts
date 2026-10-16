import type { LucideIcon } from "lucide-react";
import { AppWindow, BookOpen, FileText, FolderOpen, GraduationCap, LayoutDashboard, Mail, Network, Orbit, ScrollText, Shield, Workflow } from "lucide-react";
import { pick, type L10n, type PortfolioLanguage } from "~/i18n/l10n";

export interface SectionEntry {
  id: string;
  /** English nav label. Kept so existing checks can read the default language directly. */
  label: string;
  labels: L10n<string>;
  icon: LucideIcon;
  /** Visual group label. Not a tab, and not a control that hides the entries under it. */
  group?: string;
  groupLabels?: L10n<string>;
}

export function sectionLabel(section: SectionEntry, language: PortfolioLanguage): string {
  return pick(section.labels, language);
}

export function sectionTitle(id: string, language: PortfolioLanguage): string {
  const section = SECTIONS.find((entry) => entry.id === id);
  if (!section) throw new Error(`Unknown section ${id}`);
  return sectionLabel(section, language);
}

/**
 * Sidebar order is the page order. The eight project tabs sit together.
 * Group labels are rendered by the nav; they are not extra sections.
 */
const same = (text: string): L10n<string> => ({ en: text, de: text, fr: text });

const nexusGroup = same("NexusOS");
const ghostGroup = same("Ghost Protocol");

export const SECTIONS: SectionEntry[] = [
  {
    id: "overview",
    label: "Overview",
    labels: { en: "Overview", de: "Überblick", fr: "Aperçu" },
    icon: LayoutDashboard,
  },
  {
    id: "transparency",
    label: "Transparency & Development Approach",
    labels: {
      en: "Transparency & Development Approach",
      de: "Transparenz & Entwicklungsansatz",
      fr: "Transparence et démarche de développement",
    },
    icon: ScrollText,
  },
  {
    id: "cv",
    label: "CV",
    labels: { en: "CV", de: "Lebenslauf", fr: "CV" },
    icon: FileText,
  },
  {
    id: "education",
    label: "Education",
    labels: { en: "Education", de: "Ausbildung", fr: "Formation" },
    icon: GraduationCap,
  },
  { id: "nexusos", label: "NexusOS", labels: same("NexusOS"), icon: Orbit, group: "NexusOS", groupLabels: nexusGroup },
  {
    id: "workflow",
    label: "NexusOS Workflow",
    labels: { en: "NexusOS Workflow", de: "NexusOS-Arbeitsablauf", fr: "Processus NexusOS" },
    icon: Workflow,
    group: "NexusOS",
    groupLabels: nexusGroup,
  },
  {
    id: "architecture",
    label: "NexusOS Architecture",
    labels: { en: "NexusOS Architecture", de: "NexusOS-Architektur", fr: "Architecture NexusOS" },
    icon: Network,
    group: "NexusOS",
    groupLabels: nexusGroup,
  },
  {
    id: "nexusos-library",
    label: "NexusOS Library",
    labels: { en: "NexusOS Library", de: "NexusOS-Bibliothek", fr: "Bibliothèque NexusOS" },
    icon: FolderOpen,
    group: "NexusOS",
    groupLabels: nexusGroup,
  },
  {
    id: "ghost-protocol",
    label: "Ghost Protocol",
    labels: same("Ghost Protocol"),
    icon: Shield,
    group: "Ghost Protocol",
    groupLabels: ghostGroup,
  },
  {
    id: "ghost-protocol-workflow",
    label: "Ghost Protocol Workflow",
    labels: {
      en: "Ghost Protocol Workflow",
      de: "Ghost-Protocol-Arbeitsablauf",
      fr: "Processus Ghost Protocol",
    },
    icon: Workflow,
    group: "Ghost Protocol",
    groupLabels: ghostGroup,
  },
  {
    id: "ghost-protocol-architecture",
    label: "Ghost Protocol Architecture",
    labels: {
      en: "Ghost Protocol Architecture",
      de: "Ghost-Protocol-Architektur",
      fr: "Architecture Ghost Protocol",
    },
    icon: Network,
    group: "Ghost Protocol",
    groupLabels: ghostGroup,
  },
  {
    id: "ghost-protocol-library",
    label: "Ghost Protocol Library",
    labels: {
      en: "Ghost Protocol Library",
      de: "Ghost-Protocol-Bibliothek",
      fr: "Bibliothèque Ghost Protocol",
    },
    icon: FolderOpen,
    group: "Ghost Protocol",
    groupLabels: ghostGroup,
  },
  {
    id: "projects",
    label: "Other projects",
    labels: { en: "Other projects", de: "Weitere Projekte", fr: "Autres projets" },
    icon: BookOpen,
  },
  {
    id: "demos",
    label: "Demo access",
    labels: { en: "Demo access", de: "Demo-Zugang", fr: "Accès aux démos" },
    icon: AppWindow,
  },
  {
    id: "contact",
    label: "Contact",
    labels: { en: "Contact", de: "Kontakt", fr: "Contact" },
    icon: Mail,
  },
];

export const PROJECT_TAB_LABELS = [
  "NexusOS",
  "NexusOS Workflow",
  "NexusOS Architecture",
  "NexusOS Library",
  "Ghost Protocol",
  "Ghost Protocol Workflow",
  "Ghost Protocol Architecture",
  "Ghost Protocol Library",
] as const;
