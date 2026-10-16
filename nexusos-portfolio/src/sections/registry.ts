import type { LucideIcon } from "lucide-react";
import { AppWindow, BookOpen, FileText, FolderOpen, GraduationCap, LayoutDashboard, Mail, Network, Orbit, ScrollText, Shield, Workflow } from "lucide-react";
import type { PortfolioLanguage } from "~/i18n/language";

export interface SectionEntry {
  id: string;
  label: string;
  labels?: Partial<Record<PortfolioLanguage, string>>;
  icon: LucideIcon;
  /** Visual group label. Not a tab, and not a control that hides the entries under it. */
  group?: string;
  groupLabels?: Partial<Record<PortfolioLanguage, string>>;
}

export function sectionLabel(section: SectionEntry, language: PortfolioLanguage): string {
  return section.labels?.[language] ?? section.label;
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
export const SECTIONS: SectionEntry[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  {
    id: "transparency",
    label: "Transparency & Development Approach",
    labels: { de: "Transparenz & Entwicklungsansatz" },
    icon: ScrollText,
  },
  { id: "cv", label: "CV", icon: FileText },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "nexusos", label: "NexusOS", icon: Orbit, group: "NexusOS" },
  {
    id: "workflow",
    label: "NexusOS Workflow",
    labels: { de: "NexusOS-Arbeitsablauf" },
    icon: Workflow,
    group: "NexusOS",
  },
  {
    id: "architecture",
    label: "NexusOS Architecture",
    labels: { de: "NexusOS-Architektur" },
    icon: Network,
    group: "NexusOS",
  },
  {
    id: "nexusos-library",
    label: "NexusOS Library",
    labels: { de: "NexusOS-Bibliothek" },
    icon: FolderOpen,
    group: "NexusOS",
  },
  { id: "ghost-protocol", label: "Ghost Protocol", icon: Shield, group: "Ghost Protocol" },
  {
    id: "ghost-protocol-workflow",
    label: "Ghost Protocol Workflow",
    labels: { de: "Ghost-Protocol-Arbeitsablauf" },
    icon: Workflow,
    group: "Ghost Protocol",
  },
  {
    id: "ghost-protocol-architecture",
    label: "Ghost Protocol Architecture",
    labels: { de: "Ghost-Protocol-Architektur" },
    icon: Network,
    group: "Ghost Protocol",
  },
  {
    id: "ghost-protocol-library",
    label: "Ghost Protocol Library",
    labels: { de: "Ghost-Protocol-Bibliothek" },
    icon: FolderOpen,
    group: "Ghost Protocol",
  },
  { id: "projects", label: "Other projects", icon: BookOpen },
  { id: "demos", label: "Demo access", icon: AppWindow },
  { id: "contact", label: "Contact", icon: Mail },
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
