import React from 'react';
import { Clock, Target, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ScoreboardProps {
  runs: number;
  balls: number;
  overs: number;
  wickets: number;
  target?: number;
  currentOver: number[];
  tokens: number;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({
  runs,
  balls,
  overs,
  wickets,
  target,
  currentOver,
  tokens
}) => {
  const ballsInOver = balls % 6;
  const completedOvers = Math.floor(balls / 6);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Main Score */}
      <Card className="border-cricket-boundary bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground">Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary">
            {runs}/{wickets}
          </div>
          <div className="text-sm text-muted-foreground">
            {completedOvers}.{ballsInOver} overs
          </div>
        </CardContent>
      </Card>

      {/* Target/Run Rate */}
      <Card className="border-cricket-boundary bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
            <Target className="h-4 w-4" />
            {target ? 'Target' : 'Run Rate'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {target ? `${target}` : `${(runs / Math.max(balls / 6, 1)).toFixed(1)}`}
          </div>
          <div className="text-sm text-muted-foreground">
            {target ? `Need ${Math.max(0, target - runs)} runs` : 'per over'}
          </div>
        </CardContent>
      </Card>

      {/* Tokens */}
      <Card className="border-cricket-gold bg-cricket-gold/10 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-cricket-gold flex items-center gap-2">
            <Zap className="h-4 w-4" />
            MON Tokens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-cricket-gold">
            {tokens.toLocaleString()}
          </div>
          <div className="text-sm text-cricket-gold/70">
            Earned this match
          </div>
        </CardContent>
      </Card>

      {/* Current Over */}
      <Card className="border-cricket-boundary bg-card/50 backdrop-blur-sm md:col-span-3">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
            <Clock className="h-4 w-4" />
            This Over
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: 6 }, (_, i) => (
              <div 
                key={i}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                  i < currentOver.length
                    ? currentOver[i] === 6
                      ? 'bg-cricket-gold text-background border-cricket-gold'
                      : currentOver[i] === 4
                      ? 'bg-success text-success-foreground border-success'
                      : currentOver[i] === 0
                      ? 'bg-destructive text-destructive-foreground border-destructive'
                      : 'bg-primary text-primary-foreground border-primary'
                    : 'border-border bg-background'
                }`}
              >
                {i < currentOver.length ? currentOver[i] : ''}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};