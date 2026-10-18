import { ghostProtocolArchitecture } from "~/data/assets";
import { ghostArchitectureCopy, ghostSecurityCopy } from "~/data/ghostProtocol";
import { usePick, usePortfolioLanguage } from "~/i18n/language";
import { ui } from "~/i18n/ui";
import type { L10n } from "~/i18n/l10n";
import { ArchitectureCarousel, type ArchitectureDiagram } from "~/sections/ArchitectureCarousel";
import { sectionTitle } from "~/sections/registry";
import { Section } from "~/sections/Section";

const DIAGRAM_COPY: Record<string, { label: L10n<string>; copy: L10n<string> }> = {
  "gp-system-architecture": { label: ui.architectureLabel, copy: ghostArchitectureCopy },
  "gp-security-architecture": { label: ui.securityLabel, copy: ghostSecurityCopy },
};

export function GhostProtocolArchitectureSection() {
  const { language } = usePortfolioLanguage();
  const t = usePick();
  const diagrams: ArchitectureDiagram[] = ghostProtocolArchitecture.map((asset) => {
    const paired = DIAGRAM_COPY[asset.id];
    return {
      asset,
      label: t(paired?.label ?? ui.architectureLabel),
      copy: t(paired?.copy ?? asset.description),
    };
  });
  return (
    <Section
      id="ghost-protocol-architecture"
      title={sectionTitle("ghost-protocol-architecture", language)}
      subtitle={t(ui.ghostArchitectureSubtitle)}
    >
      <ArchitectureCarousel diagrams={diagrams} controlLabel={t(ui.controlGhostArchitecture)} />
    </Section>
  );
}
