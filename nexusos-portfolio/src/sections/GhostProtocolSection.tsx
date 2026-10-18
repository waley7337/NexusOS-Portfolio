import { ExternalLink, FileText, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Row, RowGroup } from "@/components/ui/structure";
import { GhostCompanyDemoCard } from "~/components/DemoAccessCards";
import { ProjectProgress } from "~/components/ProjectProgress";
import { ghostDocs } from "~/data/ghostProtocol";
import { usePick, usePortfolioLanguage } from "~/i18n/language";
import { openDocName, ui } from "~/i18n/ui";
import { otherProjects } from "~/data/projects";
import { sectionTitle } from "~/sections/registry";
import { Section } from "~/sections/Section";

const project = otherProjects.find((entry) => entry.name === "Ghost Protocol");

export function GhostProtocolSection() {
  const { language } = usePortfolioLanguage();
  const t = usePick();
  if (!project?.demo || !project.github) return null;

  return (
    <Section
      id="ghost-protocol"
      title={sectionTitle("ghost-protocol", language)}
      subtitle={t(ui.ghostSubtitle)}
    >
      <Card className="p-5 sm:p-6" data-layout="horizontal" data-testid="ghost-project-card">
        <div className="project-band">
          <div className="min-w-0 space-y-3">
            <h3 className="text-h2">Ghost Protocol</h3>
            <p className="text-body text-muted-foreground">{t(project.summary)}</p>
            <p className="text-small text-foreground" data-testid="ghost-project-status">
              {t(ui.ghostStatus)}
            </p>
            <p className="text-small text-muted-foreground">
              <span className="text-machine mr-2">{t(ui.stack)}</span>
              {project.stack.join(" · ")}
            </p>
          </div>
          <ProjectProgress id="ghost-protocol" />
          <div className="flex min-w-0 flex-wrap content-start gap-2">
            <a
              className={buttonVariants({ variant: "primary", size: "sm" })}
              href={project.demo.href}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink aria-hidden="true" />
              {t(project.demo.label)}
            </a>
            <a className={buttonVariants({ variant: "outline", size: "sm" })} href={project.github} target="_blank" rel="noreferrer">
              <Github aria-hidden="true" />
              {t(ui.github)}
            </a>
          </div>
        </div>
        <RowGroup className="mt-6 border-t border-line-soft pt-2">
          <Row register={<Badge variant="success">{t(ui.implemented)}</Badge>}>
            <ul className="space-y-1.5">
              {project.features.slice(0, 3).map((feature) => (
                <li key={feature.en} className="text-small leading-relaxed text-muted-foreground">
                  {t(feature)}
                </li>
              ))}
            </ul>
          </Row>
          <Row register={<Badge variant="warning">{t(ui.partial)}</Badge>}>
            <p className="text-small text-muted-foreground">{t(project.features[3])}</p>
          </Row>
          <Row register={<Badge>{t(ui.decisions)}</Badge>}>
            <ul className="space-y-1.5">
              {project.decisions.map((decision) => (
                <li key={decision.en} className="text-small leading-relaxed text-muted-foreground">
                  {t(decision)}
                </li>
              ))}
            </ul>
          </Row>
        </RowGroup>
      </Card>

      <GhostCompanyDemoCard idSuffix="-overview" />

      <div className="space-y-3">
        <p className="eyebrow">{t(ui.technicalExplanation)}</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ghostDocs.map((entry) => (
            <Card key={entry.href} className="flex flex-col gap-3 p-5">
              <p className="text-h4">{t(entry.title)}</p>
              <p className="text-small leading-relaxed text-muted-foreground">{t(entry.body)}</p>
              <a
                className={`${buttonVariants({ variant: "outline", size: "sm" })} mt-auto w-fit`}
                href={entry.href}
                target="_blank"
                rel="noreferrer"
              >
                <FileText aria-hidden="true" />
                {openDocName(t(entry.title), language)}
              </a>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
