import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  active: boolean;
  caught: boolean;
}

interface Player {
  x: number;
  y: number;
  type: 'batsman' | 'bowler' | 'fielder';
  name: string;
  animated: boolean;
}

interface Interactive2DCricketProps {
  onScore: (runs: number) => void;
  onOut: () => void;
  gameActive: boolean;
}

export const Interactive2DCricket: React.FC<Interactive2DCricketProps> = ({ 
  onScore, 
  onOut, 
  gameActive 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const { toast } = useToast();

  const [ball, setBall] = useState<Ball>({ 
    x: 400, y: 350, vx: 0, vy: 0, active: false, caught: false 
  });
  const [players, setPlayers] = useState<Player[]>([
    { x: 400, y: 450, type: 'batsman', name: 'You', animated: false },
    { x: 400, y: 50, type: 'bowler', name: 'Fast Bowler', animated: false },
    { x: 150, y: 200, type: 'fielder', name: 'Slip', animated: false },
    { x: 650, y: 200, type: 'fielder', name: 'Point', animated: false },
    { x: 400, y: 150, type: 'fielder', name: 'Mid-off', animated: false },
    { x: 200, y: 350, type: 'fielder', name: 'Square Leg', animated: false },
    { x: 600, y: 350, type: 'fielder', name: 'Cover', animated: false },
    { x: 300, y: 400, type: 'fielder', name: 'Mid-wicket', animated: false },
    { x: 500, y: 400, type: 'fielder', name: 'Long-on', animated: false }
  ]);

  const [timing, setTiming] = useState([50]);
  const [shotPower, setShotPower] = useState([50]);
  const [isHolding, setIsHolding] = useState(false);
  const [bowlerDelivering, setBowlerDelivering] = useState(false);

  // Game physics and rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw field
      drawField(ctx);
      
      // Draw players
      players.forEach(player => drawPlayer(ctx, player));
      
      // Draw ball
      if (ball.active) {
        drawBall(ctx, ball);
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [players, ball]);

  // Ball physics
  useEffect(() => {
    if (!ball.active || !gameActive) return;

    const interval = setInterval(() => {
      setBall(prev => {
        let newX = prev.x + prev.vx;
        let newY = prev.y + prev.vy;
        let newVx = prev.vx * 0.995; // Air resistance
        let newVy = prev.vy * 0.995 + 0.1; // Gravity

        // Boundary collision
        if (newX <= 10 || newX >= 790) {
          newVx = -newVx * 0.7;
          newX = Math.max(10, Math.min(790, newX));
        }
        if (newY <= 10 || newY >= 490) {
          newVy = -newVy * 0.7;
          newY = Math.max(10, Math.min(490, newY));
        }

        // Check if caught by fielder
        const caughtByFielder = players.some(player => {
          if (player.type === 'fielder') {
            const distance = Math.sqrt((newX - player.x) ** 2 + (newY - player.y) ** 2);
            return distance < 25 && Math.abs(newVy) > 1; // Ball must be moving
          }
          return false;
        });

        if (caughtByFielder) {
          toast({
            title: "🏏 CAUGHT OUT!",
            description: "The fielder took a brilliant catch!",
            variant: "destructive"
          });
          onOut();
          return { x: 400, y: 350, vx: 0, vy: 0, active: false, caught: true };
        }

        // Check if ball has settled
        if (Math.abs(newVx) < 0.3 && Math.abs(newVy) < 0.3 && newY > 480) {
          const distance = Math.sqrt((newX - 400) ** 2 + (newY - 450) ** 2);
          let runs = 0;
          
          if (distance > 200) {
            runs = 6; // Six
          } else if (distance > 150) {
            runs = 4; // Four
          } else if (distance > 80) {
            runs = Math.floor(Math.random() * 3) + 1; // 1-3 runs
          }

          if (runs > 0) {
            onScore(runs);
          }

          return { x: 400, y: 350, vx: 0, vy: 0, active: false, caught: false };
        }

        return { x: newX, y: newY, vx: newVx, vy: newVy, active: true, caught: false };
      });
    }, 16);

    return () => clearInterval(interval);
  }, [ball.active, gameActive, players, onScore, onOut, toast]);

  const drawField = (ctx: CanvasRenderingContext2D) => {
    // Field background
    ctx.fillStyle = '#4ade80'; // Green field
    ctx.fillRect(0, 0, 800, 500);
    
    // Boundary circle
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(400, 250, 200, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Pitch
    ctx.fillStyle = '#d4a574';
    ctx.fillRect(390, 200, 20, 200);
    
    // Stumps
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(398, 440, 4, 20);
    ctx.fillRect(398, 40, 4, 20);
    
    // Crease lines
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(380, 460);
    ctx.lineTo(420, 460);
    ctx.moveTo(380, 40);
    ctx.lineTo(420, 40);
    ctx.stroke();
  };

  const drawPlayer = (ctx: CanvasRenderingContext2D, player: Player) => {
    const { x, y, type, animated } = player;
    
    // Player body
    ctx.fillStyle = type === 'batsman' ? '#3b82f6' : 
                   type === 'bowler' ? '#ef4444' : '#64748b';
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.fill();
    
    // Animation for batsman when batting
    if (type === 'batsman' && animated) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x - 10, y);
      ctx.lineTo(x + 10, y - 15);
      ctx.stroke();
    }
    
    // Animation for bowler when bowling
    if (type === 'bowler' && animated) {
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + 20);
      ctx.stroke();
    }
  };

  const drawBall = (ctx: CanvasRenderingContext2D, ball: Ball) => {
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    
    // Ball trail effect
    ctx.fillStyle = 'rgba(220, 38, 38, 0.3)';
    ctx.beginPath();
    ctx.arc(ball.x - ball.vx, ball.y - ball.vy, 3, 0, 2 * Math.PI);
    ctx.fill();
  };

  const deliverBall = useCallback(() => {
    if (!gameActive || ball.active || bowlerDelivering) return;
    
    setBowlerDelivering(true);
    
    // Animate bowler
    setPlayers(prev => prev.map(p => 
      p.type === 'bowler' ? { ...p, animated: true } : p
    ));

    setTimeout(() => {
      // Random delivery speed and angle
      const speed = 8 + Math.random() * 4; // 8-12 speed
      const angle = (Math.PI / 2) + (Math.random() - 0.5) * 0.3; // Slight variation
      
      setBall({
        x: 400,
        y: 70,
        vx: Math.sin(angle) * speed * (Math.random() > 0.5 ? 1 : -1),
        vy: Math.cos(angle) * speed,
        active: true,
        caught: false
      });
      
      setBowlerDelivering(false);
      setPlayers(prev => prev.map(p => ({ ...p, animated: false })));
    }, 500);
  }, [gameActive, ball.active, bowlerDelivering]);

  const playShot = useCallback(() => {
    if (!ball.active || !gameActive) return;
    
    const timingValue = timing[0];
    const powerValue = shotPower[0];
    
    // Animate batsman
    setPlayers(prev => prev.map(p => 
      p.type === 'batsman' ? { ...p, animated: true } : p
    ));

    setTimeout(() => {
      setPlayers(prev => prev.map(p => ({ ...p, animated: false })));
    }, 300);

    // Calculate shot based on timing and power
    const timingFactor = 1 - Math.abs(timingValue - 50) / 50; // Best at 50
    const shotAngle = -Math.PI / 3 + (powerValue / 100) * (Math.PI / 6);
    const shotSpeed = (powerValue / 100) * 15 * timingFactor;
    
    setBall(prev => ({
      ...prev,
      vx: prev.vx + Math.cos(shotAngle) * shotSpeed,
      vy: prev.vy + Math.sin(shotAngle) * shotSpeed
    }));

    // Show timing feedback
    if (timingFactor > 0.8) {
      toast({
        title: "🎯 Perfect Timing!",
        description: "Excellent shot timing!"
      });
    } else if (timingFactor > 0.5) {
      toast({
        title: "👍 Good Timing",
        description: "Decent shot"
      });
    } else {
      toast({
        title: "⚠️ Mistimed",
        description: "Work on your timing!"
      });
    }
  }, [ball.active, gameActive, timing, shotPower, toast]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Interactive 2D Cricket</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Game Canvas */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            className="border-2 border-border rounded-lg bg-gradient-to-b from-sky-300 to-green-400"
          />
          
          {/* Game Status Overlay */}
          <div className="absolute top-2 left-2 bg-black/70 text-white p-2 rounded text-sm">
            {bowlerDelivering ? "Bowler delivering..." : 
             ball.active ? "Ball in play" : "Ready for delivery"}
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Timing Control */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Shot Timing</label>
            <Slider
              value={timing}
              onValueChange={setTiming}
              max={100}
              step={1}
              className="w-full"
              disabled={!ball.active}
            />
            <div className="text-xs text-muted-foreground text-center">
              {timing[0]}% (50% is perfect)
            </div>
          </div>

          {/* Power Control */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Shot Power</label>
            <Slider
              value={shotPower}
              onValueChange={setShotPower}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="text-xs text-muted-foreground text-center">
              {shotPower[0]}% power
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 justify-center">
          <Button
            onClick={deliverBall}
            disabled={!gameActive || ball.active || bowlerDelivering}
            variant="outline"
          >
            {bowlerDelivering ? "Bowling..." : "Deliver Ball"}
          </Button>
          
          <Button
            onClick={playShot}
            disabled={!ball.active || !gameActive}
            onMouseDown={() => setIsHolding(true)}
            onMouseUp={() => setIsHolding(false)}
            onMouseLeave={() => setIsHolding(false)}
            className={cn(
              isHolding && ball.active && "bg-primary/80 scale-95 transition-all"
            )}
          >
            Play Shot
          </Button>
        </div>

        {/* Instructions */}
        <div className="text-xs text-muted-foreground space-y-1 bg-secondary/50 p-3 rounded">
          <p>🎯 <strong>How to play:</strong></p>
          <p>• Click "Deliver Ball" to start the ball</p>
          <p>• Adjust timing (aim for 50%) and power sliders</p>
          <p>• Click "Play Shot" when ball approaches</p>
          <p>• Avoid fielders - they can catch you out!</p>
          <p>• Distance determines runs: 6 (far), 4 (medium), 1-3 (close)</p>
        </div>
      </CardContent>
    </Card>
  );
};