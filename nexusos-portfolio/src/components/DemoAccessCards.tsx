import { useEffect, useRef, useState } from "react";
import { Copy, ExternalLink, LogIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  companyPortfolioLink,
  ghostDemoAccount,
  nexusDemoAccount,
  nexusGithub,
  nexusLiveApplication,
} from "~/data/demoAccess";
import { nexusos } from "~/data/nexusos";
import { profile } from "~/data/profile";
import { otherProjects } from "~/data/projects";

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
  idSuffix,
}: {
  value: string;
  idleLabel: "Copy Email" | "Copy Password";
  project: string;
  kind: "email" | "password";
  idSuffix: string;
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
        data-testid={`${slug}-copy-${kind}${idSuffix}`}
        onClick={() => void onCopy()}
      >
        <Copy aria-hidden="true" />
        {idleLabel}
      </button>
      <span
        role="status"
        aria-live="polite"
        className="text-small min-w-[4.5rem] text-foreground"
        data-testid={`${slug}-copy-${kind}-status${idSuffix}`}
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
  idSuffix,
}: {
  label: string;
  value: string;
  copyLabel: "Copy Email" | "Copy Password";
  project: string;
  kind: "email" | "password";
  testId: string;
  idSuffix: string;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-small font-medium text-foreground">{label}</p>
      <p className="text-machine-value break-all" data-testid={testId} translate="no">
        {value}
      </p>
      <CopyControl value={value} idleLabel={copyLabel} project={project} kind={kind} idSuffix={idSuffix} />
    </div>
  );
}

/**
 * Employer demo card. `idSuffix` keeps a second copy (on a project overview)
 * from reusing the test ids of the global Demo access section.
 * Credentials come from demoAccess — this module does not declare them.
 */
export function NexusCompanyDemoCard({ idSuffix = "" }: { idSuffix?: string }) {
  return (
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
        <p className="text-machine-value break-all" data-testid={`company-portfolio-id${idSuffix}`}>
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
          data-testid={`company-portfolio-link${idSuffix}`}
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
          data-testid={`nexusos-live-application${idSuffix}`}
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
        testId={`nexusos-demo-email${idSuffix}`}
        idSuffix={idSuffix}
      />
      <Credential
        label="Demo password:"
        value={nexusDemoAccount.password}
        copyLabel="Copy Password"
        project="NexusOS"
        kind="password"
        testId={`nexusos-demo-password${idSuffix}`}
        idSuffix={idSuffix}
      />

      <div className="mt-auto flex flex-wrap gap-2">
        <a
          className={buttonVariants({ variant: "primary", size: "sm" })}
          href={nexusLiveApplication}
          target="_blank"
          rel="noreferrer"
          aria-describedby="demo-access-note"
          data-testid={`nexusos-open-live${idSuffix}`}
        >
          <LogIn aria-hidden="true" />
          Open live application
        </a>
        <a
          className={buttonVariants({ variant: "outline", size: "sm" })}
          href={nexusGithub}
          target="_blank"
          rel="noreferrer"
          data-testid={`nexusos-github${idSuffix}`}
        >
          GitHub
        </a>
      </div>
    </Card>
  );
}

export function GhostCompanyDemoCard({ idSuffix = "" }: { idSuffix?: string }) {
  if (!ghost?.demo) return null;
  return (
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
          data-testid={`ghost-live-application${idSuffix}`}
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
        testId={`ghost-demo-email${idSuffix}`}
        idSuffix={idSuffix}
      />
      <Credential
        label="Demo password:"
        value={ghostDemoAccount.password}
        copyLabel="Copy Password"
        project="Ghost Protocol"
        kind="password"
        testId={`ghost-demo-password${idSuffix}`}
        idSuffix={idSuffix}
      />

      <div className="mt-auto flex flex-wrap gap-2">
        <a
          className={buttonVariants({ variant: "primary", size: "sm" })}
          href={ghost.demo.href}
          target="_blank"
          rel="noreferrer"
          aria-describedby="demo-access-note"
          data-testid={`ghost-open-live${idSuffix}`}
        >
          <ExternalLink aria-hidden="true" />
          Open Ghost Protocol Demo
        </a>
        {ghost.github && (
          <a className={buttonVariants({ variant: "outline", size: "sm" })} href={ghost.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        )}
      </div>
    </Card>
  );
}
