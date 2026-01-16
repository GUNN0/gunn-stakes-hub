import { Trophy, Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  prize: string;
  quote: string;
  location: string;
}

const testimonials: Testimonial[] = [
  { 
    name: "Sarah W.", 
    prize: "$500 Gift Card", 
    quote: "I was skeptical at first, but GUNN STAKES only shows legit sweepstakes. So happy I found this site!",
    location: "Texas" 
  },
  { 
    name: "Michael T.", 
    prize: "Gaming Console", 
    quote: "The country filter saved me so much time. No more entering sweepstakes I'm not eligible for.",
    location: "California" 
  },
  { 
    name: "Jennifer K.", 
    prize: "$250 Cash", 
    quote: "Love how they verify everything. I feel confident knowing these are real opportunities.",
    location: "Florida" 
  },
  { 
    name: "David R.", 
    prize: "Electronics Bundle", 
    quote: "The daily updates keep me coming back. Always something new to enter!",
    location: "New York" 
  },
];

export const RecentWinners = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12" aria-labelledby="testimonials-heading">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Trophy className="h-4 w-4" />
          What Our Users Say
        </div>
        <h2 id="testimonials-heading" className="text-3xl font-bold mb-2">Trusted by Sweepstakes Enthusiasts</h2>
        <p className="text-muted-foreground">Hear from people who use GUNN STAKES</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-5 hover:border-primary/50 transition-colors"
          >
            <Quote className="h-6 w-6 text-primary/40 mb-3" />
            <p className="text-sm text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Star className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.location} • Won: {testimonial.prize}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          <span className="text-primary font-medium">Note:</span> These are user experiences. Individual results vary. All sweepstakes have their own odds.
        </p>
      </div>
    </section>
  );
};
