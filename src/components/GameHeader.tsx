import React from 'react';
import { ArrowLeft, Settings, Trophy, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TokenDisplay } from './TokenDisplay';

interface GameHeaderProps {
  onBackToMenu: () => void;
  gameMode: string;
  totalTokens: number;
  matchTokens: number;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  onBackToMenu,
  gameMode,
  totalTokens,
  matchTokens
}) => {
  const getModeTitle = (mode: string) => {
    switch (mode) {
      case 'quick': return 'Quick Match';
      case 'tournament': return 'Tournament';
      case 'career': return 'Career Mode';
      default: return 'Cricket Match';
    }
  };

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b border-cricket-boundary p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onBackToMenu}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Menu
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              {gameMode === 'tournament' ? <Trophy className="h-4 w-4" /> : 
               gameMode === 'career' ? <User className="h-4 w-4" /> : '⚡'}
            </div>
            <h1 className="text-xl font-bold text-foreground">
              {getModeTitle(gameMode)}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col text-right text-sm">
            <span className="text-muted-foreground">Match Tokens</span>
            <span className="text-cricket-gold font-bold">+{matchTokens}</span>
          </div>
          
          <TokenDisplay 
            tokens={totalTokens}
            className="hidden md:flex"
          />
          
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};