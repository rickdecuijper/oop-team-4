import CanvasRenderer from '../CanvasRenderer.js';
import Scene from '../Scene.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';

export default class Level7 extends Scene {
  private win: boolean = false;

  private lose: boolean = false;

  private theEnd: boolean = false;

  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY, player);
    this.background = CanvasRenderer.loadNewImage('./assets/lastRoom.png');
    this.newCanvasItem(200, 450, CanvasRenderer.loadNewImage('./assets/emptyfieldLong.png'));
    this.newCanvasItem(500, 450, CanvasRenderer.loadNewImage('./assets/emptyfieldLong.png'));
    this.newCanvasItem(800, 450, CanvasRenderer.loadNewImage('./assets/emptyfieldLong.png'));
    this.newCanvasItem(1100, 450, CanvasRenderer.loadNewImage('./assets/emptyfieldLong.png'));
    this.newCanvasItem(1400, 450, CanvasRenderer.loadNewImage('./assets/emptyfieldLong.png'));
    this.newCanvasItem(1700, 450, CanvasRenderer.loadNewImage('./assets/emptyfieldLong.png'));
  }

  /**
   * Process input from the mouse
   * @param mouseListener mouse listener object
   */
  public override processInput(mouseListener: MouseListener): void {
    super.processInput(mouseListener);
    if(!this.theEnd){
      if (mouseListener.buttonPressed(0)) {
        for(let i:number = 0; i < this.canvasItem.length; i++){
          if(this.player.isCollidingWithItem(this.canvasItem[i])){
            this.interact = i+ 1;
          }
        }
      }
    }
  }

  /**
   *
   * @param elapsed elapsed ms since last update
   */
  public override update(elapsed: number): void {
    super.update(elapsed, this.canvasItem);
  }

  /**
   *
   * @returns new scene to switch to, or null to keep current scene
   * make new level2 to old level2 bugFix
   */
  public override ifCanvasItemIsClicked(): Scene | null {
    for(let i:number = 0; i < this.canvasItem.length; i++){
      if(this.interact === 1){
        this.win = true;
      } else if(this.interact > 0){
        this.lose = true;
      }
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
    for(const item of this.canvasItem){
      item.render(canvas);
    }
    if(this.win){
      CanvasRenderer.writeText(canvas, 'gewonnen!', canvas.width / 2, (canvas.height / 10) * 9, 'center', 'Arial', 50, 'green');
      this.theEnd = true;
    }else if(this.lose){
      CanvasRenderer.writeText(canvas, 'verloren!', canvas.width / 2, (canvas.height / 10) * 9, 'center', 'Arial', 50, 'red');
      this.theEnd = true;
    }
    super.render(canvas);
  }
}
