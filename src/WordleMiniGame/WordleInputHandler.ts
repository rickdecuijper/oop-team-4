/**
 * Handles user inputs for the Wordle mini-game.
 */

import WordleGameLogic from './WordleGameLogic.js';

export default class WordleInputHandler {
  private gameLogic: WordleGameLogic;

  public constructor(gameLogic: WordleGameLogic) {
    this.gameLogic = gameLogic;
    window.addEventListener('keydown', this.handleKeyDown);
  }

  /**
   * Destroys the input handler.
   * @returns void
   */
  public destroy(): void {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  /**
   * Handles the key down event.
   * @param event The keyboard event.
   */
  private handleKeyDown = (event: KeyboardEvent): void => {
    if (this.gameLogic.isGameOver()) {
      return;
    }

    const key: string = event.key.toUpperCase();

    if (/^[A-Z]$/.test(key) && key.length === 1) {
      this.gameLogic.addLetter(key);
    } else if (key === 'ENTER') {
      this.gameLogic.submitGuess();
    } else if (key === 'BACKSPACE') {
      this.gameLogic.removeLetter();
    }
  };

  /**
   *
   */
  public handleLetterButton(letter: string): void {
    // typed upperLetter
    const upperLetter: string = letter.toUpperCase();
    if (this.gameLogic.isGameOver()) {
      return;
    }
    this.gameLogic.addLetter(upperLetter);
  }

  /**
   *
   */
  public handleEnterButton(): void {
    if (this.gameLogic.isGameOver()) {
      return;
    }
    this.gameLogic.submitGuess();
  }

  /**
   * Handles the backspace key.
   */
  public handleBackspaceButton(): void {
    if (this.gameLogic.isGameOver()) {
      return;
    }
    this.gameLogic.removeLetter();
  }
}
