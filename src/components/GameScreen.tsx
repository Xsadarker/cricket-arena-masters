import React, { useState, useCallback } from 'react';
import { GameHeader } from './GameHeader';
import { CricketField } from './CricketField';
import { Interactive2DCricket } from './Interactive2DCricket';
import { WalletConnection } from './WalletConnection';
import { Scoreboard } from './Scoreboard';
import { GameStats } from './GameStats';
import { CommentaryBox } from './CommentaryBox';
import { PlayerCards } from './PlayerCards';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface GameScreenProps {
  gameMode: string;
  onBackToMenu: () => void;
  initialTokens: number;
}

export const GameScreen: React.FC<GameScreenProps> = ({ 
  gameMode, 
  onBackToMenu, 
  initialTokens 
}) => {
  const [gameState, setGameState] = useState({
    runs: 0,
    balls: 0,
    wickets: 0,
    matchTokens: 0,
    currentOver: [] as number[],
    gameActive: true,
    target: gameMode === 'quick' ? 50 : undefined,
    boundaries: { fours: 0, sixes: 0 },
    lastScore: 0,
    achievements: [] as string[],
    betAmount: 0,
    gameMode: 'classic' as 'classic' | '2d'
  });

  const [totalTokens, setTotalTokens] = useState(initialTokens);

  // Mock player data
  const currentPlayer = {
    id: 'player1',
    name: 'You',
    role: 'All-rounder',
    rating: 4,
    stats: { matches: 15, runs: 450, average: 32.5 }
  };

  const opponent = {
    id: 'ai1',
    name: 'AI Champion',
    role: 'Fast Bowler',
    rating: 5,
    stats: { matches: 100, runs: 2500, average: 28.2 }
  };

  const { toast } = useToast();

  const handleOut = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      wickets: prev.wickets + 1,
      gameActive: prev.wickets + 1 < 10
    }));

    toast({
      title: "🏏 OUT!",
      description: "Better luck next time!",
      variant: "destructive"
    });

    if (gameState.wickets + 1 >= 10) {
      toast({
        title: "🏁 Game Over",
        description: `Final Score: ${gameState.runs}/${gameState.wickets + 1}`,
      });
    }
  }, [gameState.wickets, toast]);

  const handleBetPlaced = useCallback((amount: number) => {
    setGameState(prev => ({
      ...prev,
      betAmount: amount
    }));
    
    setTotalTokens(prev => prev - amount);
    
    toast({
      title: "🎯 Bet Placed!",
      description: `${amount} tokens wagered. Win to double your bet!`
    });
  }, [toast]);

  const handleScore = useCallback((runs: number) => {
    let tokensEarned = 0;
    
    // Token calculation
    if (runs === 6) {
      tokensEarned = 100;
    } else if (runs === 4) {
      tokensEarned = 40;
    } else {
      tokensEarned = runs;
    }

    setGameState(prev => {
      const newCurrentOver = [...prev.currentOver, runs];
      const newBalls = prev.balls + 1;
      const newRuns = prev.runs + runs;
      const newMatchTokens = prev.matchTokens + tokensEarned;
      const newBoundaries = {
        fours: prev.boundaries.fours + (runs === 4 ? 1 : 0),
        sixes: prev.boundaries.sixes + (runs === 6 ? 1 : 0)
      };
      
      // Check achievements
      const newAchievements = [...prev.achievements];
      if (runs === 6 && !newAchievements.includes('First Six')) {
        newAchievements.push('First Six');
        toast({
          title: "🏆 Achievement Unlocked!",
          description: "First Six - Hit your first maximum!",
        });
      }
      
      if (newRuns >= 50 && !newAchievements.includes('Half Century')) {
        newAchievements.push('Half Century');
        toast({
          title: "🏆 Achievement Unlocked!",
          description: "Half Century - Scored 50 runs!",
        });
      }
      
      // Reset over if complete
      if (newCurrentOver.length === 6) {
        newCurrentOver.length = 0;
      }
      
      // Check win condition
      if (prev.target && newRuns >= prev.target) {
        toast({
          title: "🎉 Match Won!",
          description: `Target achieved! +${tokensEarned} tokens earned!`,
        });
      }
      
      return {
        ...prev,
        runs: newRuns,
        balls: newBalls,
        matchTokens: newMatchTokens,
        currentOver: newCurrentOver,
        boundaries: newBoundaries,
        lastScore: runs,
        achievements: newAchievements
      };
    });

    // Update total tokens
    setTotalTokens(prev => prev + tokensEarned);

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

  const strikeRate = gameState.balls > 0 ? (gameState.runs / gameState.balls) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <GameHeader 
        onBackToMenu={onBackToMenu}
        gameMode={gameMode}
        totalTokens={totalTokens}
        matchTokens={gameState.matchTokens}
      />

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Player Cards */}
        <PlayerCards 
          currentPlayer={currentPlayer}
          opponent={opponent}
        />

        {/* Game Stats */}
        <GameStats
          totalRuns={gameState.runs}
          totalBalls={gameState.balls}
          boundaries={gameState.boundaries}
          strikeRate={strikeRate}
          totalTokens={totalTokens}
          achievements={gameState.achievements}
        />

        {/* Scoreboard */}
        <Scoreboard
          runs={gameState.runs}
          balls={gameState.balls}
          overs={Math.floor(gameState.balls / 6)}
          wickets={gameState.wickets}
          target={gameState.target}
          currentOver={gameState.currentOver}
          tokens={gameState.matchTokens}
        />

        {/* Game Mode Tabs */}
        <Tabs 
          value={gameState.gameMode} 
          onValueChange={(value) => 
            setGameState(prev => ({ ...prev, gameMode: value as 'classic' | '2d' }))
          }
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="classic">Classic Mode</TabsTrigger>
            <TabsTrigger value="2d">Interactive 2D</TabsTrigger>
          </TabsList>
          
          <TabsContent value="classic" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cricket Field */}
              <div className="lg:col-span-2">
                <CricketField 
                  onScore={handleScore}
                  gameActive={gameState.gameActive}
                />
              </div>

              {/* Commentary */}
              <div className="lg:col-span-1">
                <CommentaryBox
                  lastScore={gameState.lastScore}
                  totalRuns={gameState.runs}
                  ballsPlayed={gameState.balls}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="2d" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Interactive 2D Cricket */}
              <div className="lg:col-span-3">
                <Interactive2DCricket
                  onScore={handleScore}
                  onOut={handleOut}
                  gameActive={gameState.gameActive}
                />
              </div>

              {/* Wallet & Commentary */}
              <div className="lg:col-span-1 space-y-4">
                <WalletConnection
                  onBetPlaced={handleBetPlaced}
                  tokens={totalTokens}
                />
                <CommentaryBox
                  lastScore={gameState.lastScore}
                  totalRuns={gameState.runs}
                  ballsPlayed={gameState.balls}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Game Info */}
        <div className="text-center text-muted-foreground text-sm space-y-1 py-4">
          <p>🏏 Scoring: 1 token per run • 40 tokens for FOUR • 100 tokens for SIX</p>
          <p>
            {gameState.gameMode === 'classic' 
              ? "Use controls to position batsman and select shot power"
              : "Interactive 2D mode with realistic physics and fielder catching"
            }
          </p>
          {gameState.betAmount > 0 && (
            <p className="text-amber-600 dark:text-amber-400">
              💰 Current Bet: {gameState.betAmount} tokens
            </p>
          )}
        </div>
      </div>
    </div>
  );
};