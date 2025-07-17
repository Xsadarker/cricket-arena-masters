import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, Home, Users, BarChart3, Gamepad2, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Play Game', href: '/game', icon: Gamepad2 },
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
    { name: 'Stats', href: '/stats', icon: BarChart3 },
    { name: 'About', href: '/about', icon: Users },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cricket-primary via-cricket-secondary to-cricket-accent">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/20 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cricket-primary to-cricket-secondary">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-cricket-primary">Cricket Arena</h1>
                <p className="text-xs text-muted-foreground">Masters League</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.name} to={item.href}>
                    <Button
                      variant={isActive(item.href) ? "default" : "ghost"}
                      size="sm"
                      className={cn(
                        "flex items-center gap-2",
                        isActive(item.href) && "bg-cricket-primary text-white"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                <Gamepad2 className="h-5 w-5" />
              </Button>
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/game">
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/game">Play Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/20 bg-background/50 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cricket-primary to-cricket-secondary">
                  <Trophy className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-cricket-primary">Cricket Arena Masters</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Experience the thrill of cricket with blockchain technology. 
                Play, compete, and earn in the ultimate cricket gaming platform.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-cricket-primary">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.href} 
                      className="text-muted-foreground hover:text-cricket-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Game Features */}
            <div className="space-y-4">
              <h3 className="font-semibold text-cricket-primary">Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>🏏 Interactive 2D Cricket</li>
                <li>💰 Token Rewards System</li>
                <li>🔗 Blockchain Integration</li>
                <li>🏆 Tournament Modes</li>
                <li>📊 Performance Analytics</li>
              </ul>
            </div>

            {/* Community */}
            <div className="space-y-4">
              <h3 className="font-semibold text-cricket-primary">Community</h3>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Join thousands of players worldwide in the ultimate cricket experience.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Discord</Button>
                  <Button variant="outline" size="sm">Twitter</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Cricket Arena Masters. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground mt-4 md:mt-0">
              <a href="#" className="hover:text-cricket-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-cricket-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-cricket-primary transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};