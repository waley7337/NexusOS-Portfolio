import { ghostProtocolArchitecture } from "~/data/assets";
import { ghostArchitectureCopy } from "~/data/ghostProtocol";
import { usePortfolioLanguage } from "~/i18n/language";
import { ArchitectureCarousel, type ArchitectureDiagram } from "~/sections/ArchitectureCarousel";
import { sectionTitle } from "~/sections/registry";
import { Section } from "~/sections/Section";

const DIAGRAMS: ArchitectureDiagram[] = ghostProtocolArchitecture.map((asset) => ({
  asset,
  label: "Architecture",
  copy: ghostArchitectureCopy,
}));

export function GhostProtocolArchitectureSection() {
  const { language } = usePortfolioLanguage();
  return (
    <Section
      id="ghost-protocol-architecture"
      title={sectionTitle("ghost-protocol-architecture", language)}
      subtitle="Architecture diagram for Ghost Protocol. Click to inspect at full resolution."
    >
      <ArchitectureCarousel diagrams={DIAGRAMS} controlLabel="Ghost Protocol architecture diagram" />
    </Section>
  );
}