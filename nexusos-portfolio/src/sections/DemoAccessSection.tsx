import { GhostCompanyDemoCard, NexusCompanyDemoCard } from "~/components/DemoAccessCards";
import { DEMO_ACCESS_NOTE } from "~/data/demoAccess";
import { Section } from "~/sections/Section";

/**
 * Live demos with the company portfolio link and the demo accounts the
 * owner supplied for this page. NexusOS and Ghost Protocol stay on
 * separate cards. The same cards also render on each project overview.
 */
export function DemoAccessSection() {
  return (
    <Section
      id="demos"
      title="Live demos & access"
      subtitle="Verified destinations for the live NexusOS application and the Ghost Protocol web client."
    >
      <div className="grid gap-3 lg:grid-cols-2">
        <NexusCompanyDemoCard />
        <GhostCompanyDemoCard />
      </div>
      <p className="text-small text-muted-foreground" id="demo-access-note" data-testid="demo-access-footer">
        {DEMO_ACCESS_NOTE}
      </p>
    </Section>
  );
}
