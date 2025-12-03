import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CountryFlagsProps {
  countries: string[];
  maxDisplay?: number;
}

// Map of country codes to flag emojis and names
const countryData: Record<string, { flag: string; name: string }> = {
  US: { flag: "🇺🇸", name: "United States" },
  CA: { flag: "🇨🇦", name: "Canada" },
  UK: { flag: "🇬🇧", name: "United Kingdom" },
  GB: { flag: "🇬🇧", name: "United Kingdom" },
  AU: { flag: "🇦🇺", name: "Australia" },
  DE: { flag: "🇩🇪", name: "Germany" },
  FR: { flag: "🇫🇷", name: "France" },
  ES: { flag: "🇪🇸", name: "Spain" },
  IT: { flag: "🇮🇹", name: "Italy" },
  NL: { flag: "🇳🇱", name: "Netherlands" },
  BR: { flag: "🇧🇷", name: "Brazil" },
  MX: { flag: "🇲🇽", name: "Mexico" },
  JP: { flag: "🇯🇵", name: "Japan" },
  KR: { flag: "🇰🇷", name: "South Korea" },
  IN: { flag: "🇮🇳", name: "India" },
  NZ: { flag: "🇳🇿", name: "New Zealand" },
  IE: { flag: "🇮🇪", name: "Ireland" },
  SE: { flag: "🇸🇪", name: "Sweden" },
  NO: { flag: "🇳🇴", name: "Norway" },
  DK: { flag: "🇩🇰", name: "Denmark" },
  FI: { flag: "🇫🇮", name: "Finland" },
  CH: { flag: "🇨🇭", name: "Switzerland" },
  AT: { flag: "🇦🇹", name: "Austria" },
  BE: { flag: "🇧🇪", name: "Belgium" },
  PT: { flag: "🇵🇹", name: "Portugal" },
  PL: { flag: "🇵🇱", name: "Poland" },
  ZA: { flag: "🇿🇦", name: "South Africa" },
  SG: { flag: "🇸🇬", name: "Singapore" },
  HK: { flag: "🇭🇰", name: "Hong Kong" },
  AE: { flag: "🇦🇪", name: "UAE" },
  GLOBAL: { flag: "🌍", name: "Worldwide" },
};

export const CountryFlags = ({ countries, maxDisplay = 4 }: CountryFlagsProps) => {
  if (!countries || countries.length === 0) {
    return null;
  }

  const displayCountries = countries.slice(0, maxDisplay);
  const remainingCount = countries.length - maxDisplay;

  const getCountryInfo = (code: string) => {
    return countryData[code.toUpperCase()] || { flag: "🏳️", name: code };
  };

  const allCountryNames = countries.map(c => getCountryInfo(c).name).join(", ");

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-0.5 cursor-help">
          {displayCountries.map((country, idx) => (
            <span key={idx} className="text-lg">
              {getCountryInfo(country).flag}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="text-xs text-muted-foreground ml-1">
              +{remainingCount}
            </span>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-sm">Available in: {allCountryNames}</p>
      </TooltipContent>
    </Tooltip>
  );
};
