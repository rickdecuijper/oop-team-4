/* ------------------------------------------------------------------
   FillInBlankScene.ts
   ------------------------------------------------------------------ */

import Scene from '../Scene.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import { FillInBlankSentenceConfig, FillInBlankData } from './FillInBlankSentenceConfig.js';
import { FillInBlankInputHandler, DraggableWord } from './FillInBlankInputHandler.js';
import { FillInBlankRenderer, BlankArea } from './FillInBlankRenderer.js';
import { FillInBlankFeedbackManager } from './FillInBlankFeedbackManager.js';
import { isCorrectAnswer, shuffleArray } from './FillInBlankUtils.js';
export default class FillInBlankScene extends Scene {
  private sentenceData: FillInBlankData | null = null;

  private blankAreas: BlankArea[] = [];

  private draggableWords: DraggableWord[] = [];

  private inputHandler!: FillInBlankInputHandler;

  private feedbackManager: FillInBlankFeedbackManager;

  private isSolved: boolean = false;

  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY, player);

    this.feedbackManager = new FillInBlankFeedbackManager();

    FillInBlankSentenceConfig.loadData().then(() => {
      this.sentenceData = FillInBlankSentenceConfig.getRandomSentence();
      this.setupWordTiles();
    });
  }

  private setupWordTiles(): void {
    if (!this.sentenceData) {
      return;
    }

    const { options } = this.sentenceData;
    shuffleArray(options);

    let startX: number = 100;
    const startY: number = 250;

    this.draggableWords = options.map((word: string) => {
      const tile: DraggableWord = {
        text: word,
        x: startX,
        y: startY,
        width: 80,
        height: 40,
        isDragging: false,
      };
      startX += 100;
      return tile;
    });
  }

  /**
   * Processes the input for the fill-in-the-blank scene.
   * @param mouseListener The mouse listener object.
   */
  public override processInput(mouseListener: MouseListener): void {
    super.processInput(mouseListener);

    if (!this.inputHandler) {
      this.inputHandler = new FillInBlankInputHandler(mouseListener);
    }
    this.inputHandler.handleDragWords(this.draggableWords);
  }

  /**
   * Updates the fill-in-the-blank scene.
   * @param elapsed The elapsed time since the last update.
   */
  public override update(elapsed: number): void {
    super.update(elapsed, []);

    if (this.isSolved || !this.sentenceData) {
      return;
    }

    const blank: BlankArea | undefined = this.blankAreas[0];
    if (!blank) {
      return;
    }

    this.draggableWords.forEach((word: DraggableWord) => {
      if (!word.isDragging) {
        if (this.isOverlapping(word, blank)) {
          const correct: boolean = isCorrectAnswer(word.text, this.sentenceData!.correctAnswer);
          if (correct) {
            this.feedbackManager.setCorrect();
            this.isSolved = true;
          } else {
            this.feedbackManager.setIncorrect();
          }
        }
      }
    });
  }

  /**
   * Checks if a word is overlapping with a blank area.
   * @param word The draggable word.
   * @param blank The blank area.
   * @returns True if the word is overlapping with the blank area, false otherwise.
   */
  private isOverlapping(word: DraggableWord, blank: BlankArea): boolean {
    return (
      word.x < blank.x + blank.width &&
      word.x + word.width > blank.x &&
      word.y < blank.y + blank.height &&
      word.y + word.height > blank.y
    );
  }

  /**
   * Renders the fill-in-the-blank scene on the canvas.
   * @param canvas The canvas element.
   */
  public override render(canvas: HTMLCanvasElement): void {
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#eee';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!this.sentenceData) {
      ctx.fillStyle = 'black';
      ctx.font = '20px Arial';
      ctx.fillText('Loading fill-in-the-blank data...', 50, 50);
      return;
    }

    const [beforeBlank, afterBlank]: string[] = this.sentenceData.sentence.split('___');

    ctx.font = '24px Arial';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';

    const xStart: number = 50;
    const yStart: number = 100;

    const beforeTrimmed: string = beforeBlank.trimEnd();
    ctx.fillStyle = 'black';
    ctx.fillText(beforeTrimmed, xStart, yStart);

    const metrics: TextMetrics = ctx.measureText(beforeTrimmed);
    const blankOffset: number = 10;
    const blankX: number = xStart + metrics.width + blankOffset;
    const blankY: number = yStart;

    const rectWidth: number = 80;
    const rectHeight: number = 30;

    if (!this.blankAreas[0]) {
      this.blankAreas[0] = { x: blankX, y: blankY, width: rectWidth, height: rectHeight };
    } else {
      this.blankAreas[0].x = blankX;
      this.blankAreas[0].y = blankY;
      this.blankAreas[0].width = rectWidth;
      this.blankAreas[0].height = rectHeight;
    }

    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.strokeRect(blankX, blankY, rectWidth, rectHeight);

    const afterX: number = blankX + rectWidth + 5;
    ctx.fillText(afterBlank, afterX, yStart);

    FillInBlankRenderer.drawWordTiles(canvas, this.draggableWords);

    const feedbackMsg: string = this.feedbackManager.getMessage();
    FillInBlankRenderer.drawFeedback(canvas, feedbackMsg);

    super.render(canvas);
  }

  /**
   *
   * @returns effect after item is clicked
   */
  public override ifCanvasItemIsClicked() : Scene | null {
    if (this.isSolved) {
      return null;
    }
    return null;
  }
}
