import MouseListener from './MouseListener.js';
import CanvasItem from './CanvasItem.js';
import Player from './Player.js';
import CollisionField from './CollisionField.js';
import CanvasRenderer from './CanvasRenderer.js';
import Notebook from './Notebook.js';


export default abstract class Scene {
  protected maxX: number = window.innerWidth;

  protected maxY: number = window.innerHeight;

  protected interact: number = 0;

  protected canvasItem: CanvasItem[] = [];

  protected background: HTMLImageElement = new Image();

  protected player: Player;

  protected active: boolean = false;

  public constructor(maxX: number, maxY: number, player: Player) {
    this.maxX = maxX;
    this.maxY = maxY;
    this.player = player;
  }

  /**
   *
   * @param mouseListener is the player
   * to use player call super() class first to check position for collision
   */
  public processInput(mouseListener: MouseListener): void{
    this.player.move(mouseListener.getMousePosition().x,
      mouseListener.getMousePosition().y);
  }

  /**
   *
   * @param elapsed the frame rate of the game
   */
  public update(elapsed: number, canvasItem: CanvasItem[]): void{
    let iscollision: boolean = false;
    for(const item of canvasItem){
      if(this.player.isCollidingWithItem(item)){
        iscollision = true;
      }
    }
    if(iscollision === true){
      this.player.setImageSparkle();
    }else{
      this.player.setImageNotSparkle();
    }
  }

  public abstract ifCanvasItemIsClicked(): Scene | null;

  public newCanvasItem(posX: number, posY: number, img: HTMLImageElement): void{
    this.canvasItem.push(new CollisionField(posX,posY, img));
  }

  /**
   * universal player rendering
   * @param canvas is the canvas
   */
  public render(canvas: HTMLCanvasElement): void{
    canvas.style.cursor = 'none';
    this.player.render(canvas);
  }
}
