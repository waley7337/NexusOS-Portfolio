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
import { usePick, usePortfolioLanguage } from "~/i18n/language";
import { copyForName, ui } from "~/i18n/ui";

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
  idleLabel: string;
  project: string;
  kind: "email" | "password";
  idSuffix: string;
}) {
  const { language } = usePortfolioLanguage();
  const t = usePick();
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

  const feedback = state === "copied" ? t(ui.copied) : state === "failed" ? t(ui.copyFailed) : "";
  const slug = project === "NexusOS" ? "nexusos" : "ghost";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        className={buttonVariants({ variant: "outline", size: "sm" })}
        aria-label={copyForName(kind, project, language)}
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
  copyLabel: string;
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
  const t = usePick();
  return (
    <Card className="flex flex-col gap-4 p-5" data-demo="NexusOS">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-h3">{t(ui.nexusDemoHeading)}</h3>
          <Badge variant="accent">{t(ui.liveApplication)}</Badge>
        </div>
        <p className="text-body text-muted-foreground">{t(nexusos.subtitle)}</p>
      </div>

      <div className="space-y-1">
        <p className="text-small font-medium text-foreground">{t(ui.companyUrl)}</p>
        <p className="text-machine-value break-all" data-testid={`company-portfolio-id${idSuffix}`}>
          {profile.companyPortfolioId}
        </p>
      </div>

      <div className="space-y-1">
        <p className="text-small font-medium text-foreground">{t(ui.companyPortfolioLink)}</p>
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
        <p className="text-small font-medium text-foreground">{t(ui.openLiveApplicationLabel)}</p>
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
        label={t(ui.demoEmail)}
        value={nexusDemoAccount.email}
        copyLabel={t(ui.copyEmail)}
        project="NexusOS"
        kind="email"
        testId={`nexusos-demo-email${idSuffix}`}
        idSuffix={idSuffix}
      />
      <Credential
        label={t(ui.demoPassword)}
        value={nexusDemoAccount.password}
        copyLabel={t(ui.copyPassword)}
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
          {t(ui.openLiveApplication)}
        </a>
        <a
          className={buttonVariants({ variant: "outline", size: "sm" })}
          href={nexusGithub}
          target="_blank"
          rel="noreferrer"
          data-testid={`nexusos-github${idSuffix}`}
        >
          {t(ui.github)}
        </a>
      </div>
    </Card>
  );
}

export function GhostCompanyDemoCard({ idSuffix = "" }: { idSuffix?: string }) {
  const t = usePick();
  if (!ghost?.demo) return null;
  return (
    <Card className="flex flex-col gap-4 p-5" data-demo="Ghost Protocol">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-h3">{t(ui.ghostDemoHeading)}</h3>
          <Badge variant="info">{t(ghost.statusLabel)}</Badge>
        </div>
        <p className="text-body text-muted-foreground">{t(ghost.summary)}</p>
        <p className="text-machine">{ghost.stack.join("  ·  ")}</p>
      </div>

      <div className="space-y-1">
        <p className="text-small font-medium text-foreground">{t(ui.projectDemo)}</p>
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
        label={t(ui.demoEmail)}
        value={ghostDemoAccount.email}
        copyLabel={t(ui.copyEmail)}
        project="Ghost Protocol"
        kind="email"
        testId={`ghost-demo-email${idSuffix}`}
        idSuffix={idSuffix}
      />
      <Credential
        label={t(ui.demoPassword)}
        value={ghostDemoAccount.password}
        copyLabel={t(ui.copyPassword)}
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
          {t(ui.openGhostDemo)}
        </a>
        {ghost.github && (
          <a className={buttonVariants({ variant: "outline", size: "sm" })} href={ghost.github} target="_blank" rel="noreferrer">
            {t(ui.github)}
          </a>
        )}
      </div>
    </Card>
  );
}
