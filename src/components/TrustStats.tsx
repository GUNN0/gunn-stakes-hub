import { Shield, CheckCircle, Users, Ban } from "lucide-react";

export const TrustStats = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8" aria-labelledby="trust-stats-heading">
      <h2 id="trust-stats-heading" className="sr-only">Trust Statistics</h2>
      
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <p className="text-2xl font-bold text-primary">847+</p>
            <p className="text-sm text-muted-foreground">Verified Sweepstakes</p>
          </div>
          
          <div>
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-green-500">1,200+</p>
            <p className="text-sm text-muted-foreground">Winners This Month</p>
          </div>
          
          <div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-blue-500">50,000+</p>
            <p className="text-sm text-muted-foreground">Active Members</p>
          </div>
          
          <div>
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Ban className="h-6 w-6 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-red-500">342</p>
            <p className="text-sm text-muted-foreground">Scams Blocked</p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>Manual verification within 24 hours</span>
            </div>
            <div className="hidden md:block">•</div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>98% scam detection rate</span>
            </div>
            <div className="hidden md:block">•</div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>Support replies within 2 hours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
