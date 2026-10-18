import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProjectProgress } from "~/components/ProjectProgress";
import { otherProjects, type ProjectStatus } from "~/data/projects";
import { usePick, usePortfolioLanguage } from "~/i18n/language";
import { ui } from "~/i18n/ui";
import { sectionTitle } from "~/sections/registry";
import { Section } from "~/sections/Section";

const PROGRESS_ID: Record<string, string> = {
  "Ghost Protocol": "ghost-protocol",
  "Pentest Report Generator (v1)": "pentest-report-generator",
};

const STATUS_VARIANT: Record<ProjectStatus, "success" | "info" | "warning" | "default"> = {
  completed: "success",
  "in-progress": "info",
  prototype: "warning",
  concept: "default",
};

export function ProjectsSection() {
  const { language } = usePortfolioLanguage();
  const t = usePick();
  return (
    <Section
      id="projects"
      title={sectionTitle("projects", language)}
      subtitle={t(ui.otherProjectsSubtitle)}
    >
      <div className="grid gap-3">
        {otherProjects
          .filter((project) => project.name !== "Ghost Protocol")
          .map((project) => (
          <Card
            key={project.name}
            className="p-5 sm:p-6"
            data-layout="horizontal"
            data-project={project.name}
          >
            <div className="project-band">
              <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-h3">{project.name}</h3>
                  <Badge variant={STATUS_VARIANT[project.status]}>{t(project.statusLabel)}</Badge>
                </div>
                <p className="text-machine">{project.stack.join("  ·  ")}</p>
                <p className="text-body text-muted-foreground">{t(project.summary)}</p>
              </div>
              {PROGRESS_ID[project.name] ? <ProjectProgress id={PROGRESS_ID[project.name]} /> : <div />}
              <div className="flex min-w-0 flex-wrap content-start gap-2">
                {project.demo && (
                  <>
                    <a
                      className={buttonVariants({ variant: "primary", size: "sm" })}
                      href={project.demo.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink aria-hidden="true" />
                      {t(project.demo.label)}
                    </a>
                    <a
                      className={buttonVariants({ variant: "outline", size: "sm" })}
                      href={project.demo.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink aria-hidden="true" />
                      {t(ui.openDemo)}
                    </a>
                  </>
                )}
                {project.github && (
                  <a
                    className={buttonVariants({ variant: "outline", size: "sm" })}
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github aria-hidden="true" />
                    {t(ui.github)}
                  </a>
                )}
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <p className="eyebrow">{t(ui.implemented)}</p>
                <ul className="space-y-1.5">
                  {project.features.map((feature) => (
                    <li key={feature.en} className="text-small leading-relaxed text-muted-foreground">
                      {t(feature)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <p className="eyebrow">{t(ui.decisions)}</p>
                <ul className="space-y-1.5">
                  {project.decisions.map((decision) => (
                    <li key={decision.en} className="text-small leading-relaxed text-muted-foreground">
                      {t(decision)}
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
