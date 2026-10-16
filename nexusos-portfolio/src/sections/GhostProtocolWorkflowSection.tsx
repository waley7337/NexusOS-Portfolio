import { ghostProtocolWorkflow } from "~/data/assets";
import { usePortfolioLanguage } from "~/i18n/language";
import { ArchitectureCarousel, type ArchitectureDiagram } from "~/sections/ArchitectureCarousel";
import { sectionTitle } from "~/sections/registry";
import { Section } from "~/sections/Section";

const DIAGRAMS: ArchitectureDiagram[] = ghostProtocolWorkflow.map((asset) => ({
  asset,
  label: "Workflow",
  copy: asset.description,
}));

export function GhostProtocolWorkflowSection() {
  const { language } = usePortfolioLanguage();
  return (
    <Section
      id="ghost-protocol-workflow"
      title={sectionTitle("ghost-protocol-workflow", language)}
      subtitle="How Ghost Protocol was built, and which phases are still ahead."
    >
      <ArchitectureCarousel diagrams={DIAGRAMS} controlLabel="Ghost Protocol workflow diagram" />
      <p className="text-small text-muted-foreground">
        The engineering case study and the development roadmap. A roadmap is not a claim that later phases are operational.
      </p>
    </Section>
  );
}
