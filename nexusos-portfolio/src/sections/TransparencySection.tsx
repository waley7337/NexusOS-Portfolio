import { Card } from "@/components/ui/card";
import { transparencyDetail, transparencyTitle, transparencyWorkflowLink, verificationWorkflow } from "~/data/transparency";
import { usePortfolioLanguage } from "~/i18n/language";
import { Section } from "~/sections/Section";

export function TransparencySection() {
  const { language } = usePortfolioLanguage();
  const detail = transparencyDetail[language];

  return (
    <Section id="transparency" title={transparencyTitle[language]}>
      <div className="grid gap-3">
        {detail?.map((part) => (
          <Card key={part.heading} className="space-y-3 p-5 sm:p-6">
            <h3 className="text-h4">{part.heading}</h3>
            {part.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </Card>
        ))}
        {language === "en" ? (
          <Card className="p-5 sm:p-6">
            <h3 className="text-h4">{verificationWorkflow.title}</h3>
            <ol className="mt-5 space-y-5">
              {verificationWorkflow.paragraphs.map((paragraph, index) => (
                <li
                  key={paragraph}
                  className="grid gap-3 border-t border-line-soft pt-5 first:border-t-0 first:pt-0 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:items-start"
                >
                  <p className="text-machine text-primary">{String(index + 1).padStart(2, "0")}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{paragraph}</p>
                </li>
              ))}
            </ol>
          </Card>
        ) : null}
        <Card className="space-y-3 p-5 sm:p-6">
          <h3 className="text-h4">{language === "de" ? "Bezug zum Arbeitsablauf" : "Relationship to the workflow"}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{transparencyWorkflowLink[language]}</p>
        </Card>
      </div>
    </Section>
  );
}
