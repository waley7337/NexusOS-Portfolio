import { useEffect, useRef, useState } from "react";
import { Copy, ExternalLink, LogIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DEMO_ACCESS_NOTE,
  companyPortfolioLink,
  ghostDemoAccount,
  nexusDemoAccount,
  nexusGithub,
  nexusLiveApplication,
} from "~/data/demoAccess";
import { nexusos } from "~/data/nexusos";
import { profile } from "~/data/profile";
import { otherProjects } from "~/data/projects";
import { Section } from "~/sections/Section";

const ghost = otherProjects.find((project) => project.name === "Ghost Protocol");

async function copyText(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    /* Fall through to the same-page copy path. */
  }
  try {
    const area = document.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "0";
    area.style.left = "0";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.focus();
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

function CopyControl({
  value,
  idleLabel,
  project,
  kind,
}: {
  value: string;
  idleLabel: "Copy Email" | "Copy Password";
  project: string;
  kind: "email" | "password";
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    [],
  );

  const onCopy = async () => {
    const ok = await copyText(value);
    setState(ok ? "copied" : "failed");
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2000);
  };

  const feedback = state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "";
  const slug = project === "NexusOS" ? "nexusos" : "ghost";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        className={buttonVariants({ variant: "outline", size: "sm" })}
        aria-label={`${idleLabel} for ${project}`}
        data-testid={`${slug}-copy-${kind}`}
        onClick={() => void onCopy()}
      >
        <Copy aria-hidden="true" />
        {idleLabel}
      </button>
      <span
        role="status"
        aria-live="polite"
        className="text-small min-w-[4.5rem] text-foreground"
        data-testid={`${slug}-copy-${kind}-status`}
      >
        {feedback}
      </span>
    </div>
  );
}

function Credential({
  label,
  value,
  copyLabel,
  project,
  kind,
  testId,
}: {
  label: string;
  value: string;
  copyLabel: "Copy Email" | "Copy Password";
  project: string;
  kind: "email" | "password";
  testId: string;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-small font-medium text-foreground">{label}</p>
      <p className="text-machine-value break-all" data-testid={testId} translate="no">
        {value}
      </p>
      <CopyControl value={value} idleLabel={copyLabel} project={project} kind={kind} />
    </div>
  );
}

/**
 * Live demos with the company portfolio link and the demo accounts the
 * owner supplied for this page. NexusOS and Ghost Protocol stay on
 * separate cards.
 */
export function DemoAccessSection() {
  return (
    <Section
      id="demos"
      title="Live demos & access"
      subtitle="Verified destinations for the live NexusOS application and the Ghost Protocol web client."
    >
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="flex flex-col gap-4 p-5" data-demo="NexusOS">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-h3">NexusOS — Company Demo Access</h3>
              <Badge variant="accent">Live application</Badge>
            </div>
            <p className="text-body text-muted-foreground">{nexusos.subtitle}</p>
          </div>

          <div className="space-y-1">
            <p className="text-small font-medium text-foreground">Company-given URL:</p>
            <p className="text-machine-value break-all" data-testid="company-portfolio-id">
              {profile.companyPortfolioId}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-small font-medium text-foreground">Company portfolio link:</p>
            <a
              className="focus-ring break-all rounded-control text-sm font-medium text-primary hover:underline"
              href={companyPortfolioLink}
              target="_blank"
              rel="noreferrer"
              data-testid="company-portfolio-link"
            >
              {companyPortfolioLink}
            </a>
          </div>

          <div className="space-y-1">
            <p className="text-small font-medium text-foreground">Open live application:</p>
            <a
              className="focus-ring break-all rounded-control text-sm font-medium text-primary hover:underline"
              href={nexusLiveApplication}
              target="_blank"
              rel="noreferrer"
              data-testid="nexusos-live-application"
            >
              {nexusLiveApplication}
            </a>
          </div>

          <Credential
            label="Demo email:"
            value={nexusDemoAccount.email}
            copyLabel="Copy Email"
            project="NexusOS"
            kind="email"
            testId="nexusos-demo-email"
          />
          <Credential
            label="Demo password:"
            value={nexusDemoAccount.password}
            copyLabel="Copy Password"
            project="NexusOS"
            kind="password"
            testId="nexusos-demo-password"
          />

          <div className="mt-auto flex flex-wrap gap-2">
            <a
              className={buttonVariants({ variant: "primary", size: "sm" })}
              href={nexusLiveApplication}
              target="_blank"
              rel="noreferrer"
              aria-describedby="demo-access-note"
              data-testid="nexusos-open-live"
            >
              <LogIn aria-hidden="true" />
              Open live application
            </a>
            <a
              className={buttonVariants({ variant: "outline", size: "sm" })}
              href={nexusGithub}
              target="_blank"
              rel="noreferrer"
              data-testid="nexusos-github"
            >
              GitHub
            </a>
          </div>
        </Card>

        {ghost?.demo && (
          <Card className="flex flex-col gap-4 p-5" data-demo="Ghost Protocol">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-h3">Ghost Protocol — Company Demo Access</h3>
                <Badge variant="info">{ghost.statusLabel}</Badge>
              </div>
              <p className="text-body text-muted-foreground">{ghost.summary}</p>
              <p className="text-machine">{ghost.stack.join("  ·  ")}</p>
            </div>

            <div className="space-y-1">
              <p className="text-small font-medium text-foreground">Project demo:</p>
              <a
                className="focus-ring break-all rounded-control text-sm font-medium text-primary hover:underline"
                href={ghost.demo.href}
                target="_blank"
                rel="noreferrer"
                data-testid="ghost-live-application"
              >
                {ghost.demo.href}
              </a>
            </div>

            <Credential
              label="Demo email:"
              value={ghostDemoAccount.email}
              copyLabel="Copy Email"
              project="Ghost Protocol"
              kind="email"
              testId="ghost-demo-email"
            />
            <Credential
              label="Demo password:"
              value={ghostDemoAccount.password}
              copyLabel="Copy Password"
              project="Ghost Protocol"
              kind="password"
              testId="ghost-demo-password"
            />

            <div className="mt-auto flex flex-wrap gap-2">
              <a
                className={buttonVariants({ variant: "primary", size: "sm" })}
                href={ghost.demo.href}
                target="_blank"
                rel="noreferrer"
                aria-describedby="demo-access-note"
                data-testid="ghost-open-live"
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
      <p className="text-small text-muted-foreground" id="demo-access-note" data-testid="demo-access-footer">
        {DEMO_ACCESS_NOTE}
      </p>
    </Section>
  );
}
