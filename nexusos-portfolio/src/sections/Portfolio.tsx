import { Hero } from "~/sections/Hero";
import { NexusOSSection } from "~/sections/NexusOSSection";
import { WorkflowSection } from "~/sections/WorkflowSection";
import { ArchitectureSection } from "~/sections/ArchitectureSection";
import { LibrarySection } from "~/sections/LibrarySection";
import { CvSection } from "~/sections/CvSection";
import { EducationSection } from "~/sections/EducationSection";
import { ProjectsSection } from "~/sections/ProjectsSection";
import { DemoAccessSection } from "~/sections/DemoAccessSection";
import { ContactSection } from "~/sections/ContactSection";

export function Portfolio() {
  return (
    <div className="portfolio-sheet">
      <Hero />
      <CvSection />
      <EducationSection />
      <NexusOSSection />
      <WorkflowSection />
      <ArchitectureSection />
      <LibrarySection />
      <ProjectsSection />
      <DemoAccessSection />
      <ContactSection />
    </div>
  );
}
