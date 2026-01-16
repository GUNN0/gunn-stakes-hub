import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { SweepstakeCard } from "@/components/SweepstakeCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useUserCountry } from "@/hooks/useUserCountry";
import { 
  DollarSign, 
  Laptop, 
  Plane, 
  Gamepad2, 
  ShoppingCart, 
  Car,
  Shield,
  Trophy,
  MapPin,
  ArrowLeft,
  Clock,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

interface CategoryConfig {
  title: string;
  slug: string;
  dbCategory: string;
  description: string;
  longDescription: string;
  icon: typeof DollarSign;
  metaTitle: string;
  metaDescription: string;
  tips: string[];
  faq: { question: string; answer: string }[];
}

const categoryConfigs: Record<string, CategoryConfig> = {
  "cash-sweepstakes": {
    title: "Cash Sweepstakes",
    slug: "cash-sweepstakes",
    dbCategory: "Cash",
    description: "Win real cash prizes with free-to-enter sweepstakes",
    longDescription: "Looking to win real money? Our cash sweepstakes section features verified giveaways offering cash prizes ranging from gift cards to grand prizes worth thousands. All entries are completely free with no purchase necessary.",
    icon: DollarSign,
    metaTitle: "Cash Sweepstakes 2025 - Win Real Money Free | GUNN STAKES",
    metaDescription: "Enter free cash sweepstakes and win real money prizes. No purchase necessary. Verified daily, updated regularly. Start winning today!",
    tips: [
      "Check entry limits - many cash sweepstakes allow daily entries",
      "Read the official rules for prize payment details",
      "Keep records of your entries for tax purposes on big wins"
    ],
    faq: [
      { question: "Are cash prizes taxable?", answer: "Yes, cash prizes over $600 are generally taxable. Winners receive a 1099 form from sponsors for prizes over this amount." },
      { question: "How are cash prizes paid?", answer: "Most sponsors pay via check or direct deposit. Some may offer PayPal or gift card alternatives." }
    ]
  },
  "electronics-giveaways": {
    title: "Electronics Giveaways",
    slug: "electronics-giveaways",
    dbCategory: "Tech & Gadgets",
    description: "Win the latest tech and electronics",
    longDescription: "Score the newest smartphones, laptops, gaming consoles, and smart home devices. Our electronics giveaways feature products from top brands like Apple, Samsung, Sony, and more. All verified and free to enter.",
    icon: Laptop,
    metaTitle: "Electronics Giveaways 2025 - Win iPhones, Laptops & More | GUNN STAKES",
    metaDescription: "Enter free electronics giveaways for iPhones, laptops, gaming consoles, and tech gadgets. Verified sweepstakes, no purchase necessary.",
    tips: [
      "Follow brands on social media for exclusive giveaway announcements",
      "New product launches often come with promotional sweepstakes",
      "Check if prizes include accessories or just the main device"
    ],
    faq: [
      { question: "Can I choose the color/model of electronics prizes?", answer: "This varies by sweepstake. Check official rules - some allow winner preference, others provide a specific model." },
      { question: "Do electronics prizes come with warranties?", answer: "Most prizes include the standard manufacturer warranty. Verify in the official rules before entering." }
    ]
  },
  "travel-sweepstakes": {
    title: "Travel Sweepstakes",
    slug: "travel-sweepstakes",
    dbCategory: "Travel",
    description: "Win dream vacations and travel packages",
    longDescription: "Dream of tropical getaways or exciting adventures? Our travel sweepstakes feature all-inclusive vacation packages, flights, hotel stays, and cruise giveaways. Enter for your chance to explore the world for free.",
    icon: Plane,
    metaTitle: "Travel Sweepstakes 2025 - Win Free Vacations & Trips | GUNN STAKES",
    metaDescription: "Enter free travel sweepstakes to win vacation packages, flights, and hotel stays. Verified giveaways, no purchase necessary.",
    tips: [
      "Check blackout dates and travel restrictions in official rules",
      "Note if airfare is included or if you need to arrange transportation",
      "Verify the prize value covers your travel companions"
    ],
    faq: [
      { question: "Can I bring a companion on travel prizes?", answer: "Many travel sweepstakes include a plus-one, but verify the number of travelers covered in the official rules." },
      { question: "Are there date restrictions for travel prizes?", answer: "Yes, most travel prizes have blackout dates and expiration periods. Read the rules carefully before entering." }
    ]
  },
  "gaming-giveaways": {
    title: "Gaming Giveaways",
    slug: "gaming-giveaways",
    dbCategory: "Gaming",
    description: "Win gaming consoles, games, and accessories",
    longDescription: "Level up your gaming setup with free sweepstakes for PlayStation, Xbox, Nintendo Switch, gaming PCs, and more. We also feature game code giveaways and gaming accessory sweepstakes.",
    icon: Gamepad2,
    metaTitle: "Gaming Giveaways 2025 - Win Consoles, Games & Gear | GUNN STAKES",
    metaDescription: "Enter free gaming giveaways for PS5, Xbox, Nintendo Switch, gaming PCs and accessories. Verified sweepstakes daily.",
    tips: [
      "Gaming brands often run sweepstakes during major game releases",
      "E-sports events frequently sponsor giveaways",
      "Check if digital game codes are region-specific"
    ],
    faq: [
      { question: "Are game prizes digital or physical?", answer: "It varies by sweepstake. Digital codes are sent via email, while physical prizes are shipped to winners." },
      { question: "Can I enter gaming sweepstakes from any country?", answer: "Eligibility varies. Check the country filter and official rules for each sweepstake." }
    ]
  },
  "grocery-sweepstakes": {
    title: "Grocery Sweepstakes",
    slug: "grocery-sweepstakes",
    dbCategory: "Groceries",
    description: "Win gift cards and grocery prizes",
    longDescription: "Save on everyday essentials with grocery sweepstakes. Win supermarket gift cards, free groceries for a year, and food product bundles. Help stretch your budget with these practical prizes.",
    icon: ShoppingCart,
    metaTitle: "Grocery Sweepstakes 2025 - Win Gift Cards & Free Food | GUNN STAKES",
    metaDescription: "Enter free grocery sweepstakes to win supermarket gift cards and food prizes. Verified giveaways, no purchase necessary.",
    tips: [
      "Food brands often run sweepstakes with product purchases - check if NPN entries are available",
      "Holiday seasons bring more grocery-related giveaways",
      "Some prizes are awarded as store-specific gift cards"
    ],
    faq: [
      { question: "How do 'free groceries for a year' prizes work?", answer: "Usually awarded as a lump sum gift card or monthly installments. Check official rules for the exact prize value and distribution." },
      { question: "Are grocery prizes specific to certain stores?", answer: "Many are brand-specific gift cards, but some offer Visa/Mastercard gift cards usable anywhere." }
    ]
  },
  "automotive-sweepstakes": {
    title: "Automotive Sweepstakes",
    slug: "automotive-sweepstakes",
    dbCategory: "Automotive",
    description: "Win cars, trucks, and automotive prizes",
    longDescription: "Drive away with your dream vehicle! Our automotive sweepstakes feature car giveaways, truck promotions, and automotive accessory prizes. From brand new vehicles to restoration projects.",
    icon: Car,
    metaTitle: "Automotive Sweepstakes 2025 - Win Cars & Trucks Free | GUNN STAKES",
    metaDescription: "Enter free automotive sweepstakes to win cars, trucks, and vehicle prizes. Verified giveaways, no purchase necessary.",
    tips: [
      "Vehicle prizes often have significant tax implications - be prepared",
      "Some sweepstakes offer cash alternatives to vehicle prizes",
      "Check if delivery or pickup is included in the prize"
    ],
    faq: [
      { question: "Do I have to pay taxes on a car prize?", answer: "Yes, vehicle prizes are taxable. Winners typically receive a 1099 and must pay income tax on the fair market value." },
      { question: "Can I take cash instead of a car?", answer: "Some sweepstakes offer a cash alternative, usually at a lower value. Check the official rules for options." }
    ]
  }
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [sweepstakes, setSweepstakes] = useState<Sweepstake[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { countryCode, countryName } = useUserCountry();

  const config = category ? categoryConfigs[category] : null;

  useEffect(() => {
    if (config) {
      fetchSweepstakes();
    }
  }, [config]);

  const fetchSweepstakes = async () => {
    if (!config) return;
    
    try {
      const { data, error } = await supabase
        .from('sweepstakes')
        .select('*')
        .eq('category', config.dbCategory)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSweepstakes(data || []);
    } catch (error) {
      toast({
        title: "Error loading sweepstakes",
        description: "Please refresh the page to try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter by user's country
  const filteredSweepstakes = useMemo(() => {
    if (!countryCode) return sweepstakes;
    return sweepstakes.filter(
      (s) => !s.eligible_countries || s.eligible_countries.length === 0 || s.eligible_countries.includes(countryCode)
    );
  }, [sweepstakes, countryCode]);

  if (!config) {
    return <Navigate to="/" replace />;
  }

  const Icon = config.icon;
  const baseUrl = "https://www.gunnstakes.store";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": config.title, "item": `${baseUrl}/${config.slug}` }
    ]
  };

  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": config.title,
    "description": config.longDescription,
    "url": `${baseUrl}/${config.slug}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": filteredSweepstakes.length,
      "itemListElement": filteredSweepstakes.slice(0, 10).map((s, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": s.name,
        "description": `Win ${s.reward}`,
        "url": s.aff_link
      }))
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": config.faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{config.metaTitle}</title>
        <meta name="description" content={config.metaDescription} />
        <link rel="canonical" href={`${baseUrl}/${config.slug}`} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(categorySchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <nav className="mb-6">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to All Sweepstakes
            </Link>
          </nav>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center">
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{config.title}</h1>
              <p className="text-lg text-muted-foreground">{config.description}</p>
            </div>
          </div>

          <p className="text-muted-foreground max-w-3xl mt-4">
            {config.longDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>All entries free</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="h-4 w-4 text-primary" />
              <span>Verified sweepstakes</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" />
              <span>Updated regularly</span>
            </div>
            {countryCode && (
              <div className="flex items-center gap-2 text-muted-foreground ml-auto">
                <MapPin className="h-4 w-4" />
                <span>Showing for: {countryName || countryCode}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <ol className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground font-medium">{config.title}</li>
        </ol>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-2xl text-muted-foreground">Loading sweepstakes...</p>
          </div>
        ) : filteredSweepstakes.length === 0 ? (
          <div className="text-center py-20 bg-card border border-border rounded-xl">
            <Icon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No {config.title} Available</h2>
            <p className="text-muted-foreground mb-6">
              Check back soon! We add new sweepstakes regularly.
            </p>
            <Button asChild>
              <Link to="/">Browse All Sweepstakes</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold">
                <span className="text-primary">{filteredSweepstakes.length}</span> {config.title} Available
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredSweepstakes.map((sweepstake, index) => (
                <article
                  key={sweepstake.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <SweepstakeCard
                    name={sweepstake.name}
                    logo={sweepstake.logo}
                    reward={sweepstake.reward}
                    category={sweepstake.category}
                    affLink={sweepstake.aff_link}
                    endDate={sweepstake.end_date || undefined}
                    customInstructions={sweepstake.custom_instructions || undefined}
                    eligibleCountries={sweepstake.eligible_countries || undefined}
                  />
                </article>
              ))}
            </div>
          </>
        )}

        {/* Tips Section */}
        <section className="bg-card border border-border rounded-xl p-6 mb-12">
          <h2 className="text-xl font-bold mb-4">Tips for {config.title}</h2>
          <ul className="space-y-3">
            {config.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{config.title} FAQ</h2>
          <div className="space-y-4">
            {config.faq.map((item, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">{item.question}</h3>
                <p className="text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Other Categories */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Explore Other Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.values(categoryConfigs)
              .filter(c => c.slug !== category)
              .map(cat => {
                const CatIcon = cat.icon;
                return (
                  <Link
                    key={cat.slug}
                    to={`/${cat.slug}`}
                    className="bg-card border border-border rounded-lg p-4 text-center hover:border-primary transition-colors group"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/20 transition-colors">
                      <CatIcon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{cat.title}</span>
                  </Link>
                );
              })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
            <span className="text-muted-foreground">•</span>
            <Link to="/how-we-verify" className="text-muted-foreground hover:text-primary transition-colors">How We Verify</Link>
            <span className="text-muted-foreground">•</span>
            <Link to="/winners" className="text-muted-foreground hover:text-primary transition-colors">Winners</Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} GUNN STAKES. All rights reserved. 18+ only. No purchase necessary.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CategoryPage;
