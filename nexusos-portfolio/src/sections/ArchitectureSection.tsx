import { multiTenantFlow, securityArchitecture, systemArchitecture } from "~/data/assets";
import { nexusos } from "~/data/nexusos";
import { ArchitectureCarousel } from "~/sections/ArchitectureCarousel";
import { Section } from "~/sections/Section";

const DIAGRAMS = [
  { asset: systemArchitecture, label: "Architecture", copy: nexusos.architecture.system },
  { asset: securityArchitecture, label: "Security", copy: nexusos.architecture.security },
  { asset: multiTenantFlow, label: "Multi-tenancy", copy: nexusos.architecture.tenancy },
];

export function ArchitectureSection() {
  return (
    <Section
      id="architecture"
      title="Architecture"
      subtitle="Diagrams derived from the implemented NexusOS codebase. Click to inspect at full size."
    >
      <ArchitectureCarousel diagrams={DIAGRAMS} />
    </Section>
  );
}
