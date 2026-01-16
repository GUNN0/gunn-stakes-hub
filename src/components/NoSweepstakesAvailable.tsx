import { Globe, Bell, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface NoSweepstakesAvailableProps {
  countryName: string;
  onShowAll: () => void;
}

export const NoSweepstakesAvailable = ({ countryName, onShowAll }: NoSweepstakesAvailableProps) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="pt-8 pb-8">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Globe className="h-8 w-8 text-primary" />
          </div>
          
          <h2 className="text-2xl font-bold mb-4">
            No Sweepstakes Available in {countryName || "Your Region"}
          </h2>
          
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            We're working hard to add more sweepstakes for your location. 
            Check back soon – we add new verified giveaways every day!
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Bell className="h-4 w-4" />
              <span>New sweepstakes added daily</span>
            </div>

            <Button 
              onClick={onShowAll}
              variant="outline"
              className="gap-2"
            >
              Browse All Sweepstakes
              <ArrowRight className="h-4 w-4" />
            </Button>

            <p className="text-xs text-muted-foreground mt-4">
              Some sweepstakes may still be available in your region. 
              Click above to view all listings and check eligibility.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Tips Section */}
      <div className="mt-12 text-left">
        <h3 className="text-lg font-semibold mb-4 text-center">While You Wait...</h3>
        <div className="grid gap-4">
          <div className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold">1</span>
            </div>
            <div>
              <p className="font-medium">Bookmark This Page</p>
              <p className="text-sm text-muted-foreground">
                Save GUNN STAKES and check back regularly for new opportunities.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold">2</span>
            </div>
            <div>
              <p className="font-medium">Check Eligibility Carefully</p>
              <p className="text-sm text-muted-foreground">
                Some sweepstakes may be open to multiple countries – always read the official rules.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold">3</span>
            </div>
            <div>
              <p className="font-medium">Browse All Categories</p>
              <p className="text-sm text-muted-foreground">
                View all sweepstakes to discover opportunities you might qualify for.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
