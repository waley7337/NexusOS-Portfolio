import { createContext, useContext } from "react";
import { AppWindow, Github, LogIn, Mail, MapPin, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Row, RowGroup } from "@/components/ui/structure";
import { cn } from "@/lib/utils";
import { profile } from "~/data/profile";
import { otherProjects } from "~/data/projects";
import { Section } from "~/sections/Section";

const ghostProtocolHref = otherProjects.find((project) => project.name === "Ghost Protocol")?.demo?.href;

/** Opens the floating contact window. The shell provides the real handler. */
export const ContactPreviewRequest = createContext<() => void>(() => {});

export function ContactBody() {
  return (
    <>
      <RowGroup>
        <Row marker={<Mail className="h-4 w-4" />} register="Email">
          <a className="focus-ring rounded-control text-sm hover:text-primary" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </Row>
        <Row marker={<Phone className="h-4 w-4" />} register="Phone">
          <a className="focus-ring rounded-control text-sm hover:text-primary" href={`tel:${profile.phone.replace(/\s/g, "")}`}>
            {profile.phone}
          </a>
        </Row>
        <Row marker={<Github className="h-4 w-4" />} register="GitHub">
          <a className="focus-ring rounded-control text-sm hover:text-primary" href={profile.github} target="_blank" rel="noreferrer">
            github.com/waley7337
          </a>
        </Row>
        <Row marker={<LogIn className="h-4 w-4" />} register="Live app">
          <a className="focus-ring rounded-control text-sm hover:text-primary" href={profile.liveApp.url} target="_blank" rel="noreferrer">
            {profile.liveApp.host}/login
          </a>
          <p className="text-small text-muted-foreground">{profile.liveApp.note}</p>
        </Row>
        {ghostProtocolHref && (
          <Row marker={<AppWindow className="h-4 w-4" />} register="Ghost Protocol">
            <a className="focus-ring rounded-control text-sm hover:text-primary" href={ghostProtocolHref} target="_blank" rel="noreferrer">
              Ghost Protocol
            </a>
          </Row>
        )}
        <Row marker={<MapPin className="h-4 w-4" />} register="Location">
          <p className="text-sm">{profile.location}</p>
          <p className="text-small text-muted-foreground">{profile.availability}</p>
        </Row>
      </RowGroup>
      <a className={cn(buttonVariants({ size: "lg" }), "contact-cta")} href={`mailto:${profile.email}`}>
        <Mail aria-hidden="true" />
        Get in touch
      </a>
    </>
  );
}

export function ContactNote() {
  return (
    <p className="contact-note text-machine">
      Built on the NexusOS design system — tokens, SpaceField and Starfield compiled from the NexusOS frontend
    </p>
  );
}

export function ContactSection() {
  const openPreview = useContext(ContactPreviewRequest);
  return (
    <Section
      id="contact"
      className="contact-stage"
      title="Contact"
      subtitle="Looking for an AQUA placement in application development."
    >
      <Card
        data-testid="contact-card"
        className="contact-panel contact-panel-source p-6"
        onClick={(event) => {
          const target = event.target;
          if (!(target instanceof Element) || target.closest("a, button")) return;
          openPreview();
        }}
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <ContactBody />
        </div>
      </Card>
      <ContactNote />
    </Section>
  );
}
