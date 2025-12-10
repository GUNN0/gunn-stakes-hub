import { useState, useMemo, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { SearchFilters } from "@/components/SearchFilters";
import { SweepstakeCard } from "@/components/SweepstakeCard";
import { FeaturedSection } from "@/components/FeaturedSection";
import { LastUpdated } from "@/components/LastUpdated";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trophy } from "lucide-react";

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

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [sweepstakes, setSweepstakes] = useState<Sweepstake[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSweepstakes();
  }, []);

  const fetchSweepstakes = async () => {
    try {
      const { data, error } = await supabase
        .from('sweepstakes')
        .select('*')
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

  const filteredSweepstakes = useMemo(() => {
    let filtered = [...sweepstakes];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (sweepstake) =>
          sweepstake.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sweepstake.reward.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (sweepstake) =>
          sweepstake.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory
      );
    }

    // Filter by country
    if (selectedCountry !== "all") {
      filtered = filtered.filter(
        (sweepstake) =>
          sweepstake.eligible_countries?.includes(selectedCountry)
      );
    }

    // Sort
    switch (sortBy) {
      case "newest":
        // Already in newest order
        break;
      case "ending":
        filtered.sort((a, b) => {
          if (!a.end_date || !b.end_date) return 0;
          return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
        });
        break;
      case "popular":
        // Would need popularity data
        break;
      case "prize-high":
        // Would need prize value data
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedCountry, sortBy, sweepstakes]);

  const baseUrl = "https://www.gunnstakes.store";

  // BreadcrumbList JSON-LD Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Free Sweepstakes",
        "item": `${baseUrl}/`
      }
    ]
  };

  // WebSite Schema - comprehensive for AEO
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "GUNN STAKES",
    "alternateName": "Gunn Stakes Sweepstakes",
    "description": "GUNN STAKES is your trusted hub for free, verified sweepstakes. Enter to win cash prizes, electronics, travel packages, and more with no purchase necessary. New giveaways added daily.",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "GUNN STAKES"
    }
  };

  // Organization Schema - complete with all required fields
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GUNN STAKES",
    "alternateName": "Gunn Stakes",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/favicon.png`,
      "width": 512,
      "height": 512
    },
    "image": `${baseUrl}/favicon.png`,
    "description": "GUNN STAKES is your trusted destination for finding and entering legitimate sweepstakes. We curate verified, free-to-enter giveaways so you can win cash, electronics, travel, and more without any purchase necessary.",
    "foundingDate": "2024",
    "sameAs": [],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "support@gunnstakes.store",
      "availableLanguage": ["English"],
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    }
  };

  // ItemList Schema for sweepstakes with enhanced details
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Free Sweepstakes and Giveaways",
    "description": "Browse our curated collection of verified, free-to-enter sweepstakes. Win cash, electronics, travel packages, gaming gear, and more with no purchase necessary.",
    "numberOfItems": filteredSweepstakes.length,
    "itemListOrder": "https://schema.org/ItemListOrderDescending",
    "itemListElement": filteredSweepstakes.slice(0, 10).map((sweepstake, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": sweepstake.name,
      "description": `Win ${sweepstake.reward} - Free entry sweepstake in the ${sweepstake.category} category`,
      "url": sweepstake.aff_link
    }))
  };

  // FAQPage Schema for common questions
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is GUNN STAKES free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, GUNN STAKES is 100% free. All sweepstakes listed on our platform are free to enter with no purchase necessary."
        }
      },
      {
        "@type": "Question",
        "name": "Are the sweepstakes on GUNN STAKES legitimate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we verify all sweepstakes before listing them. Every giveaway on GUNN STAKES comes from legitimate sponsors offering real prizes including cash, electronics, and travel packages."
        }
      },
      {
        "@type": "Question",
        "name": "How often are new sweepstakes added?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "New sweepstakes are added daily. We continuously curate and verify new giveaways to give you fresh opportunities to win."
        }
      },
      {
        "@type": "Question",
        "name": "What types of prizes can I win?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can win a variety of prizes including cash, electronics, travel packages, gaming gear, gift cards, groceries, and more. Filter by category to find prizes that interest you."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(itemListSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <Hero />
      
      <main className="pb-20">
        {/* Navigation with internal links */}
        <nav aria-label="Main navigation" className="max-w-7xl mx-auto px-4 py-4 border-b border-border/50 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
              <li>
                <a href="/" className="hover:text-primary transition-colors">Home</a>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground font-medium">Sweepstakes</li>
            </ol>
            
            {/* Internal navigation links */}
            <div className="flex items-center gap-4 text-sm">
              <a href="#featured-sweepstakes" className="text-muted-foreground hover:text-primary transition-colors">Featured</a>
              <a href="#all-sweepstakes" className="text-muted-foreground hover:text-primary transition-colors">All Sweepstakes</a>
              <a href="#categories" className="text-muted-foreground hover:text-primary transition-colors">Categories</a>
              <Link to="/winners" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <Trophy className="h-3 w-3" />Winners
              </Link>
            </div>
          </div>
        </nav>

        {/* Daily Update Messaging */}
        <div className="max-w-7xl mx-auto px-4">
          <LastUpdated totalSweepstakes={sweepstakes.length} newToday={3} />
        </div>

        <SearchFilters
          onSearchChange={setSearchQuery}
          onCategoryChange={(value) => setSelectedCategory(value)}
          onCountryChange={(value) => setSelectedCountry(value)}
          onSortChange={setSortBy}
        />

        {loading ? (
          <div className="max-w-7xl mx-auto px-4 text-center py-20">
            <p className="text-2xl text-muted-foreground">Loading sweepstakes...</p>
          </div>
        ) : filteredSweepstakes.length === 0 ? (
          <div className="max-w-7xl mx-auto px-4 text-center py-20">
            <h2 className="text-2xl font-bold mb-2">No Sweepstakes Found</h2>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query to find available sweepstakes.
            </p>
          </div>
        ) : (
          <>
            <FeaturedSection sweepstakes={sweepstakes} />
            
            {/* Categories Section */}
            <section id="categories" className="max-w-7xl mx-auto px-4 mb-12" aria-labelledby="categories-heading">
              <h2 id="categories-heading" className="text-2xl font-bold mb-4">Browse by Category</h2>
              <p className="text-muted-foreground mb-6">
                Find sweepstakes that match your interests. From cash prizes to electronics, travel packages to gaming gear - we have something for everyone.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Cash", "Electronics", "Travel", "Gaming", "Stimulus", "Groceries", "Food Stamps"].map((category) => (
                  <a
                    key={category}
                    href={`#all-sweepstakes`}
                    onClick={() => setSelectedCategory(category.toLowerCase().replace(/\s+/g, "-"))}
                    className="px-4 py-2 rounded-full bg-card border border-border hover:border-primary hover:text-primary transition-colors text-sm font-medium"
                  >
                    {category}
                  </a>
                ))}
              </div>
            </section>
            
            <section id="all-sweepstakes" className="max-w-7xl mx-auto px-4" aria-labelledby="sweepstakes-heading">
              <div className="mb-6 flex items-center justify-between">
                <h2 id="sweepstakes-heading" className="text-2xl font-bold">
                  <span className="text-primary">{filteredSweepstakes.length}</span>{" "}
                  Sweepstakes Available
                </h2>
              </div>

              {/* Content section with more text for SEO */}
              <div className="mb-8 text-muted-foreground space-y-4">
                <p>
                  Browse our curated collection of legitimate sweepstakes and giveaways. Each listing is verified and 100% free to enter with no purchase necessary. 
                  Filter by category, country eligibility, or use the search to find specific prizes. New sweepstakes are added daily, so check back often for fresh opportunities to win.
                </p>
                <p>
                  At GUNN STAKES, we believe everyone deserves a chance to win. That's why we scour the internet to find the best legitimate sweepstakes and bring them to you in one convenient location. 
                  Whether you're looking to win cash prizes, the latest electronics, dream vacations, or everyday essentials like groceries, we've got you covered. Our team verifies each sweepstake to ensure 
                  you're only entering real, legitimate giveaways from trusted sponsors.
                </p>
                <p>
                  Getting started is simple: browse our listings, find a sweepstake that interests you, and click "Win Here" to enter. Many sweepstakes allow multiple entries, so be sure to check the official 
                  rules for each offer. Remember, all entries are completely free — if someone asks you to pay to enter, it's not a legitimate sweepstake.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
                {filteredSweepstakes.map((sweepstake, index) => (
                  <article
                    key={sweepstake.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    role="listitem"
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
            </section>
          </>
        )}
      </main>

      {/* FAQ Section for more content */}
      <section id="faq" className="max-w-4xl mx-auto px-4 py-16" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2">Is GUNN STAKES free to use?</h3>
            <p className="text-muted-foreground">Yes, GUNN STAKES is 100% free. All sweepstakes listed on our platform are free to enter with no purchase necessary. We never charge users to access or enter any giveaway.</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2">Are the sweepstakes on GUNN STAKES legitimate?</h3>
            <p className="text-muted-foreground">Yes, we verify all sweepstakes before listing them. Every giveaway on GUNN STAKES comes from legitimate sponsors offering real prizes including cash, electronics, travel packages, and more.</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2">How often are new sweepstakes added?</h3>
            <p className="text-muted-foreground">New sweepstakes are added daily. We continuously curate and verify new giveaways to give you fresh opportunities to win prizes every single day.</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2">What types of prizes can I win?</h3>
            <p className="text-muted-foreground">You can win a variety of prizes including cash, electronics like iPhones and laptops, travel packages, gaming gear, gift cards, groceries, and much more. Use our category filters to find prizes that interest you.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card/50 backdrop-blur-sm py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">About GUNN STAKES</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Your trusted destination for finding and entering legitimate sweepstakes. We curate the best free-to-enter giveaways so you can win cash, electronics, travel, and more without spending a dime.
              </p>
              <p className="text-muted-foreground text-sm">
                Founded with a mission to help everyday people discover real opportunities to win prizes, GUNN STAKES has become a go-to resource for sweepstakes enthusiasts across the country.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <nav aria-label="Footer navigation">
                <ul className="space-y-2 text-sm">
                  <li><a href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
                  <li><a href="#featured-sweepstakes" className="text-muted-foreground hover:text-primary transition-colors">Featured Sweepstakes</a></li>
                  <li><a href="#all-sweepstakes" className="text-muted-foreground hover:text-primary transition-colors">All Sweepstakes</a></li>
                  <li><a href="#categories" className="text-muted-foreground hover:text-primary transition-colors">Categories</a></li>
                  <li><Link to="/winners" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"><Trophy className="h-3 w-3" />Winners</Link></li>
                  <li><a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
                </ul>
              </nav>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Helpful Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a 
                    href="https://consumer.ftc.gov/articles/prize-scams" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    FTC: Spotting Prize Scams
                  </a>
                </li>
                <li>
                  <a 
                    href="https://consumer.ftc.gov/articles/fake-prize-sweepstakes-and-lottery-scams" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    FTC: Fake Sweepstakes Guide
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.bbb.org/article/scams/8606-bbb-tip-sweepstakes-and-lottery-scams" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    BBB: Sweepstakes Safety Tips
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.usa.gov/common-scams-frauds" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    USA.gov: Scam Prevention
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact & Support</h3>
              <address className="not-italic text-sm text-muted-foreground space-y-3">
                <div className="bg-card border border-border rounded-lg p-3">
                  <p className="font-medium text-foreground mb-1">Email Us</p>
                  <a href="mailto:support@gunnstakes.store" className="hover:text-primary transition-colors text-primary">
                    support@gunnstakes.store
                  </a>
                </div>
                <p>
                  <strong>Support Hours:</strong> Mon-Fri, 9AM-5PM EST
                </p>
                <p>
                  Have questions about a sweepstake or need help? Our team typically responds within 24 hours.
                </p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
              <div>
                <p className="text-muted-foreground">
                  © {new Date().getFullYear()} GUNN STAKES. All rights reserved.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Enter responsibly. Must be 18+ to participate. No purchase necessary.
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                {/* External links for SEO */}
                <a 
                  href="https://www.ftc.gov/legal-library/browse/rules/sweepstakes" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors underline"
                >
                  FTC Sweepstakes Guidelines
                </a>
                <a 
                  href="https://www.consumer.ftc.gov/articles/prize-scams" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors underline"
                >
                  Avoid Prize Scams
                </a>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Sweepstakes rules and eligibility vary by offer. Please read official rules on sponsor sites before entering. GUNN STAKES is an independent sweepstakes aggregator and is not affiliated with individual sweepstakes sponsors.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
