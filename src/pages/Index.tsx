import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TokenDisplay } from '@/components/TokenDisplay';
import { GameMenu } from '@/components/GameMenu';
import { GameScreen } from '@/components/GameScreen';
import cricketStadium from '@/assets/cricket-stadium.jpg';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'menu' | 'game'>('menu');
  const [gameMode, setGameMode] = useState<string>('');
  const [tokens, setTokens] = useState<number>(0);
  const [hasClaimedInitial, setHasClaimedInitial] = useState<boolean>(false);

  const { toast } = useToast();

  const handleClaimTokens = () => {
    if (!hasClaimedInitial) {
      setTokens(20000);
      setHasClaimedInitial(true);
      toast({
        title: "🎉 Tokens Claimed!",
        description: "You've claimed your initial 20,000 MON tokens!",
      });
    }
  };

  const handleStartGame = (mode: string) => {
    if (!hasClaimedInitial) {
      toast({
        title: "Claim Tokens First",
        description: "Please claim your initial tokens before starting the game!",
        variant: "destructive",
      });
      return;
    }
    setGameMode(mode);
    setCurrentScreen('game');
  };

  const handleBackToMenu = () => {
    setCurrentScreen('menu');
    setGameMode('');
  };

  if (currentScreen === 'game') {
    return <GameScreen gameMode={gameMode} onBackToMenu={handleBackToMenu} initialTokens={tokens} />;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${cricketStadium})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
      
      <div className="relative z-10 p-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center py-8">
            <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Monad Arena Masters
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the ultimate cricket gaming with token rewards. Play matches, score runs, and earn MON tokens!
            </p>
          </div>

          {/* Token Claim Section */}
          <div className="flex justify-center">
            <TokenDisplay 
              tokens={tokens}
              showClaim={!hasClaimedInitial}
              onClaim={handleClaimTokens}
              className="max-w-md"
            />
          </div>

          {/* Game Menu */}
          <GameMenu onStartGame={handleStartGame} />

          {/* Footer */}
          <div className="text-center text-muted-foreground text-sm py-8">
            <p>🏏 Token Rewards: 1 token per run • 40 tokens for FOUR • 100 tokens for SIX</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
