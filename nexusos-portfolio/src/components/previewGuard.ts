import type { DragEvent, MouseEvent } from "react";
import type { Asset } from "~/data/assets";

/** Architecture diagrams live in these image folders. Interface screenshots do not. */
const ARCHITECTURE_IMAGE = /\/images\/(architecture|security|multi-tenancy)\//;

/**
 * Protected document previews (PDFs) and architecture screenshots.
 * Product interface screenshots and ordinary page text stay selectable.
 */
export function shouldGuardPreview(asset: Pick<Asset, "kind" | "src">): boolean {
  return asset.kind === "pdf" || ARCHITECTURE_IMAGE.test(asset.src);
}

export function blockPreviewGesture(event: MouseEvent | DragEvent) {
  event.preventDefault();
}
