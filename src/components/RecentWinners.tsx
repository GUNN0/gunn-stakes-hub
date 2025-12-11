import { Trophy, Star } from "lucide-react";

interface Winner {
  name: string;
  prize: string;
  date: string;
  location: string;
}

const recentWinners: Winner[] = [
  { name: "Sarah W.", prize: "iPhone 15 Pro", date: "Dec 10", location: "Texas" },
  { name: "Michael T.", prize: "$500 Cash", date: "Dec 8", location: "California" },
  { name: "Jennifer K.", prize: "$250 Gift Card", date: "Dec 6", location: "Florida" },
  { name: "David R.", prize: "PlayStation 5", date: "Dec 4", location: "New York" },
  { name: "Amanda L.", prize: "$1,000 Cash", date: "Dec 2", location: "Ohio" },
];

export const RecentWinners = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12" aria-labelledby="recent-winners-heading">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Trophy className="h-4 w-4" />
          Real Winners, Real Prizes
        </div>
        <h2 id="recent-winners-heading" className="text-3xl font-bold mb-2">Recent Winners</h2>
        <p className="text-muted-foreground">Members winning prizes every week</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {recentWinners.map((winner, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors"
          >
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="h-5 w-5 text-primary" />
            </div>
            <p className="font-semibold text-sm">{winner.name}</p>
            <p className="text-primary font-bold text-sm">{winner.prize}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {winner.location} • {winner.date}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <a 
          href="/winners" 
          className="text-primary hover:underline text-sm font-medium"
        >
          View all winners →
        </a>
      </div>
    </section>
  );
};
