"use client";

import type React from 'react';
import { cn } from '@/lib/utils';

interface WordDisplayProps {
  word: string;
  guessedLetters: Set<string>;
  gameStatus: 'playing' | 'won' | 'lost';
}

export const WordDisplay: React.FC<WordDisplayProps> = ({ word, guessedLetters, gameStatus }) => {
  const getDisplayedWord = () => {
    return word
      .split('')
      .map((letter) => {
        if (guessedLetters.has(letter)) {
          return letter;
        }
        return '_';
      })
      .join(' ');
  };

  return (
    <div
      className={cn(
        "text-2xl sm:text-3xl md:text-4xl font-mono tracking-widest text-center p-4 rounded-md",
        "transition-colors duration-300",
        gameStatus === 'won' ? 'text-accent' : '',
        gameStatus === 'lost' ? 'text-destructive' : '',
        gameStatus === 'won' ? 'bg-accent/10' : '',
        gameStatus === 'lost' ? 'bg-destructive/10' : '',
      )}
      aria-label={`Word to guess: ${getDisplayedWord().replace(/_/g, 'blank')}`} // Accessibility improvement
    >
      {/* Reveal full word on win/loss */}
      {gameStatus === 'playing' ? getDisplayedWord() : word.split('').join(' ')}
    </div>
  );
};
