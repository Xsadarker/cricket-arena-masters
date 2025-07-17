import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  active: boolean;
}

interface CricketFieldProps {
  onScore: (runs: number) => void;
  gameActive: boolean;
}

export const CricketField: React.FC<CricketFieldProps> = ({ onScore, gameActive }) => {
  const [ball, setBall] = useState<Ball>({ x: 300, y: 200, vx: 0, vy: 0, active: false });
  const [batPosition, setBatPosition] = useState(280);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!ball.active || !gameActive) return;

    const interval = setInterval(() => {
      setBall(prev => {
        let newX = prev.x + prev.vx;
        let newY = prev.y + prev.vy;
        let newVx = prev.vx * 0.98; // friction
        let newVy = prev.vy * 0.98;

        // Boundary detection (simplified)
        if (newX <= 0 || newX >= 600) {
          newVx = -newVx * 0.8;
          newX = Math.max(0, Math.min(600, newX));
        }
        if (newY <= 0 || newY >= 400) {
          newVy = -newVy * 0.8;
          newY = Math.max(0, Math.min(400, newY));
        }

        // Check if ball has stopped
        if (Math.abs(newVx) < 0.5 && Math.abs(newVy) < 0.5) {
          // Calculate score based on distance
          const distance = Math.sqrt((newX - 300) ** 2 + (newY - 200) ** 2);
          let runs = 0;
          
          if (distance > 150) {
            runs = 6; // Six
          } else if (distance > 100) {
            runs = 4; // Four
          } else if (distance > 50) {
            runs = Math.floor(distance / 25); // 1-2 runs
          }

          if (runs > 0) {
            setScore(prev => prev + runs);
            onScore(runs);
          }

          return { x: 300, y: 200, vx: 0, vy: 0, active: false };
        }

        return { x: newX, y: newY, vx: newVx, vy: newVy, active: true };
      });
    }, 16);

    return () => clearInterval(interval);
  }, [ball.active, gameActive, onScore]);

  const handleBat = (power: number, angle: number) => {
    if (!gameActive || ball.active) return;

    const vx = Math.cos(angle) * power;
    const vy = Math.sin(angle) * power;
    
    setBall({
      x: batPosition,
      y: 200,
      vx,
      vy,
      active: true
    });
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-gradient-field rounded-xl border-2 border-cricket-boundary p-4">
      {/* Field */}
      <div className="relative h-96 bg-cricket-field rounded-lg overflow-hidden">
        {/* Field markings */}
        <div className="absolute inset-4 border-2 border-white/30 rounded-lg" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-white/50 rounded-full" />
        
        {/* Pitch */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-4 bg-amber-100 rounded-sm" />
        
        {/* Stumps */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-amber-200 rounded-sm" />
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-amber-200 rounded-sm" />
        
        {/* Batsman */}
        <div 
          className="absolute bottom-16 w-4 h-4 bg-blue-500 rounded-full transition-all duration-200"
          style={{ left: `${batPosition}px` }}
        />
        
        {/* Ball */}
        <div 
          className={cn(
            "absolute w-3 h-3 bg-red-500 rounded-full transition-all duration-75",
            ball.active && "shadow-lg shadow-red-500/50"
          )}
          style={{ 
            left: `${ball.x}px`, 
            top: `${ball.y}px`,
            display: ball.active ? 'block' : 'none'
          }}
        />
      </div>
      
      {/* Controls */}
      <div className="mt-4 space-y-3">
        <div className="flex justify-center space-x-2">
          <Button 
            variant="game" 
            size="sm"
            onClick={() => handleBat(8, -Math.PI/3)}
            disabled={!gameActive || ball.active}
          >
            Defensive
          </Button>
          <Button 
            variant="game" 
            size="sm"
            onClick={() => handleBat(15, -Math.PI/4)}
            disabled={!gameActive || ball.active}
          >
            Drive
          </Button>
          <Button 
            variant="game" 
            size="sm"
            onClick={() => handleBat(25, -Math.PI/6)}
            disabled={!gameActive || ball.active}
          >
            Big Hit
          </Button>
        </div>
        
        <div className="flex justify-center">
          <input
            type="range"
            min="250"
            max="350"
            value={batPosition}
            onChange={(e) => setBatPosition(Number(e.target.value))}
            className="w-32"
            disabled={!gameActive || ball.active}
          />
        </div>
      </div>
    </div>
  );
};