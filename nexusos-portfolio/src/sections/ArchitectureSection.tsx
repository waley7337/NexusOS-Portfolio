import { multiTenantFlow, securityArchitecture, systemArchitecture } from "~/data/assets";
import { nexusos } from "~/data/nexusos";
import { usePick, usePortfolioLanguage } from "~/i18n/language";
import { ui } from "~/i18n/ui";
import { ArchitectureCarousel } from "~/sections/ArchitectureCarousel";
import { sectionTitle } from "~/sections/registry";
import { Section } from "~/sections/Section";

export function ArchitectureSection() {
  const { language } = usePortfolioLanguage();
  const t = usePick();
  const diagrams = [
    { asset: systemArchitecture, label: t(ui.architectureLabel), copy: t(nexusos.architecture.system) },
    { asset: securityArchitecture, label: t(ui.securityLabel), copy: t(nexusos.architecture.security) },
    { asset: multiTenantFlow, label: t(ui.multiTenancyLabel), copy: t(nexusos.architecture.tenancy) },
  ];
  return (
    <Section
      id="architecture"
      title={sectionTitle("architecture", language)}
      subtitle={t(ui.architectureSubtitle)}
    >
      <ArchitectureCarousel diagrams={diagrams} controlLabel={t(ui.controlArchitecture)} />
    </Section>
  );
}
