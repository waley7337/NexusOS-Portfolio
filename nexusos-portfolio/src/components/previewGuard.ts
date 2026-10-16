import type { DragEvent, MouseEvent } from "react";
import type { Asset } from "~/data/assets";

/** Architecture diagrams and Ghost Protocol carousel shots. Interface screenshots do not. */
const ARCHITECTURE_IMAGE = /\/images\/(architecture|security|multi-tenancy|ghost-protocol)\//;

/**
 * Protected document previews (PDFs) and architecture screenshots.
 * These also block image drag. The context menu and text selection
 * are disabled for the whole page, not only these assets.
 */
export function shouldGuardPreview(asset: Pick<Asset, "kind" | "src">): boolean {
  return asset.kind === "pdf" || ARCHITECTURE_IMAGE.test(asset.src);
}

export function blockPreviewGesture(event: MouseEvent | DragEvent) {
  event.preventDefault();
}

/** Closes the browser menu (Save image, copy, and the rest) for this page. */
export function blockDocumentContextMenu(event: Event) {
  event.preventDefault();
}
