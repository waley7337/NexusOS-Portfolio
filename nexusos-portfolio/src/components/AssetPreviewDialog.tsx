import { Download, ExternalLink, Lock, Mail, ShieldAlert } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cv, type Asset } from "~/data/assets";
import { profile } from "~/data/profile";
import { blockPreviewGesture, shouldGuardPreview } from "~/components/previewGuard";
import { usePick } from "~/i18n/language";
import { ui } from "~/i18n/ui";

/** Preview for any registry asset: image, PDF, or a withheld placeholder. */
export function AssetPreviewDialog({ asset, onClose }: { asset: Asset | null; onClose: () => void }) {
  const t = usePick();
  return (
    <Dialog open={asset !== null} onOpenChange={(open) => !open && onClose()}>
      {asset && (
        <DialogContent className="flex max-h-[92dvh] max-w-5xl flex-col gap-4 p-5 sm:p-6">
          <div className="space-y-1.5 pr-10">
            <div className="flex flex-wrap items-center gap-2">
              <DialogPrimitive.Title className="text-h3">{t(asset.title)}</DialogPrimitive.Title>
              <Badge>{t(asset.meta)}</Badge>
              {asset.label && <Badge variant={asset.notice ? "warning" : "accent"}>{t(asset.label)}</Badge>}
            </div>
            <DialogPrimitive.Description className="text-sm text-muted-foreground">
              {t(asset.description)}
            </DialogPrimitive.Description>
            {asset.status === "published" && asset.note && (
              <p className="text-small text-muted-foreground">{t(asset.note)}</p>
            )}
          </div>

          {!asset.notice && (
            <div
              className={cn(
                "min-h-0 flex-1 overflow-auto rounded-plane border border-line-soft bg-surface-1",
                shouldGuardPreview(asset) && "preview-guard",
              )}
              data-preview-guard={shouldGuardPreview(asset) ? "true" : undefined}
              onContextMenu={shouldGuardPreview(asset) ? blockPreviewGesture : undefined}
              onDragStart={shouldGuardPreview(asset) ? blockPreviewGesture : undefined}
            >
              <AssetBody asset={asset} />
            </div>
          )}

          <AssetActions asset={asset} />
        </DialogContent>
      )}
    </Dialog>
  );
}

function AssetBody({ asset }: { asset: Asset }) {
  const t = usePick();
  if (asset.status === "withheld") {
    return (
      <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
        <Lock className="h-[var(--icon-md)] w-[var(--icon-md)] text-muted-foreground" aria-hidden="true" />
        <p className="text-h4">{t(ui.availableOnRequest)}</p>
        <p className="max-w-md text-small text-muted-foreground">{asset.note ? t(asset.note) : null}</p>
      </div>
    );
  }
  if (asset.kind === "image") {
    return (
      <img
        src={asset.preview ?? asset.src}
        alt={t(asset.title)}
        draggable={shouldGuardPreview(asset) ? false : undefined}
        className="block h-auto w-full"
      />
    );
  }
  return (
    <>
      <object data={asset.src} type="application/pdf" className="hidden h-[68dvh] w-full md:block" aria-label={t(asset.title)}>
        {asset.preview && (
          <img src={asset.preview} alt={`${t(asset.title)} — ${t(ui.firstPage)}`} className="mx-auto block h-auto max-w-full" />
        )}
      </object>
      {asset.preview && (
        <img src={asset.preview} alt={`${t(asset.title)} — ${t(ui.firstPage)}`} className="mx-auto block h-auto max-w-full md:hidden" />
      )}
    </>
  );
}

export function AssetActions({ asset, className }: { asset: Asset; className?: string }) {
  const t = usePick();
  if (asset.status === "withheld") {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        <a
          className={buttonVariants({ variant: "secondary" })}
          href={`mailto:${profile.email}?subject=${encodeURIComponent(`${t(ui.requestSubject)}: ${t(asset.title)}`)}`}
        >
          <Mail aria-hidden="true" />
          {t(ui.requestByEmail)}
        </a>
      </div>
    );
  }
  const filename = asset.src.split("/").pop();
  const noticeId = asset.notice ? `${asset.id}-notice` : undefined;
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {asset.notice && (
        <p
          id={noticeId}
          role="note"
          data-testid="privacy-notice"
          className="flex gap-2 rounded-control border border-warning/40 bg-warning/10 p-3 text-small text-foreground"
        >
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
          <span>{asset.notice ? t(asset.notice) : null}</span>
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        <a
          className={buttonVariants({ variant: "primary" })}
          href={asset.src}
          target="_blank"
          rel="noreferrer"
          aria-describedby={noticeId}
        >
          <ExternalLink aria-hidden="true" />
          {asset.kind === "image" ? t(ui.openFullResolution) : t(ui.viewPdf)}
        </a>
        {asset.id === cv.id && (
          <a className={buttonVariants({ variant: "secondary" })} href={asset.src} download={filename} aria-describedby={noticeId}>
            <Download aria-hidden="true" />
            {t(ui.download)}
          </a>
        )}
      </div>
    </div>
  );
}
