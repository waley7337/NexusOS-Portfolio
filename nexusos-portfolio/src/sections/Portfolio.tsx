import { ObjectiveSection } from "~/sections/ObjectiveSection";
import { Hero } from "~/sections/Hero";
import { TransparencySection } from "~/sections/TransparencySection";
import { NexusOSSection } from "~/sections/NexusOSSection";
import { WorkflowSection } from "~/sections/WorkflowSection";
import { ArchitectureSection } from "~/sections/ArchitectureSection";
import { NexusOSLibrarySection, GhostProtocolLibrarySection } from "~/sections/LibrarySection";
import { GhostProtocolSection } from "~/sections/GhostProtocolSection";
import { GhostProtocolWorkflowSection } from "~/sections/GhostProtocolWorkflowSection";
import { GhostProtocolArchitectureSection } from "~/sections/GhostProtocolArchitectureSection";
import { CvSection } from "~/sections/CvSection";
import { EducationSection } from "~/sections/EducationSection";
import { ProjectsSection } from "~/sections/ProjectsSection";
import { DemoAccessSection } from "~/sections/DemoAccessSection";
import { ContactSection } from "~/sections/ContactSection";

export function Portfolio() {
  return (
    <div className="portfolio-sheet">
      <ObjectiveSection />
      <Hero />
      <TransparencySection />
      <CvSection />
      <EducationSection />
      <NexusOSSection />
      <WorkflowSection />
      <ArchitectureSection />
      <NexusOSLibrarySection />
      <GhostProtocolSection />
      <GhostProtocolWorkflowSection />
      <GhostProtocolArchitectureSection />
      <GhostProtocolLibrarySection />
      <ProjectsSection />
      <DemoAccessSection />
      <ContactSection />
    </div>
  );
}
