import { Search } from "lucide-react";
import logo from "@/assets/logo.png";

export const Hero = () => {
  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <img 
            src={logo} 
            alt="GUNN STAKES" 
            className="h-32 mx-auto drop-shadow-2xl"
          />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Your Ultimate{" "}
          <span className="bg-gradient-gold bg-clip-text text-transparent">
            Sweepstakes
          </span>{" "}
          Hub
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Discover and join the best sweepstakes offers all in one place
        </p>
      </div>
    </section>
  );
};
