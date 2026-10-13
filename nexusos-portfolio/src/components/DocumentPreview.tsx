import { Card } from "@/components/ui/card";
import type { Asset } from "~/data/assets";
import { blockPreviewGesture } from "~/components/previewGuard";

/**
 * Inline preview of a real PDF. Desktop browsers render the PDF itself;
 * mobile browsers mostly cannot embed PDFs, so they get the first page
 * rendered from the same file.
 */
export function DocumentPreview({ asset }: { asset: Asset }) {
  return (
    <Card
      className="preview-guard overflow-hidden"
      data-testid={`preview-${asset.id}`}
      data-preview-guard="true"
      onContextMenu={blockPreviewGesture}
      onDragStart={blockPreviewGesture}
    >
      <object
        data={`${asset.src}#view=FitH`}
        type="application/pdf"
        aria-label={`${asset.title} (PDF preview)`}
        className="hidden h-[78vh] max-h-[1000px] w-full bg-white md:block"
      >
        {asset.preview && (
          <img src={asset.preview} alt={`${asset.title} — page 1`} draggable={false} className="block h-auto w-full" />
        )}
      </object>
      {asset.preview && (
        <img
          src={asset.preview}
          alt={`${asset.title} — page 1`}
          loading="lazy"
          draggable={false}
          className="block h-auto w-full md:hidden"
        />
      )}
    </Card>
  );
}
