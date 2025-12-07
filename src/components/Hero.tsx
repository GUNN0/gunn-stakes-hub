import { Gift, Trophy, Clock } from "lucide-react";
import logo from "@/assets/logo.png";

export const Hero = () => {
  return (
    <header className="relative min-h-[60vh] flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <img 
            src={logo} 
            alt="GUNN STAKES - Win Cash, Electronics & More" 
            className="h-32 mx-auto drop-shadow-2xl"
          />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Win Big with{" "}
          <span className="bg-gradient-gold bg-clip-text text-transparent">
            Free Sweepstakes
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in max-w-2xl mx-auto" style={{ animationDelay: "0.2s" }}>
          Enter for a chance to win cash prizes, electronics, travel packages, and more — 100% free to enter, no purchase necessary.
        </p>

        {/* Value Proposition Benefits */}
        <div className="flex flex-wrap justify-center gap-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Gift className="h-5 w-5 text-primary" />
            <span>100% Free Entry</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Trophy className="h-5 w-5 text-primary" />
            <span>Real Prizes</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-5 w-5 text-primary" />
            <span>New Offers Daily</span>
          </div>
        </div>
      </div>
    </header>
  );
};
