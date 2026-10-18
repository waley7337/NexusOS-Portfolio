import { useState } from "react";
import { ExternalLink, FileText, Github, LogIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Row, RowGroup } from "@/components/ui/structure";
import { caseStudy, interfaceShots, type Asset } from "~/data/assets";
import { nexusos } from "~/data/nexusos";
import { profile } from "~/data/profile";
import { NexusCompanyDemoCard } from "~/components/DemoAccessCards";
import { AssetPreviewDialog } from "~/components/AssetPreviewDialog";
import { ProjectProgress } from "~/components/ProjectProgress";
import { usePick, usePortfolioLanguage } from "~/i18n/language";
import { ui } from "~/i18n/ui";
import { sectionTitle } from "~/sections/registry";
import { Section } from "~/sections/Section";

export function NexusOSSection() {
  const { language } = usePortfolioLanguage();
  const t = usePick();
  const [preview, setPreview] = useState<Asset | null>(null);

  return (
    <Section id="nexusos" title={sectionTitle("nexusos", language)} subtitle={t(ui.featuredSubtitle)}>
      <Card className="p-5 sm:p-6" data-layout="horizontal" data-testid="nexusos-project-card">
        <div className="project-band">
          <div className="min-w-0 space-y-3">
            <h3 className="text-h2">NexusOS</h3>
            <p className="text-body text-muted-foreground">{t(nexusos.subtitle)}</p>
            {nexusos.summary.map((paragraph) => (
              <p key={paragraph.en.slice(0, 24)} className="text-body text-muted-foreground">
                {t(paragraph)}
              </p>
            ))}
            <p className="text-small text-foreground" data-testid="project-status">
              {t(nexusos.status.headline)}
            </p>
            <p className="text-small text-muted-foreground">
              <span className="text-machine mr-2">{t(ui.role)}</span>
              {t(nexusos.role)}
            </p>
          </div>
          <ProjectProgress id="nexusos" />
          <div className="flex min-w-0 flex-wrap content-start gap-2">
            <a
              className={buttonVariants({ variant: "primary", size: "sm" })}
              href={profile.liveApp.url}
              target="_blank"
              rel="noreferrer"
              title={t(profile.liveApp.note)}
              data-testid="live-app-link"
            >
              <LogIn aria-hidden="true" />
              {t(ui.liveAppSignIn)}
            </a>
            <a className={buttonVariants({ variant: "outline", size: "sm" })} href={caseStudy.src} target="_blank" rel="noreferrer">
              <FileText aria-hidden="true" />
              {t(ui.caseStudy)}
            </a>
            <a className={buttonVariants({ variant: "outline", size: "sm" })} href={profile.github} target="_blank" rel="noreferrer">
              <Github aria-hidden="true" />
              {t(ui.githubProfile)}
            </a>
          </div>
        </div>
        <RowGroup className="mt-6 border-t border-line-soft pt-2">
          <Row register={<Badge variant="success">{t(ui.implemented)}</Badge>}>
            <p className="text-small text-muted-foreground">{t(nexusos.status.implemented)}</p>
          </Row>
          <Row register={<Badge variant="warning">{t(ui.partial)}</Badge>}>
            <p className="text-small text-muted-foreground">{t(nexusos.status.partial)}</p>
          </Row>
          <Row register={<Badge>{t(ui.future)}</Badge>}>
            <p className="text-small text-muted-foreground">{t(nexusos.status.future)}</p>
          </Row>
          <Row register={<Badge variant="accent">{t(ui.liveApp)}</Badge>}>
            <a
              className="focus-ring rounded-control text-sm font-medium text-primary hover:underline"
              href={profile.liveApp.url}
              target="_blank"
              rel="noreferrer"
            >
              {profile.liveApp.host}/login
            </a>
            <a
              className={buttonVariants({ variant: "outline", size: "sm" })}
              href={profile.liveApp.url}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink aria-hidden="true" />
              {t(ui.openDemo)}
            </a>
            <p className="text-small text-muted-foreground" data-testid="live-app-note">
              {t(profile.liveApp.note)}
            </p>
          </Row>
        </RowGroup>
        <p className="text-machine mt-3">{t(nexusos.status.asOf)}</p>
      </Card>

      <NexusCompanyDemoCard idSuffix="-overview" />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {nexusos.highlights.map((h) => (
          <Card key={h.title.en} className="p-5">
            <p className="text-h4">{t(h.title)}</p>
            <p className="mt-2 text-small leading-relaxed text-muted-foreground">{t(h.body)}</p>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        <p className="eyebrow">{t(ui.interface)}</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {interfaceShots.map((shot) => (
            <Card key={shot.id} interactive className="overflow-hidden">
              <button type="button" className="focus-ring block w-full text-left" onClick={() => setPreview(shot)}>
                <img src={shot.preview} alt={t(shot.title)} loading="lazy" className="aspect-[16/10] w-full object-cover" />
                <span className="block p-3 text-sm font-medium">{t(shot.title)}</span>
              </button>
            </Card>
          ))}
        </div>
        <p className="text-small text-muted-foreground">{t(nexusos.interfaceNote)}</p>
      </div>

      <RowGroup className="border-y border-line-soft">
        {nexusos.stack.map((s) => (
          <Row key={s.label.en} register={t(s.label)}>
            <p className="text-sm">{t(s.value)}</p>
          </Row>
        ))}
      </RowGroup>

      <AssetPreviewDialog asset={preview} onClose={() => setPreview(null)} />
    </Section>
  );
}
