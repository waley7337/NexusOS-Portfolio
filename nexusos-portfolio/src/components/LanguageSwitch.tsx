import { cn } from "@/lib/utils";
import { usePortfolioLanguage, type PortfolioLanguage } from "~/i18n/language";

const options: { id: PortfolioLanguage; label: string }[] = [
  { id: "en", label: "English" },
  { id: "de", label: "Deutsch" },
];

export function LanguageSwitch() {
  const { language, setLanguage } = usePortfolioLanguage();

  return (
    <div role="group" aria-label={language === "de" ? "Sprache" : "Language"} className="flex items-center gap-1">
      {options.map((option) => {
        const selected = language === option.id;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={selected}
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
