/**
 * FillInBlankRenderer.ts
 *
 * Renders all elements of the fill-in-the-blank game:
 *  - The sentence with a highlighted blank area
 *  - The draggable word tiles
 *  - Correct/incorrect feedback indicators
 */
import { DraggableWord } from './FillInBlankInputHandler.js';
import Scene from '../Scene.js';

export interface BlankArea {
  x: number;
  y: number;
  width: number;
  height: number;
  placedWord?: string;
}

export class FillInBlankRenderer extends Scene {
  /**
   *
   */
  public override ifCanvasItemIsClicked(): Scene | null {
    throw new Error('Method not implemented.');
  }


  /**
   * Draws the sentence with blank areas on the canvas.
   * @param canvas The canvas element.
   * @param sentence The sentence to drnpmaw.
   * @param blankAreas The array of blank areas.
   */

  /**
   *
   */
  public static drawSentence(
    canvas: HTMLCanvasElement,
    sentence: string,
    blankAreas: BlankArea[]
  ): void {
    // typed context
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (!context) {
      return;
    }

    context.fillStyle = '#000';
    context.font = '24px Arial';

    // typed xStart, yStart
    const xStart: number = 50;
    const yStart: number = 100;
    context.fillText(sentence, xStart, yStart);

    blankAreas.forEach((blank: BlankArea) => {
      context.strokeStyle = 'blue';
      context.lineWidth = 3;
      context.strokeRect(blank.x, blank.y, blank.width, blank.height);
    });
  }

  /**
   * Draws the word tiles on the canvas.
   * @param canvas The canvas element.
   * @param words The array of draggable words.
   */
  public static drawWordTiles(canvas: HTMLCanvasElement, words: DraggableWord[]): void {
    // typed ctx
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    words.forEach((word: DraggableWord) => {
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(word.x, word.y, word.width, word.height);

      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.strokeRect(word.x, word.y, word.width, word.height);

      ctx.fillStyle = '#000';
      ctx.font = '18px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(word.text, word.x + word.width / 2, word.y + word.height / 2);
    });
  }

  /**
   * Draws feedback messages on the canvas.
   * @param canvas The canvas element.
   * @param message The feedback message to draw.
   */
  public static drawFeedback(canvas: HTMLCanvasElement, message: string): void {
    if (!message) {
      return;
    }
    // typed ctx
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    ctx.fillStyle = 'green';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(message, canvas.width / 2, canvas.height / 2);
  }
}
