import React from 'react';
import { BarChart3, TrendingUp, Target, Zap, Trophy, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Stats() {
  const playerStats = {
    totalMatches: 89,
    totalRuns: 4520,
    totalTokens: 450000,
    winRate: 73,
    averageScore: 51,
    highestScore: 134,
    sixes: 89,
    fours: 245,
    strikeRate: 142.5,
    currentStreak: 7
  };

  const recentMatches = [
    { date: '2024-01-15', mode: 'Quick Match', runs: 67, tokens: 2840, result: 'Won' },
    { date: '2024-01-14', mode: 'Tournament', runs: 45, tokens: 1960, result: 'Won' },
    { date: '2024-01-13', mode: 'Career', runs: 89, tokens: 4120, result: 'Won' },
    { date: '2024-01-12', mode: 'Quick Match', runs: 23, tokens: 980, result: 'Lost' },
    { date: '2024-01-11', mode: 'Tournament', runs: 134, tokens: 6840, result: 'Won' },
  ];

  const achievements = [
    { title: 'First Century', description: 'Scored 100+ runs', progress: 100, maxProgress: 100 },
    { title: 'Boundary Master', description: 'Hit 200 boundaries', progress: 245, maxProgress: 200 },
    { title: 'Token Collector', description: 'Earn 500K tokens', progress: 450000, maxProgress: 500000 },
    { title: 'Winning Streak', description: 'Win 10 matches in a row', progress: 7, maxProgress: 10 },
  ];

  const monthlyData = [
    { month: 'Oct', runs: 1200, tokens: 125000, matches: 28 },
    { month: 'Nov', runs: 1450, tokens: 142000, matches: 32 },
    { month: 'Dec', runs: 1580, tokens: 158000, matches: 35 },
    { month: 'Jan', runs: 1870, tokens: 183000, matches: 41 },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-cricket-primary">Player Statistics</h1>
        <p className="text-xl text-muted-foreground">
          Track your cricket journey and performance
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="history">Match History</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-cricket-primary">{playerStats.totalMatches}</div>
                <div className="text-sm text-muted-foreground">Total Matches</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-cricket-primary">{playerStats.totalRuns.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Runs</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-cricket-primary">{playerStats.totalTokens.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Tokens Earned</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600">{playerStats.winRate}%</div>
                <div className="text-sm text-muted-foreground">Win Rate</div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Batting Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Average Score</span>
                  <span className="font-bold">{playerStats.averageScore}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Highest Score</span>
                  <span className="font-bold text-cricket-primary">{playerStats.highestScore}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Strike Rate</span>
                  <span className="font-bold">{playerStats.strikeRate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Boundaries</span>
                  <span className="font-bold">{playerStats.sixes + playerStats.fours}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Current Season
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Current Streak</span>
                  <Badge className="bg-green-500">
                    {playerStats.currentStreak} wins
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>This Month</span>
                  <span className="font-bold">12 matches</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Rank</span>
                  <span className="font-bold text-cricket-primary">#247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>League</span>
                  <Badge variant="outline">Gold League</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Monthly Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {monthlyData.map((month, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{month.month} 2024</span>
                      <div className="text-sm text-muted-foreground">
                        {month.matches} matches • {month.runs} runs • {month.tokens.toLocaleString()} tokens
                      </div>
                    </div>
                    <Progress value={(month.runs / 2000) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Boundary Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Sixes</span>
                  <div className="flex items-center gap-2">
                    <Progress value={(playerStats.sixes / (playerStats.sixes + playerStats.fours)) * 100} className="w-24 h-2" />
                    <span className="font-bold">{playerStats.sixes}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Fours</span>
                  <div className="flex items-center gap-2">
                    <Progress value={(playerStats.fours / (playerStats.sixes + playerStats.fours)) * 100} className="w-24 h-2" />
                    <span className="font-bold">{playerStats.fours}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Recent Form
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  {['W', 'W', 'W', 'L', 'W', 'W', 'W'].map((result, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        result === 'W' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}
                    >
                      {result}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Excellent form! You're on a 7-match winning streak.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Achievements */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{achievement.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{achievement.progress.toLocaleString()}/{achievement.maxProgress.toLocaleString()}</span>
                    </div>
                    <Progress 
                      value={(achievement.progress / achievement.maxProgress) * 100} 
                      className="h-2"
                    />
                    {achievement.progress >= achievement.maxProgress && (
                      <Badge className="bg-green-500">Completed!</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Match History */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMatches.map((match, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${match.result === 'Won' ? 'bg-green-500' : 'bg-red-500'}`} />
                      <div>
                        <div className="font-medium">{match.mode}</div>
                        <div className="text-sm text-muted-foreground">{match.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{match.runs} runs</div>
                      <div className="text-sm text-cricket-primary">+{match.tokens.toLocaleString()} tokens</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}