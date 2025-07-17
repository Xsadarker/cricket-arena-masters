import React, { useState } from 'react';
import { GameScreen } from '@/components/GameScreen';
import { TokenDisplay } from '@/components/TokenDisplay';
import { GameMenu } from '@/components/GameMenu';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function GamePage() {
  const [currentScreen, setCurrentScreen] = useState<'menu' | 'game'>('menu');
  const [gameMode, setGameMode] = useState('');
  const [tokens, setTokens] = useState(0);
  const [hasClaimedInitial, setHasClaimedInitial] = useState(false);
  const { toast } = useToast();

  const handleClaimTokens = () => {
    setTokens(20000);
    setHasClaimedInitial(true);
    toast({
      title: "🎉 Welcome Bonus Claimed!",
      description: "You received 20,000 MON tokens to start playing!",
    });
  };

  const handleStartGame = (mode: string) => {
    if (!hasClaimedInitial) {
      toast({
        title: "Claim Your Tokens First!",
        description: "Please claim your initial 20,000 tokens before playing.",
        variant: "destructive"
      });
      return;
    }
    
    setGameMode(mode);
    setCurrentScreen('game');
    toast({
      title: `🏏 ${mode.charAt(0).toUpperCase() + mode.slice(1)} Match Started!`,
      description: "Good luck and may the runs flow!",
    });
  };

  const handleBackToMenu = () => {
    setCurrentScreen('menu');
  };

  if (currentScreen === 'game') {
    return (
      <GameScreen
        gameMode={gameMode}
        onBackToMenu={handleBackToMenu}
        initialTokens={tokens}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cricket-primary via-cricket-secondary to-cricket-accent relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cricket-primary/70 via-cricket-secondary/60 to-cricket-accent/70 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <Button variant="ghost" className="text-white hover:bg-white/20" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <TokenDisplay 
            tokens={tokens} 
            onClaim={handleClaimTokens}
            hasClaimed={hasClaimedInitial}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-4xl space-y-8">
            {/* Header */}
            <div className="text-center text-white space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Cricket Arena Masters
              </h1>
              <p className="text-xl md:text-2xl text-white/90">
                Experience the thrill of cricket with blockchain rewards
              </p>
            </div>

            {/* Game Menu */}
            <GameMenu onStartGame={handleStartGame} hasClaimedTokens={hasClaimedInitial} />

            {/* Footer Info */}
            <div className="text-center text-white/80 space-y-2">
              <p className="text-lg font-semibold">🏏 Token Rewards System</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <span className="font-medium">1 Token</span> per run scored
                </div>
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <span className="font-medium">40 Tokens</span> for each FOUR
                </div>
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <span className="font-medium">100 Tokens</span> for each SIX
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}