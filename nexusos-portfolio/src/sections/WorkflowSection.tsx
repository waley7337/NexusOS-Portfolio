import { Card } from "@/components/ui/card";
import { workflowByLanguage } from "~/data/workflow";
import { pick } from "~/i18n/l10n";
import { usePortfolioLanguage } from "~/i18n/language";
import { ui } from "~/i18n/ui";
import { Section } from "~/sections/Section";
import { sectionTitle } from "~/sections/registry";

export function WorkflowSection() {
  const { language } = usePortfolioLanguage();
  const copy = pick(workflowByLanguage, language);

  return (
    <Section id="workflow" title={sectionTitle("workflow", language)} subtitle={copy.intro}>
      <div className="grid gap-3">
        {copy.steps.map((step) => (
          <Card key={step.index} className="grid gap-3 p-5 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:items-start">
            <p className="text-machine text-primary">{step.index}</p>
            <div className="min-w-0 space-y-2">
              <p className="text-h4">{step.title}</p>
              <p className="text-small leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          </Card>
        ))}
        <Card className="space-y-4 p-5">
          <div className="space-y-1.5">
            <p className="eyebrow">{copy.cycleLabel}</p>
            <p className="text-sm">{copy.cycle}</p>
          </div>
          <div className="space-y-1.5">
            <p className="eyebrow">{copy.stackLabel}</p>
            <p className="text-sm">{copy.stack}</p>
          </div>
        </Card>
        <Card className="space-y-2 p-5">
          <p className="eyebrow">{pick(ui.relationshipToTransparency, language)}</p>
          <p className="text-small leading-relaxed text-muted-foreground">{copy.relationship}</p>
        </Card>
      </div>
    </Section>
  );
}
