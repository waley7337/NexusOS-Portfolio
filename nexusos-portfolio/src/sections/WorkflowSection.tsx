import { Card } from "@/components/ui/card";
import { workflowCycle, workflowIntro, workflowStack, workflowSteps } from "~/data/workflow";
import { Section } from "~/sections/Section";

export function WorkflowSection() {
  return (
    <Section id="workflow" title="NexusOS workflow" subtitle={workflowIntro}>
      <div className="grid gap-3">
        {workflowSteps.map((step) => (
          <Card key={step.index} className="workflow-step portfolio-lift grid gap-3 p-5 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:items-start">
            <p className="text-machine text-primary">{step.index}</p>
            <div className="min-w-0 space-y-2">
              <p className="text-h4">{step.title}</p>
              <p className="text-small leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          </Card>
        ))}
        <Card className="workflow-step space-y-4 p-5">
          <div className="space-y-1.5">
            <p className="eyebrow">Development Cycle</p>
            <p className="text-sm">{workflowCycle}</p>
          </div>
          <div className="space-y-1.5">
            <p className="eyebrow">Technology Stack</p>
            <p className="text-sm">{workflowStack}</p>
          </div>
        </Card>
      </div>
    </Section>
  );
}
