import { ArrowRight, FileText, FolderOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ticks } from "@/components/ui/structure";
import { approach, profile, stats } from "~/data/profile";
import { transparencyOpening } from "~/data/transparency";
import { usePortfolioLanguage } from "~/i18n/language";

export function Hero() {
  const { language } = usePortfolioLanguage();

  return (
    <section id="overview" aria-label="Overview" className="portfolio-section">
      <div className="relative space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">Portfolio · 2026</Badge>
          <Badge>AQUA / LAP Applikationsentwicklung – Coding</Badge>
        </div>
        <div className="space-y-3">
          <h1 className="text-display">{profile.name}</h1>
          <p className="text-h2 text-foreground/90">
            {profile.role} <span className="text-muted-foreground">— {profile.focus}</span>
          </p>
          <p className="text-machine">{profile.stack.join("  ·  ")}</p>
        </div>
        <p className="max-w-2xl text-body-lg text-muted-foreground">{profile.pitch}</p>
        <div className="flex flex-wrap gap-2">
          <a className={buttonVariants({ size: "lg" })} href="#nexusos">
            Explore NexusOS
            <ArrowRight aria-hidden="true" />
          </a>
          <a className={buttonVariants({ variant: "secondary", size: "lg" })} href="#cv">
            <FileText aria-hidden="true" />
            View CV
          </a>
          <a className={buttonVariants({ variant: "outline", size: "lg" })} href="#library">
            <FolderOpen aria-hidden="true" />
            Open the library
          </a>
        </div>
      </div>

      <Card className="p-5 sm:p-6">
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">{transparencyOpening[language].label}</span>
          {" — "}
          {transparencyOpening[language].body}
        </p>
      </Card>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label} className="portfolio-lift relative p-5">
              <Ticks />
              <p className="num font-mono text-[28px] font-semibold leading-none text-foreground">{s.value}</p>
              <p className="text-machine mt-3">{s.label}</p>
            </Card>
          ))}
        </div>
        <p className="text-machine">NexusOS figures, from the project documentation</p>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {approach.map((a) => (
          <Card key={a.title} className="p-5">
            <p className="text-h4">{a.title}</p>
            <p className="mt-2 text-small leading-relaxed text-muted-foreground">{a.body}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
