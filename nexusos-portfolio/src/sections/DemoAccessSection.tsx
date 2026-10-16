import { GhostCompanyDemoCard, NexusCompanyDemoCard } from "~/components/DemoAccessCards";
import { demoAccessNote } from "~/data/demoAccess";
import { usePick } from "~/i18n/language";
import { ui } from "~/i18n/ui";
import { Section } from "~/sections/Section";

/**
 * Live demos with the company portfolio link and the demo accounts the
 * owner supplied for this page. NexusOS and Ghost Protocol stay on
 * separate cards. The same cards also render on each project overview.
 */
export function DemoAccessSection() {
  const t = usePick();
  return (
    <Section id="demos" title={t(ui.demosTitle)} subtitle={t(ui.demosSubtitle)}>
      <div className="grid gap-3 lg:grid-cols-2">
        <NexusCompanyDemoCard />
        <GhostCompanyDemoCard />
      </div>
      <p className="text-small text-muted-foreground" id="demo-access-note" data-testid="demo-access-footer">
        {t(demoAccessNote)}
      </p>
    </Section>
  );
}
