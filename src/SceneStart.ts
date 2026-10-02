import CanvasRenderer from './CanvasRenderer.js';
import MouseListener from './MouseListener.js';
import Player from './Player.js';
import Scene from './Scene.js';
import SceneIntro from './SceneIntro.js';

export default class SceneStart extends Scene {
  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY, player);
    this.background = CanvasRenderer.loadNewImage('assets/CrazyDiamondStartScene.png');
  }

  /**
   * Process input from the mouse
   *
   * @param mouseListener mouse listener object
   */
  public override processInput(mouseListener: MouseListener): void {
    if (mouseListener.buttonPressed(0)) {
      this.interact = 1;
    }
  }

  /**
   *
   * @param elapsed elapsed ms since last update
   */
  public override update(elapsed: number): void {

  }

  /**
   *
   * @returns the next scene to be rendered. null if no change
   */
  public override ifCanvasItemIsClicked(): Scene | null {
    if (this.interact === 1) {
      return new SceneIntro(this.maxX, this.maxY, this.player);
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
  }
}
