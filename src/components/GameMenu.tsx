import React from 'react';
import { Play, Trophy, User, Settings, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface GameMenuProps {
  onStartGame: (mode: string) => void;
  hasClaimedTokens?: boolean;
}

export const GameMenu: React.FC<GameMenuProps> = ({ onStartGame }) => {
  const gameMode = [
    {
      id: 'quick',
      title: 'Quick Match',
      description: 'Jump into a fast-paced cricket match',
      icon: Zap,
      color: 'bg-gradient-primary'
    },
    {
      id: 'tournament',
      title: 'Tournament',
      description: 'Compete in a cricket tournament',
      icon: Trophy,
      color: 'bg-gradient-field'
    },
    {
      id: 'career',
      title: 'Career Mode',
      description: 'Build your cricket career from scratch',
      icon: User,
      color: 'bg-secondary'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Choose Your Game Mode
        </h2>
        <p className="text-muted-foreground">
          Select how you want to play Cricket Arena Masters
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {gameMode.map((mode) => {
          const IconComponent = mode.icon;
          return (
            <Card 
              key={mode.id} 
              className="border-cricket-boundary hover:border-primary transition-all duration-300 hover:shadow-glow cursor-pointer group"
              onClick={() => onStartGame(mode.id)}
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto rounded-full ${mode.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">{mode.title}</CardTitle>
                <CardDescription>{mode.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="glow" 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onStartGame(mode.id);
                  }}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Play Now
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="flex justify-center">
        <Button variant="outline" size="lg">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );
};