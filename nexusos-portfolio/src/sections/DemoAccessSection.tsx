import { ExternalLink, LogIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { nexusos } from "~/data/nexusos";
import { profile } from "~/data/profile";
import { otherProjects } from "~/data/projects";
import { Section } from "~/sections/Section";

const ghost = otherProjects.find((project) => project.name === "Ghost Protocol");

/**
 * Live entry points whose public addresses are already verified in this
 * repository. Account fields are omitted: no approved public account
 * name or secret is part of the verified data.
 */
export function DemoAccessSection() {
  return (
    <Section
      id="demos"
      title="Live demos & access"
      subtitle="Verified destinations for the live NexusOS sign-in page and the Ghost Protocol web client."
    >
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="flex flex-col gap-4 p-5" data-demo="NexusOS">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-h3">NexusOS</h3>
              <Badge variant="accent">Live sign-in</Badge>
            </div>
            <p className="text-body text-muted-foreground">{nexusos.subtitle}</p>
          </div>

          <div className="flex flex-col items-start gap-1">
            <p className="eyebrow">Company portfolio identifier</p>
            <p className="text-machine-value" data-testid="company-portfolio-id">
              {profile.companyPortfolioId}
            </p>
            <p className="text-small text-muted-foreground">
              A public address for this identifier is still unconfirmed, so it is shown as text and is not linked.
            </p>
          </div>

          <div className="flex flex-col items-start gap-1">
            <p className="eyebrow">Application sign-in</p>
            <a
              className="focus-ring rounded-control text-sm font-medium text-primary hover:underline"
              href={profile.liveApp.url}
              target="_blank"
              rel="noreferrer"
            >
              {profile.liveApp.host}/login
            </a>
          </div>

          <p className="text-small text-muted-foreground" id="nexusos-demo-note" data-testid="nexusos-demo-note">
            Opens the live sign-in page. Demo credentials are not published yet. {profile.liveApp.note}
          </p>

          <div className="mt-auto">
            <a
              className={buttonVariants({ variant: "primary", size: "sm" })}
              href={profile.liveApp.url}
              target="_blank"
              rel="noreferrer"
              aria-describedby="nexusos-demo-note"
            >
              <LogIn aria-hidden="true" />
              Open NexusOS Demo
            </a>
          </div>
        </Card>

        {ghost?.demo && (
          <Card className="flex flex-col gap-4 p-5" data-demo="Ghost Protocol">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-h3">{ghost.name}</h3>
                <Badge variant="info">{ghost.statusLabel}</Badge>
              </div>
              <p className="text-body text-muted-foreground">{ghost.summary}</p>
              <p className="text-machine">{ghost.stack.join("  ·  ")}</p>
            </div>

            <div className="flex flex-col items-start gap-1">
              <p className="eyebrow">Live web app</p>
              <a
                className="focus-ring break-all rounded-control text-sm font-medium text-primary hover:underline"
                href={ghost.demo.href}
                target="_blank"
                rel="noreferrer"
              >
                {ghost.demo.href}
              </a>
            </div>

            <p className="text-small text-muted-foreground" id="ghost-demo-note" data-testid="ghost-demo-note">
              Opens the deployed web client.
            </p>

            <div className="mt-auto flex flex-wrap gap-2">
              <a
                className={buttonVariants({ variant: "primary", size: "sm" })}
                href={ghost.demo.href}
                target="_blank"
                rel="noreferrer"
                aria-describedby="ghost-demo-note"
              >
                <ExternalLink aria-hidden="true" />
                Open Ghost Protocol Demo
              </a>
              {ghost.github && (
                <a
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                  href={ghost.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              )}
            </div>
          </Card>
        )}
      </div>
    </Section>
  );
}
