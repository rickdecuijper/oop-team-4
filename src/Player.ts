import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';


export default class Player extends CanvasItem{
  public constructor(maxX: number, maxY: number) {
    super();
    this.image = CanvasRenderer.loadNewImage('./assets/cursorImg.png');
    this.posX = maxX / 2;
    this.posY = maxY / 2;
  }

  /**
   * Get the new position of the player from the mouse position
   *
   * @param posX x-coordinate of the player
   * @param posY y-coordinate of the player
   */
  public move(posX: number, posY: number): void {
    this.posX = posX;
    this.posY = posY;
  }

  public setImageSparkle(): void{
    this.image = CanvasRenderer.loadNewImage('./assets/cursorImgSparkel.png');
  }

  public setImageNotSparkle(): void {
    this.image = CanvasRenderer.loadNewImage('./assets/cursorImg.png');
  }
}
