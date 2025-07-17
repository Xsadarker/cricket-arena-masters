import React from 'react';
import { Shield, Zap, Users, Trophy, Smartphone, Globe, Heart, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function About() {
  const features = [
    {
      icon: Zap,
      title: "Instant Rewards",
      description: "Earn MON tokens instantly for every run, boundary, and achievement in real-time blockchain transactions."
    },
    {
      icon: Shield,
      title: "Secure & Transparent",
      description: "Built on blockchain technology ensuring fair play, transparent rewards, and secure wallet integration."
    },
    {
      icon: Users,
      title: "Global Community",
      description: "Join thousands of cricket enthusiasts from around the world competing in tournaments and leagues."
    },
    {
      icon: Trophy,
      title: "Competitive Gaming",
      description: "Multiple game modes from quick matches to career progression with realistic cricket physics."
    },
    {
      icon: Smartphone,
      title: "Cross-Platform",
      description: "Play seamlessly across desktop and mobile devices with responsive design and touch controls."
    },
    {
      icon: Globe,
      title: "Web3 Integration",
      description: "Connect MetaMask and other EVM wallets for secure betting, rewards, and NFT achievements."
    }
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "Lead Developer",
      description: "Full-stack developer with 8 years experience in blockchain and gaming.",
      avatar: "AJ"
    },
    {
      name: "Sarah Chen",
      role: "Game Designer",
      description: "Cricket enthusiast and game mechanics specialist with a passion for user experience.",
      avatar: "SC"
    },
    {
      name: "Mike Rodriguez",
      role: "Blockchain Engineer",
      description: "Smart contract developer ensuring secure and efficient token transactions.",
      avatar: "MR"
    },
    {
      name: "Priya Patel",
      role: "Cricket Consultant",
      description: "Former professional cricketer ensuring authentic gameplay mechanics.",
      avatar: "PP"
    }
  ];

  const roadmap = [
    {
      phase: "Phase 1",
      title: "Core Game Launch",
      status: "Completed",
      features: ["Basic cricket gameplay", "Token rewards system", "Wallet integration"]
    },
    {
      phase: "Phase 2",
      title: "Enhanced Features",
      status: "Current",
      features: ["Interactive 2D cricket", "Advanced physics", "Tournament modes"]
    },
    {
      phase: "Phase 3",
      title: "Social Features",
      status: "Coming Soon",
      features: ["Multiplayer matches", "Friend challenges", "Guild system"]
    },
    {
      phase: "Phase 4",
      title: "NFT Integration",
      status: "Planned",
      features: ["Collectible player cards", "Special equipment NFTs", "Stadium customization"]
    }
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-cricket-primary via-cricket-secondary to-cricket-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About Cricket Arena Masters
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            The world's first blockchain-powered cricket game that combines traditional cricket gameplay 
            with modern Web3 technology to create an immersive, rewarding experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/game">Start Playing</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              Read Whitepaper
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-cricket-primary">Our Mission</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              To revolutionize cricket gaming by creating an authentic, skill-based experience that rewards 
              players with real value through blockchain technology. We believe cricket fans deserve more 
              than just entertainment – they deserve to be rewarded for their passion and skill.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <Heart className="h-12 w-12 text-cricket-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Passion</h3>
                <p className="text-muted-foreground">Built by cricket lovers for cricket lovers</p>
              </div>
              <div className="text-center">
                <Star className="h-12 w-12 text-cricket-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-muted-foreground">Pushing boundaries in gaming technology</p>
              </div>
              <div className="text-center">
                <Trophy className="h-12 w-12 text-cricket-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-muted-foreground">Committed to quality and fair play</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-cricket-secondary/10 to-cricket-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-cricket-primary mb-4">
              What Makes Us Different
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cricket Arena Masters isn't just another cricket game. We've built a comprehensive 
              ecosystem that rewards skill, strategy, and dedication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-cricket-primary mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground">
              A passionate group of developers, designers, and cricket enthusiasts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-cricket-primary to-cricket-secondary rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {member.avatar}
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Badge variant="outline" className="w-fit mx-auto">{member.role}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 bg-gradient-to-br from-cricket-secondary/10 to-cricket-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-cricket-primary mb-4">
              Development Roadmap
            </h2>
            <p className="text-xl text-muted-foreground">
              Our journey to create the ultimate cricket gaming experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmap.map((phase, index) => (
              <Card key={index} className={`relative ${phase.status === 'Current' ? 'ring-2 ring-cricket-primary' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{phase.phase}</CardTitle>
                    <Badge 
                      variant={phase.status === 'Completed' ? 'default' : 
                              phase.status === 'Current' ? 'destructive' : 'secondary'}
                    >
                      {phase.status}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-cricket-primary">{phase.title}</h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {phase.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-2 h-2 bg-cricket-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-cricket-primary to-cricket-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join the Revolution?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the future of cricket gaming where your skills are rewarded with real value.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/game">Start Playing Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              Join Community
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}