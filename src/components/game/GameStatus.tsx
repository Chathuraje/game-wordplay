"use client";

import type React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface GameStatusProps {
  status: 'playing' | 'won' | 'lost';
  incorrectGuesses: number;
  maxGuesses: number;
}

export const GameStatus: React.FC<GameStatusProps> = ({ status, incorrectGuesses, maxGuesses }) => {
  const guessesRemaining = maxGuesses - incorrectGuesses;
  const progressValue = (guessesRemaining / maxGuesses) * 100;

  let statusMessage = `Guesses Remaining: ${guessesRemaining}`;
  let messageStyle = "text-muted-foreground";

  if (status === 'won') {
    statusMessage = "You Won!";
    messageStyle = "text-accent font-semibold";
  } else if (status === 'lost') {
    statusMessage = "You Lost!";
    messageStyle = "text-destructive font-semibold";
  }

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <p className={cn("text-lg sm:text-xl font-medium", messageStyle)}>
        {statusMessage}
      </p>
      {status === 'playing' && (
        <div className="w-full max-w-xs flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Incorrect: {incorrectGuesses}</span>
          <Progress
            value={progressValue}
            className="h-2 flex-grow"
            aria-label={`${guessesRemaining} guesses remaining out of ${maxGuesses}`}
            aria-valuemin={0}
            aria-valuemax={maxGuesses}
            aria-valuenow={guessesRemaining}
          />
          <span className="text-sm text-muted-foreground">{maxGuesses}</span>
        </div>

      )}
    </div>
  );
};
