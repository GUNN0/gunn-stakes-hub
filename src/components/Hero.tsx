import { Gift, Trophy, Clock, Shield, Users, DollarSign } from "lucide-react";
import logo from "@/assets/logo.png";

export const Hero = () => {
  return (
    <header className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <img 
            src={logo} 
            alt="GUNN STAKES - Free Sweepstakes Hub for Cash and Prize Giveaways" 
            className="h-32 mx-auto drop-shadow-2xl"
            width={128}
            height={128}
          />
        </div>
        
        {/* Clear Value Proposition */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="bg-gradient-gold bg-clip-text text-transparent">
            Win Cash & Prizes
          </span>
          <br />
          <span className="text-3xl md:text-4xl text-foreground">
            Free Sweepstakes You Can Actually Win
          </span>
        </h1>
        
        {/* Detailed Value Proposition */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-fade-in max-w-3xl mx-auto" style={{ animationDelay: "0.2s" }}>
          GUNN STAKES is your trusted hub for legitimate sweepstakes. Enter verified giveaways for cash, electronics, travel, and more — completely free with no purchase necessary.
        </p>
        
        {/* Sub-description for more clarity */}
        <p className="text-lg text-muted-foreground/80 mb-10 animate-fade-in max-w-2xl mx-auto" style={{ animationDelay: "0.25s" }}>
          We curate and verify every sweepstake so you only see real opportunities. Join thousands of winners who've claimed prizes through our platform.
        </p>

        {/* Primary Value Props with Icons */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 animate-fade-in mb-10" style={{ animationDelay: "0.3s" }}>
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 border border-border/50">
            <Gift className="h-8 w-8 text-primary" />
            <span className="font-semibold">100% Free Entry</span>
            <span className="text-sm text-muted-foreground">No purchase required</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 border border-border/50">
            <Trophy className="h-8 w-8 text-primary" />
            <span className="font-semibold">Real Verified Prizes</span>
            <span className="text-sm text-muted-foreground">Cash, electronics & more</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 border border-border/50 col-span-2 md:col-span-1">
            <Clock className="h-8 w-8 text-primary" />
            <span className="font-semibold">Updated Daily</span>
            <span className="text-sm text-muted-foreground">Fresh offers every day</span>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center gap-1.5">
            <Shield className="h-4 w-4 text-primary" />
            <span>All Sweepstakes Verified</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-primary" />
            <span>Thousands of Entries Daily</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="h-4 w-4 text-primary" />
            <span>Real Winners, Real Prizes</span>
          </div>
        </div>
      </div>
    </header>
  );
};
