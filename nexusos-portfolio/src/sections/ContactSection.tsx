import { AppWindow, Github, LogIn, Mail, MapPin, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Row, RowGroup } from "@/components/ui/structure";
import { cn } from "@/lib/utils";
import { profile } from "~/data/profile";
import { otherProjects } from "~/data/projects";
import { usePick, usePortfolioLanguage } from "~/i18n/language";
import { ui } from "~/i18n/ui";
import { Section } from "~/sections/Section";
import { sectionTitle } from "~/sections/registry";

const ghostProtocolHref = otherProjects.find((project) => project.name === "Ghost Protocol")?.demo?.href;

function ContactBody() {
  const t = usePick();
  return (
    <>
      <RowGroup>
        <Row marker={<Mail className="h-4 w-4" />} register={t(ui.email)}>
          <a className="focus-ring rounded-control text-sm hover:text-primary" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </Row>
        <Row marker={<Phone className="h-4 w-4" />} register={t(ui.phone)}>
          <a className="focus-ring rounded-control text-sm hover:text-primary" href={`tel:${profile.phone.replace(/\s/g, "")}`}>
            {profile.phone}
          </a>
        </Row>
        <Row marker={<Github className="h-4 w-4" />} register={t(ui.github)}>
          <a className="focus-ring rounded-control text-sm hover:text-primary" href={profile.github} target="_blank" rel="noreferrer">
            github.com/waley7337
          </a>
        </Row>
        <Row marker={<LogIn className="h-4 w-4" />} register={t(ui.liveApp)}>
          <a className="focus-ring rounded-control text-sm hover:text-primary" href={profile.liveApp.url} target="_blank" rel="noreferrer">
            {profile.liveApp.host}/login
          </a>
          <p className="text-small text-muted-foreground">{t(profile.liveApp.note)}</p>
        </Row>
        {ghostProtocolHref && (
          <Row marker={<AppWindow className="h-4 w-4" />} register="Ghost Protocol">
            <a className="focus-ring rounded-control text-sm hover:text-primary" href={ghostProtocolHref} target="_blank" rel="noreferrer">
              Ghost Protocol
            </a>
          </Row>
        )}
        <Row marker={<MapPin className="h-4 w-4" />} register={t(ui.location)}>
          <p className="text-sm">{t(profile.location)}</p>
          <p className="text-small text-muted-foreground">{t(profile.availability)}</p>
        </Row>
      </RowGroup>
      <a className={cn(buttonVariants({ size: "lg" }), "contact-cta")} href={`mailto:${profile.email}`}>
        <Mail aria-hidden="true" />
        {t(ui.getInTouch)}
      </a>
    </>
  );
}

function ContactNote() {
  const t = usePick();
  return <p className="contact-note text-machine">{t(ui.builtOnDesignSystemLong)}</p>;
}

export function ContactSection() {
  const { language } = usePortfolioLanguage();
  const t = usePick();
  return (
    <Section id="contact" title={sectionTitle("contact", language)} subtitle={t(ui.contactSubtitle)}>
      <Card className="p-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <ContactBody />
        </div>
      </Card>
      <ContactNote />
    </Section>
  );
}
