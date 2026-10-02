import CanvasRenderer from '../CanvasRenderer.js';
import WordleGameLogic, { LetterStatus, GuessState } from './WordleGameLogic.js';

export default class WordleRenderer {
  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  private gameLogic: WordleGameLogic;

  private readonly totalRows: number = 6;

  private readonly totalCols: number = 5;

  private readonly squareGap: number = 10;

  private readonly squareSize: number = 60;

  public background: unknown;

  public constructor(canvas: HTMLCanvasElement, gameLogic: WordleGameLogic) {
    this.canvas = canvas;
    this.background = CanvasRenderer.loadNewImage('./assets/KofferBackground.png'); // Preload background image
    const context: CanvasRenderingContext2D | null = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not obtain 2D rendering context.');
    }
    this.ctx = context;
    this.gameLogic = gameLogic;
  }

  /**
   * Renders the Wordle mini-game on the canvas.
   */

  /**
   *
   */
  public render(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw background color
    // this.ctx.fillStyle = '#f0f0f0'; // Example color
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw background image
    const backgroundImage : HTMLImageElement = CanvasRenderer.loadNewImage('./assets/KofferBackground.png');
    this.ctx.drawImage(backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
    const submittedCount: number = this.gameLogic.getSubmittedGuesses().length;
    const currentAttempt: string = this.gameLogic.getCurrentAttempt();
    this.drawStats(submittedCount);

    let topMessage: string = '';
    if (currentAttempt.length >= this.totalCols) {
      topMessage = 'Rij is vol! Druk op enter.';
    }
    this.drawTopMessage(topMessage);

    for (let row: number = 0; row < this.totalRows; row += 1) {
      const guess: GuessState | null = this.gameLogic.getGuessState(row);

      for (let col: number = 0; col < this.totalCols; col += 1) {
        const xPos: number = this.getLeftOffset() + col * (this.squareSize + this.squareGap);
        const yPos: number = this.getTopOffset() + row * (this.squareSize + this.squareGap);

        let letter: string = '';
        let status: LetterStatus = 'empty';

        if (guess && row < submittedCount && col < guess.letters.length) {
          letter = guess.letters[col];
          if (guess.statuses && guess.statuses[col]) {
            status = guess.statuses[col];
          }
        } else if (row === submittedCount && !this.gameLogic.isGameOver()) {
          if (col < currentAttempt.length) {
            letter = currentAttempt[col];
            status = 'empty';
          }
        }

        this.drawSquare(xPos, yPos, status);

        if (letter) {
          this.drawLetter(xPos, yPos, letter);
        }
      }
    }
  }

  private drawSquare(x: number, y: number, status: LetterStatus): void {
    let fillColor: string = '#d3d6da';

    switch (status) {
      case 'correct':
        fillColor = '#6aaa64';
        break;
      case 'present':
        fillColor = '#c9b458';
        break;
      case 'absent':
        fillColor = '#787c7e';
        break;
      case 'empty':
      default:
        fillColor = '#d3d6da';
        break;
    }

    this.ctx.fillStyle = fillColor;
    this.ctx.fillRect(x, y, this.squareSize, this.squareSize);
  }

  private drawLetter(x: number, y: number, letter: string): void {
    const fontSize: number = Math.floor(this.squareSize * 0.6);

    this.ctx.fillStyle = '#000000';
    this.ctx.font = `bold ${fontSize}px sans-serif`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    const centerX: number = x + this.squareSize / 2;
    const centerY: number = y + this.squareSize / 2;

    this.ctx.fillText(letter, centerX, centerY);
  }

  private getLeftOffset(): number {
    const totalGridWidth: number =
      (this.totalCols * this.squareSize) + (this.totalCols - 1) * this.squareGap;
    return (this.canvas.width - totalGridWidth) / 2;
  }

  private getTopOffset(): number {
    const totalGridHeight: number =
      (this.totalRows * this.squareSize) + (this.totalRows - 1) * this.squareGap;
    return (this.canvas.height - totalGridHeight) / 2;
  }

  private drawStats(submittedCount: number): void {
    this.ctx.fillStyle = '#000';
    this.ctx.font = 'bold 20px sans-serif';
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(`Guess ${submittedCount} of ${this.totalRows}`, 20, 10);
  }

  private drawTopMessage(message: string): void {
    if (!message) {
      return;
    }
    this.ctx.fillStyle = '#c00';
    this.ctx.font = '16px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'top';

    this.ctx.fillText(message, this.canvas.width / 2, 10);
  }
}
