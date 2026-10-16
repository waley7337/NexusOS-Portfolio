import { useState } from "react";
import { ExternalLink, FileText, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Row, RowGroup } from "@/components/ui/structure";
import { cn } from "@/lib/utils";
import { AssetPreviewDialog } from "~/components/AssetPreviewDialog";
import { ProjectProgress } from "~/components/ProjectProgress";
import {
  ghostProtocolArchitecture,
  ghostProtocolShots,
  ghostProtocolTour,
  ghostProtocolWorkflow,
  type Asset,
} from "~/data/assets";
import { ghostDocs, ghostScreenshotNote } from "~/data/ghostProtocol";
import { usePortfolioLanguage, type PortfolioLanguage } from "~/i18n/language";
import { otherProjects } from "~/data/projects";
import { ArchitectureCarousel, type ArchitectureDiagram } from "~/sections/ArchitectureCarousel";
import { Section } from "~/sections/Section";

const project = otherProjects.find((entry) => entry.name === "Ghost Protocol");

const SCREENSHOTS: ArchitectureDiagram[] = [
  {
    asset: ghostProtocolShots[0],
    label: "Web client",
    copy: "Operations panel of the deployed web client: mission progress, rank, and the mission list.",
  },
  {
    asset: ghostProtocolShots[1],
    label: "Web client",
    copy: "Mission lab panel of the deployed web client.",
  },
  {
    asset: ghostProtocolShots[2],
    label: "Web client",
    copy: "Rank progression panel of the deployed web client.",
  },
];

const WORKFLOW: ArchitectureDiagram[] = ghostProtocolWorkflow.map((asset) => ({
  asset,
  label: "Workflow",
  copy: asset.description,
}));

const ARCHITECTURE: ArchitectureDiagram[] = ghostProtocolArchitecture.map((asset) => ({
  asset,
  label: "Architecture",
  copy: asset.description,
}));

type TabId = "overview" | "workflow" | "architecture";

/** Tab order recovered from the Ghost Protocol section: overview, workflow, architecture. */
const TABS: { id: TabId; label: Record<PortfolioLanguage, string> }[] = [
  { id: "overview", label: { en: "Ghost Protocol", de: "Ghost Protocol" } },
  { id: "workflow", label: { en: "Workflow", de: "Arbeitsablauf" } },
  { id: "architecture", label: { en: "Architecture", de: "Architektur" } },
];

