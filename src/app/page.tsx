"use client";

import { useState, useEffect, useCallback } from 'react';
import { WordDisplay } from '@/components/game/WordDisplay';
import { Keyboard } from '@/components/game/Keyboard';
import { GameStatus } from '@/components/game/GameStatus';
import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

const words = ["react", "nextjs", "tailwind", "firebase", "studio", "hangman", "wordplay", "javascript", "typescript", "component"];
const MAX_INCORRECT_GUESSES = 6;

type GameStatusType = 'playing' | 'won' | 'lost';

export default function Home() {
  const [secretWord, setSecretWord] = useState<string>('');
  const [hint, setHint] = useState<string>('');
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [incorrectGuesses, setIncorrectGuesses] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<GameStatusType>('playing');
  const { toast } = useToast();
  const [loadingWord, setLoadingWord] = useState<boolean>(false);


  const selectNewWord = useCallback(async () => {
    setLoadingWord(true); // start loading
    try {
      const response = await axios.get('/api/get-the-word');
      setSecretWord(response.data.word.toUpperCase());
      setHint(response.data.hint);

    } catch (error) {
      console.error('Error fetching word:', error);
      const randomIndex = Math.floor(Math.random() * words.length);
      setSecretWord(words[randomIndex].toUpperCase());
      setHint('');
    } finally {
      setLoadingWord(false); // stop loading
    }
  }, []);



  const resetGame = useCallback(async () => {
    await selectNewWord();
    setGuessedLetters(new Set());
    setIncorrectGuesses(0);
    setGameStatus('playing');
  }, [selectNewWord]);


  // Initialize game on mount
  useEffect(() => {
    (async () => {
      await resetGame();
    })();
  }, [resetGame]);


  // Check win/loss conditions after each guess
  useEffect(() => {
    if (!secretWord) return;

    // Check for win
    const wordLetters = new Set(secretWord.split(''));
    const correctlyGuessedLetters = new Set(
      [...guessedLetters].filter(letter => wordLetters.has(letter))
    );

    if (correctlyGuessedLetters.size === wordLetters.size) {
      setGameStatus('won');
      toast({
        title: "You Win!",
        description: `Congratulations! The word was ${secretWord}.`,
        variant: 'default',
      });
      return;
    }

    // Check for loss
    if (incorrectGuesses >= MAX_INCORRECT_GUESSES) {
      setGameStatus('lost');
      toast({
        title: "You Lost!",
        description: `Better luck next time! The word was ${secretWord}.`,
        variant: 'destructive',
      });
    }
  }, [guessedLetters, incorrectGuesses, secretWord, toast]);

  const handleGuess = useCallback((letter: string) => {
    if (gameStatus !== 'playing' || guessedLetters.has(letter)) {
      return;
    }

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);

    if (!secretWord.includes(letter)) {
      setIncorrectGuesses(prev => prev + 1);

      const button = document.querySelector(`[data-key="${letter}"]`);
      button?.classList.add('animate-shake');
      setTimeout(() => button?.classList.remove('animate-shake'), 500);
    } else {
      const button = document.querySelector(`[data-key="${letter}"]`);
      button?.classList.add('animate-pop');
      setTimeout(() => button?.classList.remove('animate-pop'), 300);
    }
  }, [guessedLetters, gameStatus, secretWord]);


  // Add keydown listener for keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const letter = event.key.toUpperCase();
      // Check if the key pressed is a single letter and the game is playing
      if (letter.length === 1 && letter >= 'A' && letter <= 'Z' && gameStatus === 'playing') {
        handleGuess(letter);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleGuess, gameStatus]);


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 bg-background text-foreground">
      <Toaster />
      <div className="w-full max-w-2xl flex flex-col items-center gap-8 p-6 md:p-10 bg-card rounded-lg shadow-md">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight">WordPlay</h1>

        <GameStatus
          status={gameStatus}
          incorrectGuesses={incorrectGuesses}
          maxGuesses={MAX_INCORRECT_GUESSES}
        />

        {loadingWord ? (
          <div className="flex items-center justify-center h-24">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          secretWord && (
            <div className="w-full">
              <WordDisplay
                word={secretWord}
                guessedLetters={guessedLetters}
                gameStatus={gameStatus}
              />

              {hint && gameStatus === 'playing' && (
                <p className="text-sm text-muted-foreground italic text-center">
                  Hint: {hint}
                </p>
              )}
            </div>
          )
        )}



        {gameStatus === 'playing' && (
          <Keyboard
            onGuess={handleGuess}
            guessedLetters={guessedLetters}
          />
        )
        }


        <Button onClick={resetGame} variant="outline" size="lg">
          <RotateCw className="mr-2 h-5 w-5" />
          New Game
        </Button>
      </div>
    </main>
  );
}
