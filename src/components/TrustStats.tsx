import { Shield, CheckCircle, Clock, Eye } from "lucide-react";

export const TrustStats = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8" aria-labelledby="trust-stats-heading">
      <h2 id="trust-stats-heading" className="sr-only">Why Trust GUNN STAKES</h2>
      
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <p className="text-lg font-bold text-primary">100% Verified</p>
            <p className="text-sm text-muted-foreground">Every Sweepstake Checked</p>
          </div>
          
          <div>
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-lg font-bold text-green-500">Free to Enter</p>
            <p className="text-sm text-muted-foreground">No Purchase Required</p>
          </div>
          
          <div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
            <p className="text-lg font-bold text-blue-500">Updated Daily</p>
            <p className="text-sm text-muted-foreground">Fresh Opportunities</p>
          </div>
          
          <div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Eye className="h-6 w-6 text-purple-500" />
            </div>
            <p className="text-lg font-bold text-purple-500">Transparent</p>
            <p className="text-sm text-muted-foreground">Clear Rules & Info</p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>Manual verification process</span>
            </div>
            <div className="hidden md:block">•</div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>Legitimate sponsors only</span>
            </div>
            <div className="hidden md:block">•</div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>Real prizes, no gimmicks</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
