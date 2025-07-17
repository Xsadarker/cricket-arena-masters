import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Zap, Shield, Users, Star, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import cricketStadium from '@/assets/cricket-stadium.jpg';

export default function Home() {
  const features = [
    {
      icon: Trophy,
      title: "Tournament Modes",
      description: "Compete in Quick Matches, Tournaments, and Career Mode with progressive difficulty."
    },
    {
      icon: Zap,
      title: "Token Rewards",
      description: "Earn MON tokens for every run, boundary, and achievement in the game."
    },
    {
      icon: Shield,
      title: "Blockchain Secure",
      description: "Connect your wallet for secure betting and transparent reward distribution."
    },
    {
      icon: Users,
      title: "Multiplayer Ready",
      description: "Challenge friends or compete against AI opponents with realistic physics."
    }
  ];

  const stats = [
    { value: "50K+", label: "Active Players" },
    { value: "1M+", label: "Tokens Earned" },
    { value: "25K+", label: "Matches Played" },
    { value: "99.9%", label: "Uptime" }
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src={cricketStadium} 
            alt="Cricket Stadium" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-cricket-primary/80 via-cricket-secondary/70 to-cricket-accent/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <Badge className="mb-6 bg-white/20 text-white border-white/30">
            🎉 Now with Interactive 2D Cricket & Wallet Integration
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Cricket Arena
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Masters
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
            Experience the most immersive cricket game with blockchain rewards. 
            Play, compete, and earn tokens in realistic 2D cricket action.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/game">
                <Play className="mr-2 h-5 w-5" />
                Start Playing
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20">
              Watch Trailer
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-cricket-primary mb-4">
              Why Choose Cricket Arena Masters?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Combining traditional cricket gameplay with cutting-edge blockchain technology 
              for an unparalleled gaming experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cricket-primary to-cricket-secondary rounded-xl flex items-center justify-center">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-cricket-primary">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Game Modes Section */}
      <section className="py-20 bg-gradient-to-br from-cricket-secondary/10 to-cricket-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-cricket-primary mb-4">
              Choose Your Game Mode
            </h2>
            <p className="text-xl text-muted-foreground">
              Multiple ways to play and earn rewards
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Match */}
            <Card className="relative overflow-hidden group hover:shadow-xl transition-all">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Match
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Fast-paced cricket action. Score 50 runs to win and earn quick tokens.
                </p>
                <ul className="space-y-2 text-sm mb-6">
                  <li>⚡ Target: 50 runs</li>
                  <li>🏏 Time: 5-10 minutes</li>
                  <li>💰 Reward: 100-500 tokens</li>
                </ul>
                <Button className="w-full" asChild>
                  <Link to="/game">Play Now</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Tournament */}
            <Card className="relative overflow-hidden group hover:shadow-xl transition-all border-2 border-cricket-primary">
              <CardHeader className="bg-gradient-to-r from-cricket-primary to-cricket-secondary text-white">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Tournament
                  <Badge className="bg-yellow-500 text-black">Popular</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Compete in structured tournaments with increasing difficulty and bigger rewards.
                </p>
                <ul className="space-y-2 text-sm mb-6">
                  <li>🏆 Multi-round competition</li>
                  <li>📈 Progressive difficulty</li>
                  <li>💎 Reward: 1,000-5,000 tokens</li>
                </ul>
                <Button className="w-full" asChild>
                  <Link to="/game">Enter Tournament</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Career Mode */}
            <Card className="relative overflow-hidden group hover:shadow-xl transition-all">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Career Mode
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Build your cricket career from rookie to legend with long-term progression.
                </p>
                <ul className="space-y-2 text-sm mb-6">
                  <li>📊 Skill progression</li>
                  <li>🎯 Career achievements</li>
                  <li>🌟 Premium rewards</li>
                </ul>
                <Button className="w-full" asChild>
                  <Link to="/game">Start Career</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-cricket-primary to-cricket-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Become a Cricket Master?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Join thousands of players earning real rewards through skill and strategy. 
            Connect your wallet and start your cricket journey today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <Link to="/game">
                <Play className="mr-2 h-5 w-5" />
                Play Free Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10">
              Connect Wallet
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}