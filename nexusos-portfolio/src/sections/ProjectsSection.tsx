import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { otherProjects, type ProjectStatus } from "~/data/projects";
import { Section } from "~/sections/Section";

const STATUS_VARIANT: Record<ProjectStatus, "success" | "info" | "warning" | "default"> = {
  completed: "success",
  "in-progress": "info",
  prototype: "warning",
  concept: "default",
};

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      title="Other projects"
      subtitle="Personal, self-directed projects listed in the CV — not employment as a developer. NexusOS remains the flagship above."
    >
      <div className="grid gap-3 lg:grid-cols-2">
        {otherProjects.map((project) => (
          <Card
            key={project.name}
            className={cn("flex flex-col gap-4 p-5", project.prominent && "lg:col-span-2")}
            data-project={project.name}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-h3">{project.name}</h3>
                  <Badge variant={STATUS_VARIANT[project.status]}>{project.statusLabel}</Badge>
                </div>
                <p className="text-machine">{project.stack.join("  ·  ")}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.demo && (
                  <a
                    className={buttonVariants({ variant: "primary", size: "sm" })}
                    href={project.demo.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink aria-hidden="true" />
                    {project.demo.label}
                  </a>
                )}
                {project.github && (
                  <a
                    className={buttonVariants({ variant: "outline", size: "sm" })}
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github aria-hidden="true" />
                    GitHub
                  </a>
                )}
              </div>
            </div>

            <p className="text-body text-muted-foreground">{project.summary}</p>

            <div className={cn("grid gap-4", project.prominent && "md:grid-cols-2")}>
              <div className="space-y-2">
                <p className="eyebrow">Implemented</p>
                <ul className="space-y-1.5">
                  {project.features.map((feature) => (
                    <li key={feature} className="text-small leading-relaxed text-muted-foreground">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <p className="eyebrow">Decisions</p>
                <ul className="space-y-1.5">
                  {project.decisions.map((decision) => (
                    <li key={decision} className="text-small leading-relaxed text-muted-foreground">
                      {decision}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
