import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  endDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = ({ endDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        return null;
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (!timeLeft) {
    return (
      <div className="flex items-center gap-2 text-destructive text-sm">
        <Clock className="h-4 w-4" />
        <span>Expired</span>
      </div>
    );
  }

  const isUrgent = timeLeft.days < 3;

  return (
    <div className={`flex items-center gap-2 text-sm ${isUrgent ? 'text-destructive' : 'text-muted-foreground'}`}>
      <Clock className={`h-4 w-4 ${isUrgent ? 'animate-pulse' : ''}`} />
      <div className="flex gap-1 font-mono">
        {timeLeft.days > 0 && (
          <span className="bg-secondary/50 px-1.5 py-0.5 rounded">
            {timeLeft.days}d
          </span>
        )}
        <span className="bg-secondary/50 px-1.5 py-0.5 rounded">
          {String(timeLeft.hours).padStart(2, '0')}h
        </span>
        <span className="bg-secondary/50 px-1.5 py-0.5 rounded">
          {String(timeLeft.minutes).padStart(2, '0')}m
        </span>
        {timeLeft.days === 0 && (
          <span className="bg-secondary/50 px-1.5 py-0.5 rounded">
            {String(timeLeft.seconds).padStart(2, '0')}s
          </span>
        )}
      </div>
    </div>
  );
};
