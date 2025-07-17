import React from 'react';
import { Coins, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TokenDisplayProps {
  tokens: number;
  className?: string;
  showClaim?: boolean;
  onClaim?: () => void;
  hasClaimed?: boolean;
}

export const TokenDisplay: React.FC<TokenDisplayProps> = ({
  tokens,
  className,
  showClaim = false,
  onClaim
}) => {
  return (
    <div className={cn(
      "flex items-center gap-3 bg-card border border-cricket-boundary rounded-lg p-4 shadow-card",
      className
    )}>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Coins className="h-8 w-8 text-cricket-gold animate-pulse" />
          <div className="absolute inset-0 bg-cricket-gold/20 rounded-full blur-sm" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">MON Tokens</span>
          <span className="text-2xl font-bold text-cricket-gold">
            {tokens.toLocaleString()}
          </span>
        </div>
      </div>
      
      {showClaim && (
        <button
          onClick={onClaim}
          className="ml-auto bg-cricket-gold text-background px-6 py-2 rounded-lg font-bold shadow-token hover:shadow-glow transition-all duration-300 hover:scale-105"
        >
          CLAIM
        </button>
      )}
    </div>
  );
};