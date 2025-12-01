import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFiltersProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export const SearchFilters = ({ onSearchChange, onCategoryChange, onSortChange }: SearchFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mb-12">
      <div className="bg-card border border-border rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search sweepstakes..."
              className="pl-12 h-12 bg-secondary/50 border-border text-lg"
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setShowFilters(!showFilters)}
            className="md:w-auto h-12"
          >
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            Filters
          </Button>
        </div>

        {showFilters && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-border animate-fade-in">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Category
              </label>
              <Select onValueChange={onCategoryChange}>
                <SelectTrigger className="h-12 bg-secondary/50">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="cash">Cash Prizes</SelectItem>
                  <SelectItem value="tech">Tech & Gadgets</SelectItem>
                  <SelectItem value="travel">Travel & Vacation</SelectItem>
                  <SelectItem value="shopping">Shopping Spree</SelectItem>
                  <SelectItem value="automotive">Automotive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Sort By
              </label>
              <Select onValueChange={onSortChange} defaultValue="newest">
                <SelectTrigger className="h-12 bg-secondary/50">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="ending">Ending Soon</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="prize-high">Highest Prize Value</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
