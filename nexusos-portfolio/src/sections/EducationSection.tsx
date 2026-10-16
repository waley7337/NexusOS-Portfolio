import { FileText, GraduationCap, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Row, RowGroup } from "@/components/ui/structure";
import { degree } from "~/data/assets";
import { education } from "~/data/profile";
import { AssetActions } from "~/components/AssetPreviewDialog";
import { usePick, usePortfolioLanguage } from "~/i18n/language";
import { ui } from "~/i18n/ui";
import { sectionTitle } from "~/sections/registry";
import { Section } from "~/sections/Section";

export function EducationSection() {
  const { language } = usePortfolioLanguage();
  const t = usePick();
  const published = degree.status === "published";
  return (
    <Section id="education" title={sectionTitle("education", language)} subtitle={t(ui.educationSubtitle)}>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Card className="p-6">
          <div className="flex items-start gap-3">
            <GraduationCap className="mt-1 h-[var(--icon-md)] w-[var(--icon-md)] shrink-0 text-primary" aria-hidden="true" />
            <div className="min-w-0 space-y-1.5">
              <p className="eyebrow">{education.institution}</p>
              <h3 className="text-h2">
                {education.degree} — {education.field}
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                <Badge variant="accent">{education.honours}</Badge>
                <Badge>
                  {t(ui.academicYear)} {education.academicYear}
                </Badge>
                <Badge>
                  {t(ui.awarded)} {t(ui.awardedDate)}
                </Badge>
              </div>
            </div>
          </div>
          <RowGroup className="mt-6 border-t border-line-soft">
            <Row register={t(ui.cvWording)}>
              <p className="text-sm">{education.cvWording}</p>
            </Row>
            <Row register={education.further.years}>
              <p className="text-sm">{education.further.institution}</p>
              <p className="text-small text-muted-foreground">
                {education.further.detail} {t(ui.fromTheCv)}
              </p>
            </Row>
          </RowGroup>
        </Card>

        {published ? (
          <Card className="portfolio-lift flex h-fit flex-col gap-3 p-6" data-testid="degree-download">
            <FileText className="h-[var(--icon-md)] w-[var(--icon-md)] text-muted-foreground" aria-hidden="true" />
            <div className="space-y-1.5">
              <p className="text-h4">{t(ui.degreeCertificate)}</p>
              <div className="flex flex-wrap gap-2">
                <Badge>{t(degree.meta)}</Badge>
                {degree.label && <Badge variant="warning">{t(degree.label)}</Badge>}
              </div>
            </div>
            <AssetActions asset={degree} />
          </Card>
        ) : (
          <Card className="portfolio-lift flex h-fit flex-col gap-3 border-dashed p-6" data-testid="degree-on-request">
            <Lock className="h-[var(--icon-md)] w-[var(--icon-md)] text-muted-foreground" aria-hidden="true" />
            <p className="text-h4">{t(ui.degreeOnRequest)}</p>
            <p className="text-small text-muted-foreground">{degree.note ? t(degree.note) : null}</p>
            <AssetActions asset={degree} />
          </Card>
        )}
      </div>
    </Section>
  );
}
