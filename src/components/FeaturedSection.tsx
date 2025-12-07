import { Star } from "lucide-react";
import { SweepstakeCard } from "./SweepstakeCard";

interface Sweepstake {
  id: string;
  name: string;
  logo: string;
  reward: string;
  category: string;
  aff_link: string;
  end_date?: string;
  custom_instructions?: string;
  eligible_countries?: string[];
}

interface FeaturedSectionProps {
  sweepstakes: Sweepstake[];
}

export const FeaturedSection = ({ sweepstakes }: FeaturedSectionProps) => {
  // Get top 3 by parsing reward values (assumes format like "$1,000" or "1000")
  const featured = [...sweepstakes]
    .map(s => ({
      ...s,
      rewardValue: parseRewardValue(s.reward)
    }))
    .sort((a, b) => b.rewardValue - a.rewardValue)
    .slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section id="featured-sweepstakes" className="max-w-7xl mx-auto px-4 mb-12" aria-labelledby="featured-heading">
      <div className="flex items-center gap-3 mb-4">
        <Star className="h-6 w-6 text-primary fill-primary" />
        <h2 id="featured-heading" className="text-2xl font-bold">Featured Sweepstakes</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
      </div>
      <p className="text-muted-foreground mb-6">Our top picks with the highest prize values. Don't miss these incredible opportunities to win big.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((sweepstake, index) => (
          <div
            key={sweepstake.id}
            className="relative animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Featured badge */}
            <div className="absolute -top-2 -right-2 z-10 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              #{index + 1} Top Prize
            </div>
            <div className="ring-2 ring-primary/50 rounded-xl">
              <SweepstakeCard
                name={sweepstake.name}
                logo={sweepstake.logo}
                reward={sweepstake.reward}
                category={sweepstake.category}
                affLink={sweepstake.aff_link}
                endDate={sweepstake.end_date}
                customInstructions={sweepstake.custom_instructions}
                eligibleCountries={sweepstake.eligible_countries}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Helper to parse reward strings into numeric values for sorting
function parseRewardValue(reward: string): number {
  // Remove currency symbols and commas, extract number
  const match = reward.replace(/[,$£€]/g, '').match(/[\d,]+(?:\.\d+)?/);
  if (match) {
    return parseFloat(match[0].replace(/,/g, ''));
  }
  return 0;
}
