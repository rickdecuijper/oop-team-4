/**
 * WordleGameLogic handles the core logic for the Wordle puzzle:
 */

export type LetterStatus = 'correct' | 'present' | 'absent' | 'empty';

export interface LetterResult {
  letter: string;
  status: LetterStatus;
}

export interface GuessResult {
  guess: string;
  letterResults: LetterResult[];
}

export interface GuessState {
  letters: string[];
  statuses: LetterStatus[];
}

export default class WordleGameLogic {
  private solutionWord: string;

  private maxAttempts: number;

  private submittedGuesses: GuessResult[];

  private currentAttempt: string;

  private gameOver: boolean;

  public onGuessSubmitted?: () => void;

  public onGameOver?: (didWin: boolean) => void;

  public constructor(solutionWord: string, maxAttempts: number = 6) {
    this.solutionWord = solutionWord.toUpperCase();
    console.log(this.solutionWord);
    this.maxAttempts = maxAttempts;
    this.submittedGuesses = [];
    this.currentAttempt = '';
    this.gameOver = false;
  }

  /**
   * Gets the length of the solution word.
   * @returns The length of the solution word.
   */
  public getWordLength(): number {
    return this.solutionWord.length;
  }

  /**
   * Gets the submitted guesses.
   * @returns The array of submitted guesses.
   */
  public getSubmittedGuesses(): GuessResult[] {
    return this.submittedGuesses;
  }

  /**
   * Gets the current attempt.
   * @returns The current attempt.
   */
  public getCurrentAttempt(): string {
    return this.currentAttempt;
  }

  /**
   * Checks if the game is over.
   * @returns True if the game is over, false otherwise.
   */
  public isGameOver(): boolean {
    return this.gameOver;
  }

  /**
   * Adds a letter to the current attempt.
   * @param letter The letter to add.
   * @returns The updated current attempt.
   */
  public addLetter(letter: string): void {
    if (this.gameOver) {
      return;
    }
    if (this.currentAttempt.length < this.getWordLength()) {
      this.currentAttempt += letter.toUpperCase();
    }
  }

  /**
   *
   */
  public removeLetter(): void {
    if (this.gameOver) {
      return;
    }
    this.currentAttempt = this.currentAttempt.slice(0, -1);
  }

  /**
   *
   */
  public submitGuess(): void {
    if (this.gameOver) {
      return;
    }

    if (this.currentAttempt.length !== this.getWordLength()) {
      return;
    }

    const letterResults: LetterResult[] = this.checkGuess(this.currentAttempt);
    const guessResult: GuessResult = {
      guess: this.currentAttempt,
      letterResults,
    };
    this.submittedGuesses.push(guessResult);

    const didWin: boolean = letterResults.every((lr: LetterResult) => lr.status === 'correct');

    this.currentAttempt = '';

    if (didWin || this.submittedGuesses.length >= this.maxAttempts) {
      this.gameOver = true;
      if (this.onGameOver) {
        this.onGameOver(didWin);
      }
    }

    if (this.onGuessSubmitted) {
      this.onGuessSubmitted();
    }
  }

  private checkGuess(guess: string): LetterResult[] {
    const solutionArray: string[] = this.solutionWord.split('');
    const guessArray: string[] = guess.toUpperCase().split('');

    // typed lr as LetterResult
    const letterResults: LetterResult[] = guessArray.map((letter: string, index: number) => {
      if (letter === solutionArray[index]) {
        solutionArray[index] = '*';
        return { letter, status: 'correct' };
      }
      return { letter, status: 'absent' };
    });

    letterResults.forEach((result: LetterResult, index: number) => {
      if (result.status === 'absent') {
        const letterPos: number = solutionArray.indexOf(result.letter);
        if (letterPos !== -1) {
          letterResults[index].status = 'present';
          solutionArray[letterPos] = '*';
        }
      }
    });

    return letterResults;
  }

  public getGuessState(row: number): GuessState | null {
    if (row < 0 || row >= this.submittedGuesses.length) {
      return null;
    }

    const guessResult: GuessResult = this.submittedGuesses[row];
    const letters: string[] = guessResult.guess.split('');
    const statuses: LetterStatus[] = guessResult.letterResults.map((lr: LetterResult) => lr.status);

    return {
      letters,
      statuses,
    };
  }
}
