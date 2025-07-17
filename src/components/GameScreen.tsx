import React, { useState, useCallback } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TokenDisplay } from './TokenDisplay';
import { CricketField } from './CricketField';
import { Scoreboard } from './Scoreboard';
import { useToast } from '@/hooks/use-toast';

interface GameScreenProps {
  gameMode: string;
  onBackToMenu: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ gameMode, onBackToMenu }) => {
  const [gameState, setGameState] = useState({
    runs: 0,
    balls: 0,
    wickets: 0,
    tokens: 0,
    currentOver: [] as number[],
    gameActive: true,
    target: gameMode === 'quick' ? 50 : undefined
  });

  const { toast } = useToast();

  const handleScore = useCallback((runs: number) => {
    let tokensEarned = 0;
    
    // Token calculation based on your requirements
    if (runs === 6) {
      tokensEarned = 100;
    } else if (runs === 4) {
      tokensEarned = 40;
    } else {
      tokensEarned = runs; // 1 token per run
    }

    setGameState(prev => {
      const newCurrentOver = [...prev.currentOver, runs];
      const newBalls = prev.balls + 1;
      const newRuns = prev.runs + runs;
      const newTokens = prev.tokens + tokensEarned;
      
      // Check if over is complete
      if (newCurrentOver.length === 6) {
        newCurrentOver.length = 0; // Reset for new over
      }
      
      // Check win condition
      if (prev.target && newRuns >= prev.target) {
        toast({
          title: "🎉 Match Won!",
          description: `You reached the target with ${tokensEarned} tokens earned!`,
        });
      }
      
      return {
        ...prev,
        runs: newRuns,
        balls: newBalls,
        tokens: newTokens,
        currentOver: newCurrentOver
      };
    });

    // Show score toast
    if (runs === 6) {
      toast({
        title: "🏏 SIX!",
        description: `Amazing shot! +${tokensEarned} tokens`,
      });
    } else if (runs === 4) {
      toast({
        title: "🎯 FOUR!",
        description: `Great boundary! +${tokensEarned} tokens`,
      });
    } else if (runs > 0) {
      toast({
        title: `${runs} run${runs > 1 ? 's' : ''}`,
        description: `+${tokensEarned} token${tokensEarned > 1 ? 's' : ''}`,
      });
    }
  }, [toast]);

  const resetGame = () => {
    setGameState({
      runs: 0,
      balls: 0,
      wickets: 0,
      tokens: 0,
      currentOver: [],
      gameActive: true,
      target: gameMode === 'quick' ? 50 : undefined
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={onBackToMenu}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Menu
          </Button>
          
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {gameMode === 'quick' ? 'Quick Match' : 
             gameMode === 'tournament' ? 'Tournament' : 'Career Mode'}
          </h1>
          
          <Button 
            variant="outline" 
            onClick={resetGame}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Token Display */}
        <TokenDisplay tokens={gameState.tokens} />

        {/* Scoreboard */}
        <Scoreboard
          runs={gameState.runs}
          balls={gameState.balls}
          overs={Math.floor(gameState.balls / 6)}
          wickets={gameState.wickets}
          target={gameState.target}
          currentOver={gameState.currentOver}
          tokens={gameState.tokens}
        />

        {/* Cricket Field */}
        <CricketField 
          onScore={handleScore}
          gameActive={gameState.gameActive}
        />

        {/* Game Info */}
        <div className="text-center text-muted-foreground text-sm space-y-1">
          <p>🏏 Scoring: 1 token per run • 40 tokens for FOUR • 100 tokens for SIX</p>
          <p>Use the slider to position your batsman and click shot buttons to play</p>
        </div>
      </div>
    </div>
  );
};