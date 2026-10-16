import type { LucideIcon } from "lucide-react";
import { AppWindow, BookOpen, FileText, FolderOpen, GraduationCap, LayoutDashboard, Mail, Network, Orbit, ScrollText, Shield, Workflow } from "lucide-react";
import type { PortfolioLanguage } from "~/i18n/language";

export interface SectionEntry {
  id: string;
  label: string;
  labels?: Partial<Record<PortfolioLanguage, string>>;
  icon: LucideIcon;
}

export function sectionLabel(section: SectionEntry, language: PortfolioLanguage): string {
  return section.labels?.[language] ?? section.label;
}

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
  { id: "nexusos", label: "NexusOS", icon: Orbit },
  { id: "workflow", label: "NexusOS workflow", icon: Workflow },
  { id: "architecture", label: "Architecture", icon: Network },
  { id: "ghost-protocol", label: "Ghost Protocol", icon: Shield },
  { id: "library", label: "Library", icon: FolderOpen },
  { id: "projects", label: "Other projects", icon: BookOpen },
  { id: "demos", label: "Demo access", icon: AppWindow },
  { id: "contact", label: "Contact", icon: Mail },
];
