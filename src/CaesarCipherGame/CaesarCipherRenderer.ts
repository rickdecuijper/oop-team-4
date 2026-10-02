/**
 * renderer.ts
 *
 * Handles Canvas-based rendering for the Caesar cipher mini-game.
 * This class does NOT store game logic but simply draws:
 *  - The puzzle message (encoded/decoded).
 *  - The current shift key value.
 *  - Attempt counts or feedback like "Correct!" or "Try again."
 *  - Optional instructions or user text, plus a manual shift table on the right.
 */

export default class CaesarRenderer {
  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    // Added annotation + non-null assertion:
    const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
    if (!context) {
      throw new Error('Could not obtain 2D rendering context.');
    }
    this.ctx = context;
  }

  /**
   *
   */
  public drawPuzzleHUD(
    puzzleMessage: string,
    shiftKey: number,
    puzzleSolved: boolean,
    attempts: number,
    userText?: string,
    mode?: string,
  ): void {
    this.ctx.font = '20px Arial';
    this.ctx.fillStyle = '#000000';
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';

    this.ctx.fillText(`Puzzle: ${puzzleMessage}`, 20, 20);
    this.ctx.fillText(`Shift Key: ${shiftKey}`, 20, 50);
    this.ctx.fillText(`Attempts: ${attempts}`, 20, 80);

    if (mode) {
      this.ctx.fillText(`Mode: ${mode.toUpperCase()}`, 20, 110);
    }
    if (userText !== undefined) {
      this.ctx.fillText(`Your Text: ${userText}`, 20, 140);
    }

    if (puzzleSolved) {
      this.ctx.fillStyle = 'green';
      this.ctx.fillText('Puzzle Solved! Great job!', 20, 180);
      this.ctx.fillStyle = '#000000';
    }

    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = '#444444';
    // Added explicit type annotation:
    const instructions: string[] = [
      'Instructions:',
      ' - Use +/- or Arrow Up/Down to adjust the shift key.',
      ' - Press CTRL+E or CTRL+D to toggle mode (optional).',
      ' - Type your guess; Backspace to delete.',
      ' - Press Enter to submit.',
      ' - Fill out the table on the right for manual shifting!',
    ];
    // Added type for yPos:
    let yPos: number = 230;
    for (const line of instructions) {
      this.ctx.fillText(line, 20, yPos);
      yPos += 20;
    }
  }

  /**
   * ADD: Draw a shifted alphabet table on the right side,
   * letting the user manually fill out A->D, B->E, etc.
   *
   * @param alphabet - original letters 'A' through 'Z'
   * @param userShiftTable - the player's typed mapping for each letter
   * @param xStart - x-position where the table starts (e.g., near right edge)
   * @param yStart - y-position for the top row
   */
  public drawShiftTable(
    alphabet: string[],
    userShiftTable: string[],
    xStart: number,
    yStart: number
  ): void {
    // Added type annotation:
    const rowHeight: number = 25;
    this.ctx.font = '18px Arial';
    this.ctx.fillStyle = '#000';
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'middle';

    // Table heading
    this.ctx.fillText('Manual Shift Table', xStart, yStart - 30);

    // Added type annotation to i:
    for (let i: number = 0; i < 26; i++) {
      // rowY type:
      const rowY: number = yStart + i * rowHeight;
      // Original letter
      this.ctx.fillText(alphabet[i], xStart, rowY);
      // Arrow or colon
      this.ctx.fillText('→', xStart + 20, rowY);
      // Player's assigned letter
      // assigned type:
      const assigned: string = userShiftTable[i] || '';
      this.ctx.fillText(assigned, xStart + 40, rowY);
    }
  }
}