export function GhostProtocolSection() {
  const { language } = usePortfolioLanguage();
  const [tab, setTab] = useState<TabId>("overview");
  const [preview, setPreview] = useState<Asset | null>(null);
  if (!project?.demo || !project.github) return null;

  return (
    <Section
      id="ghost-protocol"
      title="Ghost Protocol"
      subtitle="Cybersecurity learning platform · profile, live web client, and public documentation."
      action={
        <div className="flex flex-wrap gap-2">
          <a
            className={buttonVariants({ variant: "primary", size: "sm" })}
            href={project.demo.href}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink aria-hidden="true" />
            {project.demo.label}
          </a>
          <a className={buttonVariants({ variant: "outline", size: "sm" })} href={project.github} target="_blank" rel="noreferrer">
            <Github aria-hidden="true" />
            GitHub
          </a>
        </div>
      }
    >
      <div role="tablist" aria-label="Ghost Protocol" className="flex flex-wrap gap-1 border-b border-line-soft">
        {TABS.map(({ id, label }) => {
          const isActive = tab === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              id={`gp-tab-${id}`}
              aria-selected={isActive}
              aria-controls={`gp-panel-${id}`}
              onClick={() => setTab(id)}
              className={cn(
                "focus-ring relative -mb-px rounded-t-control px-4 py-2 text-sm font-medium transition-colors duration-fast",
                isActive
                  ? "border-b-2 border-primary text-foreground"
                  : "border-b-2 border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {label[language]}
            </button>
          );
        })}
      </div>

      {tab === "overview" && (
        <div id="gp-panel-overview" role="tabpanel" aria-labelledby="gp-tab-overview" className="space-y-8">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="space-y-4">
              <p className="text-body text-muted-foreground">{project.summary}</p>
              <p className="text-small text-muted-foreground">
                <span className="text-machine mr-2">Stack</span>
                {project.stack.join(" · ")}
              </p>
            </div>
            <Card className="space-y-4 p-5">
              <div>
                <p className="eyebrow mb-1">Status — stated precisely</p>
                <p className="text-small text-foreground" data-testid="ghost-project-status">
                  {project.statusLabel}. The web client is deployed. Password reset, signed public desktop builds and conflict-safe multi-device sync are not.
                </p>
              </div>
              <ProjectProgress id="ghost-protocol" />
              <RowGroup className="mt-2">
                <Row register={<Badge variant="success">Implemented</Badge>}>
                  <ul className="space-y-1.5">
                    {project.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="text-small leading-relaxed text-muted-foreground">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Row>
                <Row register={<Badge variant="warning">Partial</Badge>}>
                  <p className="text-small text-muted-foreground">{project.features[3]}</p>
                </Row>
                <Row register={<Badge>Decisions</Badge>}>
                  <ul className="space-y-1.5">
                    {project.decisions.map((decision) => (
                      <li key={decision} className="text-small leading-relaxed text-muted-foreground">
                        {decision}
                      </li>
                    ))}
                  </ul>
                </Row>
              </RowGroup>
            </Card>
          </div>

          <div className="space-y-3">
            <p className="eyebrow">Interface</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ghostProtocolShots.map((shot) => (
                <Card key={shot.id} interactive className="overflow-hidden">
                  <button type="button" className="focus-ring block w-full text-left" onClick={() => setPreview(shot)}>
                    <img src={shot.preview} alt={shot.title} loading="lazy" className="aspect-[16/10] w-full object-cover" />
                    <span className="block p-3 text-sm font-medium">{shot.title}</span>
                  </button>
                </Card>
              ))}
            </div>
            <ArchitectureCarousel diagrams={SCREENSHOTS} controlLabel="Ghost Protocol screenshot" />
            <p className="text-small text-muted-foreground">{ghostScreenshotNote}</p>
          </div>

          <div className="space-y-3">
            <p className="eyebrow">{language === "de" ? "Produktbilder" : "Screenshots"}</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ghostProtocolTour.map((shot) => (
                <Card key={shot.id} interactive className="overflow-hidden">
                  <button type="button" className="focus-ring block w-full text-left" aria-label={shot.title} onClick={() => setPreview(shot)}>
                    <img src={shot.preview} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
                    <span className="block p-3 text-sm font-medium">{shot.title}</span>
                  </button>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="eyebrow">{language === "de" ? "Technische Erläuterung" : "Technical explanation"}</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ghostDocs.map((entry) => (
                <Card key={entry.title} className="flex flex-col gap-3 p-5">
                  <p className="text-h4">{entry.title}</p>
                  <p className="text-small leading-relaxed text-muted-foreground">{entry.body}</p>
                  <a
                    className={`${buttonVariants({ variant: "outline", size: "sm" })} mt-auto w-fit`}
                    href={entry.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FileText aria-hidden="true" />
                    Open {entry.title}
                  </a>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "workflow" && (
        <div id="gp-panel-workflow" role="tabpanel" aria-labelledby="gp-tab-workflow" className="space-y-3">
          <p className="eyebrow">Workflow</p>
          <ArchitectureCarousel diagrams={WORKFLOW} controlLabel="Ghost Protocol workflow diagram" />
          <p className="text-small text-muted-foreground">
            The engineering case study and the development roadmap — how Ghost Protocol was built, and which phases are still ahead. A roadmap is not a claim that later phases are operational.
          </p>
        </div>
      )}

      {tab === "architecture" && (
        <div id="gp-panel-architecture" role="tabpanel" aria-labelledby="gp-tab-architecture" className="space-y-3">
          <p className="eyebrow">Architecture</p>
          <ArchitectureCarousel diagrams={ARCHITECTURE} controlLabel="Ghost Protocol architecture diagram" />
          <p className="text-small text-muted-foreground">
            Diagrams derived from the implemented Ghost Protocol codebase. Click to inspect at full resolution.
          </p>
        </div>
      )}

      <AssetPreviewDialog asset={preview} onClose={() => setPreview(null)} />
    </Section>
  );
}
