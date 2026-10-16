import { transparencyDetail, transparencyTitle } from "~/data/transparency";
import { usePortfolioLanguage } from "~/i18n/language";
import { Section } from "~/sections/Section";

export function TransparencySection() {
  const { language } = usePortfolioLanguage();
  const detail = transparencyDetail[language];

  return (
    <Section id="transparency" title={transparencyTitle[language]}>
      {detail ? (
        <div className="max-w-3xl space-y-8">
          {detail.map((part) => (
            <div key={part.heading} className="space-y-3">
              <h3 className="text-h4">{part.heading}</h3>
              {part.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </Section>
  );
}
