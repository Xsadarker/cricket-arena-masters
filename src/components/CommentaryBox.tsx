import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CommentaryBoxProps {
  lastScore: number;
  totalRuns: number;
  ballsPlayed: number;
}

export const CommentaryBox: React.FC<CommentaryBoxProps> = ({
  lastScore,
  totalRuns,
  ballsPlayed
}) => {
  const [commentary, setCommentary] = useState<string[]>([
    "Welcome to Cricket Arena Masters! Let's play some cricket!"
  ]);
  const [isMuted, setIsMuted] = useState(false);

  const getCommentary = (score: number, runs: number, balls: number) => {
    const comments = {
      0: [
        "Dot ball! Good bowling there.",
        "No run there, pressure building!",
        "Excellent defensive shot, no run taken."
      ],
      1: [
        "Single taken, good running between the wickets!",
        "One run added to the total.",
        "Smart cricket, rotating the strike."
      ],
      2: [
        "Two runs! Great placement and quick running!",
        "Couple of runs, good cricket shot.",
        "Nice shot for two, keeping the scoreboard ticking."
      ],
      3: [
        "Three runs! Excellent running between the wickets!",
        "Triple! Great shot and even better running.",
        "Three runs taken, fantastic cricket!"
      ],
      4: [
        "FOUR! What a beautiful boundary shot! 🎯",
        "BOUNDARY! Magnificent stroke to the fence! ⚡",
        "FOUR RUNS! Perfectly timed shot! 🏏",
        "That's a cracking four! Shot of the match so far!"
      ],
      6: [
        "SIX! MAXIMUM! What a shot! 🚀",
        "HUGE SIX! That's out of the park! 💥",
        "MAXIMUM! Incredible power hitting! ⚡",
        "SIX RUNS! That ball is still traveling! 🏏",
        "MONSTER HIT! What a way to clear the boundary! 🎯"
      ]
    };

    const scoreComments = comments[score as keyof typeof comments] || comments[1];
    return scoreComments[Math.floor(Math.random() * scoreComments.length)];
  };

  useEffect(() => {
    if (ballsPlayed > 0) {
      const newComment = getCommentary(lastScore, totalRuns, ballsPlayed);
      setCommentary(prev => [newComment, ...prev.slice(0, 4)]);
    }
  }, [lastScore, totalRuns, ballsPlayed]);

  return (
    <Card className="border-cricket-boundary bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            🎙️ Live Commentary
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {commentary.map((comment, index) => (
            <div 
              key={index}
              className={`text-sm p-2 rounded-md transition-all duration-300 ${
                index === 0 
                  ? 'bg-primary/20 text-primary font-medium border border-primary/30' 
                  : 'text-muted-foreground bg-muted/50'
              }`}
            >
              {comment}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};