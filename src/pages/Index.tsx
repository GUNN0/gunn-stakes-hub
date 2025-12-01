import { useState, useMemo } from "react";
import { Hero } from "@/components/Hero";
import { SearchFilters } from "@/components/SearchFilters";
import { SweepstakeCard } from "@/components/SweepstakeCard";
import { sweepstakesData } from "@/data/sweepstakes";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filteredSweepstakes = useMemo(() => {
    let filtered = [...sweepstakesData];

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
          if (!a.endDate || !b.endDate) return 0;
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
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
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <main className="pb-20">
        <SearchFilters
          onSearchChange={setSearchQuery}
          onCategoryChange={(value) => setSelectedCategory(value)}
          onSortChange={setSortBy}
        />

        <div className="max-w-7xl mx-auto px-4">
          {filteredSweepstakes.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-muted-foreground">
                No sweepstakes found matching your criteria
              </p>
              <p className="text-muted-foreground mt-2">
                Try adjusting your filters or search query
              </p>
            </div>
          ) : (
            <>
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
                      affLink={sweepstake.affLink}
                      endDate={sweepstake.endDate}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
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
