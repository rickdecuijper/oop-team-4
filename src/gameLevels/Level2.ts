import CanvasRenderer from '../CanvasRenderer.js';
import Scene from '../Scene.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Level1 from './Level1.js';
import Level3 from './Level3.js';
import Level4 from './Level4.js';
import Level5 from './Level5.js';
import Level6 from './Level6.js';
import NotebookIntro from '../NotebookIntro.js';
import Notebook from '../Notebook.js';

export default class Level2 extends Scene {
  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY, player);
    this.background = CanvasRenderer.loadNewImage('./assets/hallLevel1.webp');
    this.player = new Player(maxX, maxY);
    this.newCanvasItem(window.innerWidth / 2.5, window.innerHeight / 2.5, CanvasRenderer.loadNewImage('./assets/collisionfields/200x300invis.png'));
    this.newCanvasItem(window.innerWidth / 1.97, window.innerHeight / 1.88, CanvasRenderer.loadNewImage('./assets/collisionfields/100x200invis.png'));
    this.newCanvasItem(window.innerWidth / 1.73, window.innerHeight / 2.3, CanvasRenderer.loadNewImage('./assets/collisionfields/200x400invis.png'));
    this.newCanvasItem(window.innerWidth / 1.4, window.innerHeight / 2.4, CanvasRenderer.loadNewImage('./assets/collisionfields/300x600invis.png'));
    this.newCanvasItem(10, window.innerHeight - 300, CanvasRenderer.loadNewImage('./assets/terugknop.png'));
    this.newCanvasItem(window.innerWidth - 250, window.innerHeight - 250, CanvasRenderer.loadNewImage('./assets/caseIcon.png'));
  }

  /**
   * Process input from the mouse
   *
   * @param mouseListener mouse listener object
   */
  public override processInput(mouseListener: MouseListener): void {
    super.processInput(mouseListener);
    if(mouseListener.buttonPressed(0)){
      for(let i:number = 0; i < this.canvasItem.length; i++){
        if(this.player.isCollidingWithItem(this.canvasItem[i])){
          this.interact = i + 1;
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
   */
  public override ifCanvasItemIsClicked(): Scene | null {
    if (this.interact === 1) {
      return new Level6(this.maxX, this.maxY, this.player);
    } else if (this.interact === 2) {
      return new Level3(this.maxX, this.maxY, this.player);
    }else if (this.interact === 3) {
      return new Level4(this.maxX, this.maxY, this.player);
    }else if (this.interact === 4) {
      return new Level5(this.maxX, this.maxY, this.player);
    }else if (this.interact === 5) {
      return new Level1(this.maxX, this.maxY, this.player);
    }else if (this.interact === 6) {
      return new NotebookIntro(this.maxX, this.maxY, this.player, 2);
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
    super.render(canvas);
  }
}
