import React from 'react';
import { TrendingUp, Target, Zap, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GameStatsProps {
  totalRuns: number;
  totalBalls: number;
  boundaries: { fours: number; sixes: number };
  strikeRate: number;
  totalTokens: number;
  achievements: string[];
}

export const GameStats: React.FC<GameStatsProps> = ({
  totalRuns,
  totalBalls,
  boundaries,
  strikeRate,
  totalTokens,
  achievements
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="border-cricket-boundary bg-card/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Strike Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">
            {strikeRate.toFixed(1)}
          </div>
        </CardContent>
      </Card>

      <Card className="border-cricket-boundary bg-card/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
            <Target className="h-4 w-4" />
            Boundaries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold text-foreground">
            4s: {boundaries.fours} | 6s: {boundaries.sixes}
          </div>
        </CardContent>
      </Card>

      <Card className="border-cricket-gold bg-cricket-gold/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-cricket-gold flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Total Tokens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-cricket-gold">
            {totalTokens.toLocaleString()}
          </div>
        </CardContent>
      </Card>

      <Card className="border-cricket-boundary bg-card/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
            <Award className="h-4 w-4" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {achievements.length}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};