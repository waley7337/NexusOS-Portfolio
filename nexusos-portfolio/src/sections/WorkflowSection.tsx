import { Card } from "@/components/ui/card";
import { usePortfolioLanguage } from "~/i18n/language";
import { workflowCycle, workflowDe, workflowIntro, workflowRelationship, workflowStack, workflowSteps } from "~/data/workflow";
import { Section } from "~/sections/Section";
import { sectionTitle } from "~/sections/registry";

export function WorkflowSection() {
  const { language } = usePortfolioLanguage();
  const german = language === "de";
  const title = sectionTitle("workflow", language);
  const intro = german ? workflowDe.intro : workflowIntro;
  const steps = german ? workflowDe.steps : workflowSteps;
  const cycle = german ? workflowDe.cycle : workflowCycle;
  const stack = german ? workflowDe.stack : workflowStack;

  return (
    <Section id="workflow" title={title} subtitle={intro}>
      <div className="grid gap-3">
        {steps.map((step) => (
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
            <p className="eyebrow">{german ? workflowDe.cycleLabel : "Development Cycle"}</p>
            <p className="text-sm">{cycle}</p>
          </div>
          <div className="space-y-1.5">
            <p className="eyebrow">{german ? workflowDe.stackLabel : "Technology Stack"}</p>
            <p className="text-sm">{stack}</p>
          </div>
        </Card>
        <Card className="space-y-2 p-5">
          <p className="eyebrow">{german ? "Bezug zur Transparenz" : "Relationship to transparency"}</p>
          <p className="text-small leading-relaxed text-muted-foreground">{workflowRelationship[language]}</p>
        </Card>
      </div>
    </Section>
  );
}
