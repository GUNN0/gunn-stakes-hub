import { useState, useMemo, useEffect } from "react";
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
  }, [searchQuery, selectedCategory, sortBy, sweepstakes]);

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <main className="pb-20">
        <SearchFilters
          onSearchChange={setSearchQuery}
          onCategoryChange={(value) => setSelectedCategory(value)}
          onSortChange={setSortBy}
        />

        {loading ? (
          <div className="max-w-7xl mx-auto px-4 text-center py-20">
            <p className="text-2xl text-muted-foreground">Loading sweepstakes...</p>
          </div>
        ) : filteredSweepstakes.length === 0 ? (
          <div className="max-w-7xl mx-auto px-4 text-center py-20">
            <p className="text-2xl text-muted-foreground">
              No sweepstakes found matching your criteria
            </p>
            <p className="text-muted-foreground mt-2">
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          <>
            <FeaturedSection sweepstakes={sweepstakes} />
            
            <div className="max-w-7xl mx-auto px-4">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  <span className="text-primary">{filteredSweepstakes.length}</span>{" "}
                  Sweepstakes Available
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSweepstakes.map((sweepstake, index) => (
                  <div
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
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-border bg-card/50 backdrop-blur-sm py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} GUNN STAKES. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Enter responsibly. Must be 18+ to participate.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
