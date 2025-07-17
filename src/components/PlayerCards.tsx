import React from 'react';
import { User, Crown, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Player {
  id: string;
  name: string;
  role: string;
  rating: number;
  avatar?: string;
  stats: {
    matches: number;
    runs: number;
    average: number;
  };
}

interface PlayerCardsProps {
  currentPlayer: Player;
  opponent: Player;
}

export const PlayerCards: React.FC<PlayerCardsProps> = ({
  currentPlayer,
  opponent
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Current Player */}
      <Card className="border-primary bg-primary/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-primary flex items-center gap-2">
            <Crown className="h-4 w-4" />
            You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarImage src={currentPlayer.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-bold text-foreground">{currentPlayer.name}</h3>
              <p className="text-sm text-muted-foreground">{currentPlayer.role}</p>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star 
                    key={i} 
                    className={`h-3 w-3 ${
                      i < currentPlayer.rating 
                        ? 'text-cricket-gold fill-cricket-gold' 
                        : 'text-muted-foreground'
                    }`} 
                  />
                ))}
              </div>
            </div>
            <div className="text-right text-xs text-muted-foreground">
              <div>Matches: {currentPlayer.stats.matches}</div>
              <div>Runs: {currentPlayer.stats.runs}</div>
              <div>Avg: {currentPlayer.stats.average}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Opponent */}
      <Card className="border-destructive bg-destructive/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-destructive flex items-center gap-2">
            <User className="h-4 w-4" />
            Opponent
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-destructive">
              <AvatarImage src={opponent.avatar} />
              <AvatarFallback className="bg-destructive text-destructive-foreground">
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-bold text-foreground">{opponent.name}</h3>
              <p className="text-sm text-muted-foreground">{opponent.role}</p>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star 
                    key={i} 
                    className={`h-3 w-3 ${
                      i < opponent.rating 
                        ? 'text-cricket-gold fill-cricket-gold' 
                        : 'text-muted-foreground'
                    }`} 
                  />
                ))}
              </div>
            </div>
            <div className="text-right text-xs text-muted-foreground">
              <div>Matches: {opponent.stats.matches}</div>
              <div>Runs: {opponent.stats.runs}</div>
              <div>Avg: {opponent.stats.average}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};