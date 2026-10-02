import CanvasRenderer from './CanvasRenderer.js';
import MouseListener from './MouseListener.js';
import Scene from './Scene.js';
import Notebook from './Notebook.js';
import Player from './Player.js';

export default class NotebookIntro extends Scene {
  private levelNo: number;

  public constructor(maxX: number, maxY: number, player: Player,
    levelNo: number) {
    super(maxX, maxY, player);
    this.background = CanvasRenderer.loadNewImage('./assets/w3.png');
    this.levelNo = levelNo;
  }

  /**
   * Process input from the mouse
   * @param mouseListener mouse listener object
   */
  public override processInput(mouseListener: MouseListener): void {
    super.processInput(mouseListener);
    if(mouseListener.buttonPressed(0)){
      this.interact = 1;
    }
  }

  /**
   *
   * @param elapsed elapsed ms since last update
   */
  public override update(elapsed: number): void {}

  /**
   *
   * @returns the next scene to be rendered. null if no change
   */
  public override ifCanvasItemIsClicked(): Scene | null {
    if (this.interact === 1) {
      return new Notebook(this.maxX, this.maxY, this.player, this.levelNo);
    }
    return null;
  }

  /**
   * Render the scene to the canvas
   * @param canvas canvas to render to
   */
  public override render(canvas: HTMLCanvasElement): void {
    const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
    context.drawImage(this.background, 0, 0, window.innerWidth, window.innerHeight);
    super.render(canvas);
  }
}
