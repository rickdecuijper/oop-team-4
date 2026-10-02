import Scene from '../Scene.js';
import MouseListener from '../MouseListener.js';
import WordleGameLogic from './WordleGameLogic.js';
import WordleRenderer from './WordleRenderer.js';
import WordleInputHandler from './WordleInputHandler.js';
import { getRandomSolution } from './WordleUtils.js';
import Player from '../Player.js';

export default class WordleScene extends Scene {
  private gameLogic: WordleGameLogic;

  private inputHandler: WordleInputHandler | null;

  private wordleRenderer: WordleRenderer | null;

  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY, player);

    const randomSolution: string = getRandomSolution();
    this.gameLogic = new WordleGameLogic(randomSolution);

    this.inputHandler = null;
    this.wordleRenderer = null;

    this.gameLogic.onGameOver = (isWin: boolean) : void => {
      alert(isWin ? 'Je hebt gewonnen!' : 'Je hebt verloren!');
    };
  }

  /**
   * Processes the input for the Wordle scene.
   * @param mouseListener The mouse listener object.
   */
  public override processInput(mouseListener: MouseListener): void {
    super.processInput(mouseListener);
  }

  /**
   * Updates the Wordle scene.
   * @param elapsed The elapsed time since the last update.
   */
  public override update(elapsed: number): void {
    super.update(elapsed, []);

    if (!this.inputHandler) {
      this.inputHandler = new WordleInputHandler(this.gameLogic);

      this.gameLogic.onGuessSubmitted = () : void => {
        // re-render logic if needed
      };
    }

    if (this.gameLogic.isGameOver()) {
      // e.g. this.changeScene = 1;
    }
  }

  /**
   * Gets the next scene to transition to.
   * @returns The next scene or null if no transition is needed.
   */
  public override ifCanvasItemIsClicked(): Scene | null {
    if (this.interact === 1) {
      return null; // e.g. new Level2(...)
    }
    return null;
  }

  /**
   * Renders the Wordle scene.
   * @param canvas The canvas to render to.
   * @returns void
   */
  public override render(canvas: HTMLCanvasElement): void {
    if (!this.wordleRenderer) {
      this.wordleRenderer = new WordleRenderer(canvas, this.gameLogic);
    }

    this.wordleRenderer.render();
    super.render(canvas);
  }
}
