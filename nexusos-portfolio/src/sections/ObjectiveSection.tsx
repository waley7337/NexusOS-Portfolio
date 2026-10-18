import { Card } from "@/components/ui/card";
import { objectiveParagraphs } from "~/data/objective";
import { pick } from "~/i18n/l10n";
import { usePortfolioLanguage } from "~/i18n/language";
import { sectionTitle } from "~/sections/registry";
import { Section } from "~/sections/Section";

export function ObjectiveSection() {
  const { language } = usePortfolioLanguage();
  return (
    <Section id="objective" title={sectionTitle("objective", language)}>
      <Card className="space-y-3 p-5 sm:p-6">
        {pick(objectiveParagraphs, language).map((paragraph) => (
          <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </Card>
    </Section>
  );
}
