import { useState, useMemo, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Hero } from "@/components/Hero";
import { SearchFilters } from "@/components/SearchFilters";
import { SweepstakeCard } from "@/components/SweepstakeCard";
import { FeaturedSection } from "@/components/FeaturedSection";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

  // BreadcrumbList JSON-LD Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": typeof window !== "undefined" ? window.location.origin : "https://gunnstakes.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Sweepstakes",
        "item": typeof window !== "undefined" ? window.location.href : "https://gunnstakes.com"
      }
    ]
  };

  // WebSite Schema for SEO
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "GUNN STAKES",
    "description": "Your ultimate sweepstakes hub - enter for a chance to win cash, electronics, travel, and more for free.",
    "url": typeof window !== "undefined" ? window.location.origin : "https://gunnstakes.com"
  };

  // ItemList Schema for sweepstakes
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Free Sweepstakes",
    "description": "Browse free sweepstakes to win cash, electronics, travel and more",
    "numberOfItems": filteredSweepstakes.length,
    "itemListElement": filteredSweepstakes.slice(0, 10).map((sweepstake, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": sweepstake.name,
      "description": sweepstake.reward
    }))
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GUNN STAKES",
    "url": "https://gunnstakes.com",
    "logo": "https://gunnstakes.com/favicon.png",
    "description": "Your ultimate sweepstakes hub - enter for a chance to win cash, electronics, travel, and more for free."
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
          {JSON.stringify(itemListSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
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
            </div>
          </div>
        </nav>

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
              <div className="mb-8 text-muted-foreground">
                <p>
                  Browse our curated collection of legitimate sweepstakes and giveaways. Each listing is verified and 100% free to enter with no purchase necessary. 
                  Filter by category, country eligibility, or use the search to find specific prizes. New sweepstakes are added daily, so check back often for fresh opportunities to win.
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

      <footer className="border-t border-border bg-card/50 backdrop-blur-sm py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">About GUNN STAKES</h3>
              <p className="text-muted-foreground text-sm">
                Your trusted destination for finding and entering legitimate sweepstakes. We curate the best free-to-enter giveaways so you can win cash, electronics, travel, and more.
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
                </ul>
              </nav>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <ul className="space-y-2 text-sm">
                {["Cash", "Electronics", "Travel", "Gaming"].map((cat) => (
                  <li key={cat}>
                    <a 
                      href="#all-sweepstakes" 
                      onClick={() => setSelectedCategory(cat.toLowerCase())}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {cat} Sweepstakes
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 text-center">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} GUNN STAKES. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Enter responsibly. Must be 18+ to participate. No purchase necessary.
            </p>
            {/* External link for SEO */}
            <p className="text-xs text-muted-foreground mt-4">
              Sweepstakes rules and eligibility vary by offer. Please read official rules on sponsor sites before entering.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
