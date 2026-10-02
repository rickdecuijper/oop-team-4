import CanvasRenderer from './CanvasRenderer.js';
import MouseListener from './MouseListener.js';
import Scene from './Scene.js';
import SceneIntroVerhaal from './SceneIntoVerhaal.js';
import Player from './Player.js';

export default class SceneIntro extends Scene {
  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY, player);

    this.background = CanvasRenderer.loadNewImage('./assets/backgrounds/intro/1.png');
  }

  /**
   * Process input from the mouse
   * @param mouseListener mouse listener object
   */
  public override processInput(mouseListener: MouseListener): void {
    if(mouseListener.buttonPressed(0)){
      if(this.interact === 0){
        this.interact = 1;
      }else if(this.interact === 1){
        this.interact = 2;
      }else if(this.interact === 2){
        this.interact = 3;
      }else if(this.interact === 3){
        this.interact = 4;
      }else if(this.interact === 4){
        this.interact = 5;
      }else{
        this.interact = 6;
      }
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
    if (this.interact === 6) {
      return new SceneIntroVerhaal(this.maxX, this.maxY, this.player);
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

    if(this.interact === 1){
      const intro: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/backgrounds/intro/2.png');
      context.drawImage(intro, 0, 0, window.innerWidth, window.innerHeight);
    }else if(this.interact === 2){
      const intro: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/backgrounds/intro/3.png');
      context.drawImage(intro, 0, 0, window.innerWidth, window.innerHeight);
    }else if(this.interact === 3){
      const intro: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/backgrounds/intro/4.png');
      context.drawImage(intro, 0, 0, window.innerWidth, window.innerHeight);
    }else if(this.interact === 4){
      const intro: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/backgrounds/intro/5.png');
      context.drawImage(intro, 0, 0, window.innerWidth, window.innerHeight);
    }else if(this.interact === 5){
      const intro: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/backgrounds/intro/6.png');
      context.drawImage(intro, 0, 0, window.innerWidth, window.innerHeight);
    }
    super.render(canvas);
  }
}
