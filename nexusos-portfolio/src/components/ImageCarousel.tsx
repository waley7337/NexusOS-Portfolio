import { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Asset } from "~/data/assets";

/**
 * A single-item image carousel for the large Ghost Protocol diagrams. One
 * slide shows at a time, letterboxed so portrait and landscape artefacts share
 * one stable frame; clicking a slide opens the full-resolution preview.
 */
export function ImageCarousel({
  items,
  label,
  onOpen,
}: {
  items: Asset[];
  label: string;
  onOpen: (asset: Asset) => void;
}) {
  const [index, setIndex] = useState(0);
  if (items.length === 0) return null;
  const count = items.length;
  const current = items[index];
  const go = (next: number) => setIndex((next + count) % count);

  return (
    <div className="space-y-3" role="group" aria-roledescription="carousel" aria-label={label}>
      <Card className="relative overflow-hidden">
        <button
          type="button"
          onClick={() => onOpen(current)}
          className="focus-ring group relative block w-full bg-surface-1"
          aria-label={`Open ${current.title} at full size`}
        >
          <img
            src={current.preview ?? current.src}
            alt={current.title}
            loading="lazy"
            className="mx-auto block h-[clamp(18rem,56vh,40rem)] w-full object-contain"
          />
          <span className="absolute right-3 top-3 rounded-control border border-line bg-surface-2/90 p-1.5 opacity-0 transition-opacity duration-fast group-hover:opacity-100 group-focus-visible:opacity-100">
            <Maximize2 className="h-4 w-4" aria-hidden="true" />
          </span>
        </button>

        {count > 1 && (
          <>
            <CarouselArrow side="left" onClick={() => go(index - 1)} />
            <CarouselArrow side="right" onClick={() => go(index + 1)} />
          </>
        )}
      </Card>

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-h4">{current.title}</h3>
            <Badge>{current.meta}</Badge>
          </div>
          <p className="text-small leading-relaxed text-muted-foreground">{current.description}</p>
        </div>
        {count > 1 && <span className="text-machine shrink-0 pt-1">{index + 1} / {count}</span>}
      </div>

      {count > 1 && (
        <div className="flex flex-wrap gap-1.5">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-current={i === index}
              aria-label={`Show ${item.title}`}
              onClick={() => setIndex(i)}
              className={cn(
                "focus-ring h-1.5 rounded-full transition-all duration-fast",
                i === index ? "w-6 bg-primary" : "w-3 bg-muted-foreground/35 hover:bg-muted-foreground",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CarouselArrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous" : "Next"}
      className={cn(
        "focus-ring absolute top-1/2 -translate-y-1/2 rounded-full border border-line bg-surface-2/90 p-2 text-foreground transition-colors duration-fast hover:bg-surface-3",
        side === "left" ? "left-3" : "right-3",
      )}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
