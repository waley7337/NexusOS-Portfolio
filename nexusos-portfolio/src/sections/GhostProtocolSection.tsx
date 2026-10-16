import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Row, RowGroup } from "@/components/ui/structure";
import { cn } from "@/lib/utils";
import { ghostProtocol, ghostProtocolShots } from "~/data/ghost-protocol";
import type { Asset } from "~/data/assets";
import { AssetPreviewDialog } from "~/components/AssetPreviewDialog";
import { Section } from "~/sections/Section";

type TabId = "overview" | "workflow" | "architecture";

const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Ghost Protocol" },
  { id: "workflow", label: "Workflow" },
  { id: "architecture", label: "Architecture" },
];

export function GhostProtocolSection() {
  const [tab, setTab] = useState<TabId>("overview");
  const [preview, setPreview] = useState<Asset | null>(null);

  return (
    <Section
      id="ghost-protocol"
      title="Ghost Protocol"
      subtitle="Featured project · cybersecurity learning platform"
      action={
        <div className="flex flex-wrap gap-2">
          <a
            className={buttonVariants({ variant: "primary", size: "sm" })}
            href={ghostProtocol.demo.href}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink aria-hidden="true" />
            {ghostProtocol.demo.label}
          </a>
          <a className={buttonVariants({ variant: "outline", size: "sm" })} href={ghostProtocol.github} target="_blank" rel="noreferrer">
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
              {label}
            </button>
          );
        })}
      </div>

      {tab === "overview" && (
        <div
          id="gp-panel-overview"
          role="tabpanel"
          aria-labelledby="gp-tab-overview"
          className="space-y-8"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="space-y-4">
              <p className="text-h3 font-medium leading-snug">{ghostProtocol.subtitle}</p>
              {ghostProtocol.summary.map((p) => (
                <p key={p.slice(0, 24)} className="text-body text-muted-foreground">
                  {p}
                </p>
              ))}
              <p className="text-small text-muted-foreground">
                <span className="text-machine mr-2">Role</span>
                {ghostProtocol.role}
              </p>
            </div>
            <Card className="p-5">
              <p className="eyebrow mb-1">Status — stated precisely</p>
              <p className="text-small text-foreground" data-testid="ghost-protocol-status">
                {ghostProtocol.status.headline}
              </p>
              <RowGroup className="mt-2">
                <Row register={<Badge variant="success">Implemented</Badge>}>
                  <p className="text-small text-muted-foreground">{ghostProtocol.status.implemented}</p>
                </Row>
                <Row register={<Badge variant="warning">Partial</Badge>}>
                  <p className="text-small text-muted-foreground">{ghostProtocol.status.partial}</p>
                </Row>
                <Row register={<Badge>Not claimed</Badge>}>
                  <p className="text-small text-muted-foreground">{ghostProtocol.status.notClaimed}</p>
                </Row>
              </RowGroup>
            </Card>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ghostProtocol.highlights.map((h) => (
              <Card key={h.title} className="p-5">
                <p className="text-h4">{h.title}</p>
                <p className="mt-2 text-small leading-relaxed text-muted-foreground">{h.body}</p>
              </Card>
            ))}
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
            <p className="text-small text-muted-foreground">{ghostProtocol.interfaceNote}</p>
          </div>

          <RowGroup className="border-y border-line-soft">
            {ghostProtocol.stack.map((s) => (
              <Row key={s.label} register={s.label}>
                <p className="text-sm">{s.value}</p>
              </Row>
            ))}
          </RowGroup>
        </div>
      )}

      {tab === "workflow" && (
        <div id="gp-panel-workflow" role="tabpanel" aria-labelledby="gp-tab-workflow">
          <TabPlaceholder
            eyebrow="Workflow"
            title="Workflow write-up in progress"
            body="The build process, mission authoring and release workflow for Ghost Protocol will be documented here."
          />
        </div>
      )}

      {tab === "architecture" && (
        <div id="gp-panel-architecture" role="tabpanel" aria-labelledby="gp-tab-architecture">
          <TabPlaceholder
            eyebrow="Architecture"
            title="Architecture diagrams in progress"
            body="Diagrams of the two-client model and the API-only database boundary will be added here."
          />
        </div>
      )}

      <AssetPreviewDialog asset={preview} onClose={() => setPreview(null)} />
    </Section>
  );
}

function TabPlaceholder({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <Card className="flex flex-col items-center gap-2 px-6 py-16 text-center">
      <p className="eyebrow">{eyebrow}</p>
      <p className="text-h4">{title}</p>
      <p className="max-w-md text-small text-muted-foreground">{body}</p>
    </Card>
  );
}
