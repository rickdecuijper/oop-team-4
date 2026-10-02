import CanvasItem from './CanvasItem.js';

export default class CollisionField extends CanvasItem{
  public constructor(posX: number, posY: number, image: HTMLImageElement) {
    super();
    this.image = image;
    this.posX = posX;
    this.posY = posY;
  }
}
