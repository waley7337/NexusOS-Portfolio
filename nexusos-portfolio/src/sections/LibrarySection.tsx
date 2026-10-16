import { useState } from "react";
import { FileText, Image as ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AssetPreviewDialog } from "~/components/AssetPreviewDialog";
import { ghostLibraryGroups, nexusLibraryGroups, type Asset, type GalleryGroup } from "~/data/assets";
import { usePortfolioLanguage } from "~/i18n/language";
import { sectionTitle } from "~/sections/registry";
import { Section } from "~/sections/Section";

function AssetGallery({ groups }: { groups: GalleryGroup[] }) {
  const [preview, setPreview] = useState<Asset | null>(null);
  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <div key={group.id} className="space-y-3" data-gallery-group={group.id}>
          <div className="space-y-1">
            <p className="eyebrow">{group.label}</p>
            <p className="text-small text-muted-foreground">{group.description}</p>
            <p className="text-machine">
              {group.assets.length} {group.assets.length === 1 ? "file" : "files"}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.assets.map((asset) => (
              <Card key={asset.id} interactive className="overflow-hidden">
                <button
                  type="button"
                  className="focus-ring block w-full text-left"
                  aria-label={asset.title}
                  data-asset={asset.id}
                  onClick={() => setPreview(asset)}
                >
                  {asset.preview && asset.status === "published" ? (
                    <img
                      src={asset.preview}
                      alt=""
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover object-top"
                    />
                  ) : (
                    <span className="flex aspect-[16/10] items-center justify-center bg-surface-1">
                      {asset.kind === "pdf" ? (
                        <FileText className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
                      ) : (
                        <ImageIcon className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
                      )}
                    </span>
                  )}
                  <span className="block space-y-1 p-3">
                    <span className="block text-sm font-medium">{asset.title}</span>
                    <span className="line-clamp-3 block text-small text-muted-foreground">{asset.description}</span>
                  </span>
                </button>
              </Card>
            ))}
          </div>
        </div>
      ))}
      <AssetPreviewDialog asset={preview} onClose={() => setPreview(null)} />
    </div>
  );
}

export function NexusOSLibrarySection() {
  const { language } = usePortfolioLanguage();
  return (
    <Section
      id="nexusos-library"
      title={sectionTitle("nexusos-library", language)}
      subtitle="NexusOS screenshots, interface images and case-study material. Open a file to inspect it."
    >
      <AssetGallery groups={nexusLibraryGroups} />
    </Section>
  );
}

export function GhostProtocolLibrarySection() {
  const { language } = usePortfolioLanguage();
  return (
    <Section
      id="ghost-protocol-library"
      title={sectionTitle("ghost-protocol-library", language)}
      subtitle="Every Ghost Protocol image: live client panels, interface shots, architecture diagrams and workflow artefacts."
    >
      <AssetGallery groups={ghostLibraryGroups} />
    </Section>
  );
}
