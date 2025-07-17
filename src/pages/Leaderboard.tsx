import React from 'react';
import { Trophy, Medal, Crown, Star, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Leaderboard() {
  const topPlayers = [
    { rank: 1, name: 'CricketKing2024', tokens: 2500000, runs: 15420, sixes: 312, fours: 598, matches: 156, winRate: 87 },
    { rank: 2, name: 'SixMaster', tokens: 2200000, runs: 14200, sixes: 298, fours: 567, matches: 142, winRate: 84 },
    { rank: 3, name: 'BoundaryHunter', tokens: 1950000, runs: 13100, sixes: 267, fours: 612, matches: 138, winRate: 81 },
    { rank: 4, name: 'PowerPlay Pro', tokens: 1800000, runs: 12500, sixes: 245, fours: 589, matches: 134, winRate: 79 },
    { rank: 5, name: 'StrikeRate King', tokens: 1650000, runs: 11800, sixes: 223, fours: 556, matches: 128, winRate: 76 },
    { rank: 6, name: 'Cricket Legend', tokens: 1500000, runs: 11200, sixes: 201, fours: 534, matches: 125, winRate: 74 },
    { rank: 7, name: 'Batting Ace', tokens: 1350000, runs: 10600, sixes: 189, fours: 512, matches: 121, winRate: 72 },
    { rank: 8, name: 'Run Machine', tokens: 1200000, runs: 10100, sixes: 178, fours: 489, matches: 118, winRate: 69 },
    { rank: 9, name: 'Cricket Master', tokens: 1100000, runs: 9500, sixes: 165, fours: 467, matches: 115, winRate: 67 },
    { rank: 10, name: 'Game Changer', tokens: 1000000, runs: 9000, sixes: 152, fours: 445, matches: 112, winRate: 64 }
  ];

  const weeklyLeaders = [
    { rank: 1, name: 'WeeklyChamp', tokens: 85000, runs: 420, change: '+15' },
    { rank: 2, name: 'RisingStar', tokens: 72000, runs: 380, change: '+8' },
    { rank: 3, name: 'ConsistentHitter', tokens: 68000, runs: 365, change: '+5' },
  ];

  const achievements = [
    { title: 'Century Maker', description: 'Score 100+ runs in a single match', icon: Trophy, rarity: 'Legendary' },
    { title: 'Six Machine', description: 'Hit 10 sixes in one match', icon: Star, rarity: 'Epic' },
    { title: 'Consistent Player', description: 'Play 50 consecutive days', icon: Medal, rarity: 'Rare' },
    { title: 'Token Millionaire', description: 'Earn 1,000,000 tokens', icon: Crown, rarity: 'Legendary' },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Trophy className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'Epic':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'Rare':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-cricket-primary">Leaderboard</h1>
        <p className="text-xl text-muted-foreground">
          Compete with the best cricket players worldwide
        </p>
      </div>

      <Tabs defaultValue="overall" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overall">Overall Rankings</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Leaders</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        {/* Overall Rankings */}
        <TabsContent value="overall" className="space-y-6">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topPlayers.slice(0, 3).map((player, index) => (
              <Card key={player.rank} className={`relative overflow-hidden ${index === 0 ? 'ring-2 ring-yellow-500' : ''}`}>
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-center mb-2">
                    {getRankIcon(player.rank)}
                  </div>
                  <CardTitle className="text-lg">{player.name}</CardTitle>
                  {index === 0 && (
                    <Badge className="bg-yellow-500 text-black">Champion</Badge>
                  )}
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <div className="text-2xl font-bold text-cricket-primary">
                    {player.tokens.toLocaleString()} MON
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {player.runs.toLocaleString()} runs • {player.matches} matches
                  </div>
                  <div className="text-sm">
                    Win Rate: <span className="font-semibold text-green-600">{player.winRate}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Full Rankings Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Complete Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPlayers.map((player) => (
                  <div key={player.rank} className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-center w-10">
                      {getRankIcon(player.rank)}
                    </div>
                    
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-cricket-primary text-white">
                        {player.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="font-semibold">{player.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {player.runs.toLocaleString()} runs • {player.sixes} sixes • {player.fours} fours
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-cricket-primary">
                        {player.tokens.toLocaleString()} MON
                      </div>
                      <div className="text-sm text-green-600">
                        {player.winRate}% win rate
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Weekly Leaders */}
        <TabsContent value="weekly" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                This Week's Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyLeaders.map((player) => (
                  <div key={player.rank} className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-center w-10">
                      {getRankIcon(player.rank)}
                    </div>
                    
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-cricket-secondary text-white">
                        {player.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="font-semibold">{player.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {player.runs} runs this week
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-cricket-primary">
                        {player.tokens.toLocaleString()} MON
                      </div>
                      <Badge variant="secondary" className="text-green-600">
                        {player.change}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button>View Your Weekly Progress</Button>
          </div>
        </TabsContent>

        {/* Achievements */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card key={index} className="relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-20 h-20 ${getRarityColor(achievement.rarity)} opacity-10 rounded-bl-full`} />
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${getRarityColor(achievement.rarity)} text-white`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        <Badge variant="outline" className={`${getRarityColor(achievement.rarity)} text-white border-none`}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{achievement.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Community Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-cricket-primary">50,247</div>
                  <div className="text-sm text-muted-foreground">Total Players</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cricket-primary">1.2M</div>
                  <div className="text-sm text-muted-foreground">Matches Played</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cricket-primary">45.8M</div>
                  <div className="text-sm text-muted-foreground">Total Runs</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cricket-primary">892K</div>
                  <div className="text-sm text-muted-foreground">Boundaries Hit</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}