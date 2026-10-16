import { cn } from "@/lib/utils";
import { usePortfolioLanguage, type PortfolioLanguage } from "~/i18n/language";
import { ui } from "~/i18n/ui";
import { pick } from "~/i18n/l10n";

const options: { id: PortfolioLanguage; label: string }[] = [
  { id: "en", label: "English" },
  { id: "de", label: "Deutsch" },
  { id: "fr", label: "Français" },
];

export function LanguageSwitch() {
  const { language, setLanguage } = usePortfolioLanguage();

  return (
    <div
      role="group"
      aria-label={pick(ui.languageGroup, language)}
      className="flex flex-wrap items-center gap-1"
    >
      {options.map((option) => {
        const selected = language === option.id;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={selected}
            data-selected={selected ? "true" : "false"}
            onClick={() => setLanguage(option.id)}
            className={cn(
              "portfolio-press focus-ring rounded-control px-2 py-1 text-xs transition-colors duration-fast",
              selected ? "bg-primary/10 font-medium text-foreground" : "text-muted-foreground hover:bg-surface-3 hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
