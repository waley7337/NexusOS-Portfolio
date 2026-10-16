import { ghostProtocolWorkflow } from "~/data/assets";
import { usePick, usePortfolioLanguage } from "~/i18n/language";
import { ui } from "~/i18n/ui";
import { ArchitectureCarousel, type ArchitectureDiagram } from "~/sections/ArchitectureCarousel";
import { sectionTitle } from "~/sections/registry";
import { Section } from "~/sections/Section";

export function GhostProtocolWorkflowSection() {
  const { language } = usePortfolioLanguage();
  const t = usePick();
  const diagrams: ArchitectureDiagram[] = ghostProtocolWorkflow.map((asset) => ({
    asset,
    label: t(ui.workflowLabel),
    copy: t(asset.description),
  }));
  return (
    <Section
      id="ghost-protocol-workflow"
      title={sectionTitle("ghost-protocol-workflow", language)}
      subtitle={t(ui.ghostWorkflowSubtitle)}
    >
      <ArchitectureCarousel diagrams={diagrams} controlLabel={t(ui.controlGhostWorkflow)} />
      <p className="text-small text-muted-foreground">{t(ui.ghostWorkflowNote)}</p>
    </Section>
  );
}
