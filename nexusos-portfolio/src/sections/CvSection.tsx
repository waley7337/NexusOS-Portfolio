import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cv } from "~/data/assets";
import { AssetActions } from "~/components/AssetPreviewDialog";
import { DocumentPreview } from "~/components/DocumentPreview";
import { usePick, usePortfolioLanguage } from "~/i18n/language";
import { ui } from "~/i18n/ui";
import { sectionTitle } from "~/sections/registry";
import { Section } from "~/sections/Section";

export function CvSection() {
  const { language } = usePortfolioLanguage();
  const t = usePick();
  return (
    <Section id="cv" title={sectionTitle("cv", language)} subtitle={t(ui.cvSubtitle)}>
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
        <DocumentPreview asset={cv} />
        <Card className="h-fit space-y-4 p-5">
          <div className="space-y-1.5">
            <p className="text-h3">{t(cv.title)}</p>
            <p className="text-small text-muted-foreground">{t(cv.description)}</p>
          </div>
          <Badge>{t(cv.meta)}</Badge>
          <AssetActions asset={cv} />
          <p className="text-small text-muted-foreground">{t(ui.cvNote)}</p>
        </Card>
      </div>
    </Section>
  );
}
