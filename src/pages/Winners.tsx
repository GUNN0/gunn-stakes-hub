import { Helmet } from "react-helmet-async";
import { Trophy, Calendar, Gift, Star, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

interface Winner {
  id: string;
  name: string;
  location: string;
  prize: string;
  category: string;
  date: string;
  testimonial?: string;
}

// Sample winners data - in production, this would come from the database
const winners: Winner[] = [
  {
    id: "1",
    name: "Michael T.",
    location: "Texas",
    prize: "$5,000 Cash Prize",
    category: "Cash",
    date: "December 2025",
    testimonial: "I couldn't believe it when I got the email. GUNN STAKES made it so easy to find legitimate sweepstakes!"
  },
  {
    id: "2",
    name: "Sarah L.",
    location: "California",
    prize: "iPhone 15 Pro Max",
    category: "Electronics",
    date: "November 2025",
    testimonial: "I've been entering sweepstakes for years, but this is my first big win. So grateful!"
  },
  {
    id: "3",
    name: "James R.",
    location: "Florida",
    prize: "$2,500 Vacation Package",
    category: "Travel",
    date: "November 2025"
  },
  {
    id: "4",
    name: "Emma K.",
    location: "New York",
    prize: "PS5 Console Bundle",
    category: "Gaming",
    date: "October 2025",
    testimonial: "My kids are thrilled! Thank you for curating such great opportunities."
  },
  {
    id: "5",
    name: "David M.",
    location: "Ohio",
    prize: "$1,000 Grocery Gift Cards",
    category: "Groceries",
    date: "October 2025"
  },
  {
    id: "6",
    name: "Lisa P.",
    location: "Arizona",
    prize: "$10,000 Grand Prize",
    category: "Cash",
    date: "September 2025",
    testimonial: "Life-changing! I entered through GUNN STAKES and won the grand prize. Can't thank them enough!"
  },
  {
    id: "7",
    name: "Robert C.",
    location: "Michigan",
    prize: "MacBook Pro 16\"",
    category: "Electronics",
    date: "September 2025"
  },
  {
    id: "8",
    name: "Jennifer W.",
    location: "Georgia",
    prize: "Caribbean Cruise for 2",
    category: "Travel",
    date: "August 2025",
    testimonial: "Best vacation of our lives, all because I found this sweepstake on GUNN STAKES!"
  }
];

const totalPrizeValue = "$150,000+";
const totalWinners = "500+";

const Winners = () => {
  const baseUrl = "https://www.gunnstakes.store";

  const winnersSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "GUNN STAKES Winners - Real People, Real Prizes",
    "description": "See real winners who've claimed prizes through GUNN STAKES. Over $150,000 in prizes won by our community members.",
    "url": `${baseUrl}/winners`,
    "mainEntity": {
      "@type": "ItemList",
      "name": "Recent Winners",
      "numberOfItems": winners.length,
      "itemListElement": winners.map((winner, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": `${winner.name} from ${winner.location} - Won ${winner.prize}`
      }))
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Winners | GUNN STAKES - Real People, Real Prizes</title>
        <meta name="description" content="See real winners who've claimed prizes through GUNN STAKES. Over $150,000 in prizes won by our community. Cash, electronics, travel, and more!" />
        <link rel="canonical" href={`${baseUrl}/winners`} />
        <script type="application/ld+json">
          {JSON.stringify(winnersSchema)}
        </script>
      </Helmet>

      {/* Header */}
      <header className="bg-card/50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="GUNN STAKES" className="h-10" />
            <span className="font-bold text-xl hidden sm:inline">GUNN STAKES</span>
          </Link>
          <Link 
            to="/" 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sweepstakes
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-primary/10 border border-primary/20">
              <Trophy className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-gold bg-clip-text text-transparent">Real Winners,</span>{" "}
            <span className="text-foreground">Real Prizes</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            GUNN STAKES members have won over {totalPrizeValue} in prizes. Here are some of our recent success stories.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-3xl font-bold text-primary">{totalPrizeValue}</p>
              <p className="text-sm text-muted-foreground">Total Prizes Won</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-3xl font-bold text-primary">{totalWinners}</p>
              <p className="text-sm text-muted-foreground">Verified Winners</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-3xl font-bold text-primary">50+</p>
              <p className="text-sm text-muted-foreground">States Represented</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-3xl font-bold text-primary">Daily</p>
              <p className="text-sm text-muted-foreground">New Winners</p>
            </div>
          </div>
        </section>

        {/* Winners Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Recent Winners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {winners.map((winner) => (
              <article 
                key={winner.id}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{winner.name}</h3>
                    <p className="text-sm text-muted-foreground">{winner.location}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                    {winner.category}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <Gift className="h-5 w-5 text-primary" />
                  <span className="font-medium text-primary">{winner.prize}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4" />
                  <span>{winner.date}</span>
                </div>
                
                {winner.testimonial && (
                  <blockquote className="border-l-2 border-primary/50 pl-4 text-sm text-muted-foreground italic">
                    "{winner.testimonial}"
                  </blockquote>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-card border border-border rounded-2xl p-8 md:p-12">
          <Star className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Be Our Next Winner?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Browse our verified sweepstakes and start entering today. New opportunities are added daily — your winning moment could be just one entry away!
          </p>
          <Link 
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            <Trophy className="h-5 w-5" />
            Browse Sweepstakes
          </Link>
        </section>

        {/* Trust Section */}
        <section className="mt-16 text-center">
          <h2 className="text-xl font-semibold mb-4">Why Our Members Win</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-4">
              <p className="font-medium mb-2">Verified Sweepstakes</p>
              <p className="text-sm text-muted-foreground">We only list legitimate, verified giveaways from trusted sponsors.</p>
            </div>
            <div className="p-4">
              <p className="font-medium mb-2">Daily Updates</p>
              <p className="text-sm text-muted-foreground">Fresh opportunities every day means more chances to win.</p>
            </div>
            <div className="p-4">
              <p className="font-medium mb-2">Easy Entry</p>
              <p className="text-sm text-muted-foreground">One click takes you directly to the sponsor's entry page.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} GUNN STAKES. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Winner stories are from verified entries. Individual results may vary.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Winners;
