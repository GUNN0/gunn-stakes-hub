import { ExternalLink, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SweepstakeCardProps {
  name: string;
  logo: string;
  reward: string;
  category: string;
  affLink: string;
  endDate?: string;
  customInstructions?: string;
}

export const SweepstakeCard = ({ 
  name, 
  logo, 
  reward, 
  category, 
  affLink,
  endDate,
  customInstructions
}: SweepstakeCardProps) => {
  return (
    <Card className="group overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <Badge variant="secondary" className="mb-3 bg-primary/10 text-primary border-primary/20">
              {category}
            </Badge>
            <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
              {name}
            </h3>
          </div>
          <div className="w-16 h-16 rounded-xl bg-secondary/50 flex items-center justify-center flex-shrink-0 overflow-hidden border border-border">
            <img 
              src={logo} 
              alt={name}
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-gold/10 border border-primary/20">
          <Trophy className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground mb-1">Prize</p>
            <p className="text-lg font-semibold text-foreground">{reward}</p>
          </div>
        </div>
        
        {customInstructions && (
          <p className="text-sm text-muted-foreground mt-3 italic">
            {customInstructions}
          </p>
        )}
        
        {endDate && (
          <p className="text-sm text-muted-foreground mt-3">
            Ends: {endDate}
          </p>
        )}
      </CardContent>

      <CardFooter>
        <Button 
          variant="default"
          className="w-full h-12 text-base font-semibold group/btn"
          asChild
        >
          <a href={affLink} target="_blank" rel="noopener noreferrer">
            Win Here
            <ExternalLink className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
