import { Clock, RefreshCw } from "lucide-react";

interface LastUpdatedProps {
  totalSweepstakes: number;
  newToday?: number;
}

export const LastUpdated = ({ totalSweepstakes, newToday = 0 }: LastUpdatedProps) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const formattedTime = today.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short'
  });

  return (
    <div className="bg-card/50 border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <RefreshCw className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-sm">
              Updated Daily with Fresh Sweepstakes
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Last updated: {formattedDate} at {formattedTime}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="text-center">
            <p className="font-bold text-primary text-lg">{totalSweepstakes}</p>
            <p className="text-xs text-muted-foreground">Active Sweepstakes</p>
          </div>
          {newToday > 0 && (
            <div className="text-center border-l border-border pl-4">
              <p className="font-bold text-green-500 text-lg">+{newToday}</p>
              <p className="text-xs text-muted-foreground">Added Today</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
