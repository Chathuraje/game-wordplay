"use client";

import type React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface KeyboardProps {
  onGuess: (letter: string) => void;
  guessedLetters: Set<string>;
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const Keyboard: React.FC<KeyboardProps> = ({ onGuess, guessedLetters }) => {
  return (
    <div className="grid grid-cols-7 sm:grid-cols-9 gap-1 sm:gap-2 p-2 md:p-4 self-stretch">
      {alphabet.map((letter) => {
        const isGuessed = guessedLetters.has(letter);
        return (
          <Button
            key={letter}
            data-key={letter} // Add data-key for animation targeting
            variant={isGuessed ? "secondary" : "outline"} // Use secondary for guessed, outline for active
            size="sm" // Smaller buttons for keyboard layout
            onClick={() => onGuess(letter)}
            disabled={isGuessed}
            className={cn(
              "font-mono text-lg sm:text-xl md:text-2xl p-1 aspect-square transition-all duration-200",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1", // Ensure focus is visible
              isGuessed ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent/10 hover:border-accent',
              // Add animation classes here if needed for correct/incorrect feedback
            )}
            aria-label={`Guess letter ${letter}${isGuessed ? ' (already guessed)' : ''}`}
          >
            {letter}
          </Button>
        );
      })}
    </div>
  );
};
