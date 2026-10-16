import { useState } from "react";
import { Card } from "@/components/ui/card";
import { AssetPreviewDialog } from "~/components/AssetPreviewDialog";
import { FolderExplorer } from "~/components/FolderExplorer";
import {
  ghostLibraryFolders,
  nexusCaseStudyPreviews,
  nexusLibraryFolders,
  type Asset,
} from "~/data/assets";
import { usePick, usePortfolioLanguage } from "~/i18n/language";
import { ui } from "~/i18n/ui";
import { sectionTitle } from "~/sections/registry";
import { Section } from "~/sections/Section";

function CaseStudyPreviews({ assets }: { assets: Asset[] }) {
  const t = usePick();
  const [preview, setPreview] = useState<Asset | null>(null);
  return (
    <div className="space-y-3" data-testid="nexus-case-study">
      <p className="eyebrow">{t(ui.caseStudy)}</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {assets.map((asset) => (
          <Card key={asset.id} interactive className="overflow-hidden">
            <button
              type="button"
              className="focus-ring block w-full text-left"
              aria-label={t(asset.title)}
              data-asset={asset.id}
              onClick={() => setPreview(asset)}
            >
              {asset.preview ? (
                <img src={asset.preview} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
              ) : null}
              <span className="block space-y-1 p-3">
                <span className="block text-sm font-medium">{t(asset.title)}</span>
                <span className="line-clamp-3 block text-small text-muted-foreground">{t(asset.description)}</span>
              </span>
            </button>
          </Card>
        ))}
      </div>
      <AssetPreviewDialog asset={preview} onClose={() => setPreview(null)} />
    </div>
  );
}

export function NexusOSLibrarySection() {
  const { language } = usePortfolioLanguage();
  const t = usePick();
  return (
    <Section
      id="nexusos-library"
      title={sectionTitle("nexusos-library", language)}
      subtitle={t(ui.nexusLibrarySubtitle)}
    >
      <FolderExplorer folders={nexusLibraryFolders} />
      <CaseStudyPreviews assets={nexusCaseStudyPreviews} />
    </Section>
  );
}

export function GhostProtocolLibrarySection() {
  const { language } = usePortfolioLanguage();
  const t = usePick();
  return (
    <Section
      id="ghost-protocol-library"
      title={sectionTitle("ghost-protocol-library", language)}
      subtitle={t(ui.ghostLibrarySubtitle)}
    >
      <FolderExplorer folders={ghostLibraryFolders} />
    </Section>
  );
}
