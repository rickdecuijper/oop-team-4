import CanvasRenderer from './CanvasRenderer.js';
import MouseListener from './MouseListener.js';
import Scene from './Scene.js';
import Level1 from './gameLevels/Level1.js';
import Player from './Player.js';

export default class SceneIntroVerhaal extends Scene {
  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY, player);

    this.background = CanvasRenderer.loadNewImage('./assets/backgrounds/intro/7.png');
  }

  /**
   * Process input from the mouse
   * @param mouseListener mouse listener object
   */
  public override processInput(mouseListener: MouseListener): void {
    if(this.active && mouseListener.buttonPressed(0)){
      this.interact = 1;
    }
  }

  /**
   *
   * @param elapsed elapsed ms since last update
   */
  public override update(elapsed: number): void {
    this.makeIntro();
  }

  /**
   * makes timeout for button to appear + processInput
   */
  public makeIntro(): void{
    // make coldcase intro
    setInterval(() => {
      this.active = true;
    }, 3);// 3000 is 3sec for timeOut
  }

  /**
   *
   * @returns the next scene to be rendered. null if no change
   */
  public override ifCanvasItemIsClicked(): Scene | null {
    if (this.interact === 1) {
      return new Level1(this.maxX, this.maxY, this.player);
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
    if(this.active){
      const klikVerder: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/backgrounds/intro/klikomverder.png');
      context.drawImage(klikVerder, 0, 0, window.innerWidth, window.innerHeight);
    }
    super.render(canvas);
  }
}
