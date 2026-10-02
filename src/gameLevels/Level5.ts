import CanvasRenderer from '../CanvasRenderer.js';
import Scene from '../Scene.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Level2 from './Level2.js';
import NotebookIntro from '../NotebookIntro.js';
import Notebook from '../Notebook.js';

export default class Level5 extends Scene {
  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY, player);
    this.background = CanvasRenderer.loadNewImage('./assets/cabin(1) with drawer.png');
    this.newCanvasItem(10, window.innerHeight - 300, CanvasRenderer.loadNewImage('./assets/terugknop.png'));
    this.newCanvasItem(window.innerWidth - 250, window.innerHeight - 250, CanvasRenderer.loadNewImage('./assets/caseIcon.png'));
    this.newCanvasItem(window.innerWidth / 2.4, window.innerHeight / 1.7, CanvasRenderer.loadNewImage('./assets/collisionfields/400x200invis.png')); // 3 - kastje
  }

  /**
   * Process input from the mouse
   * @param mouseListener mouse listener object
   */
  public override processInput(mouseListener: MouseListener): void {
    super.processInput(mouseListener);
    if (mouseListener.buttonPressed(0)){
      if(this.interact === 3){
        this.interact = 6;
      }else{
        this.interact = 9;
      }
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
   * make new level2 to old level2 bugFix
   */
  public override ifCanvasItemIsClicked(): Scene | null {
    if (this.interact === 1) {
      return new Level2(this.maxX, this.maxY, this.player);
    }else if (this.interact === 2) {
      return new NotebookIntro(this.maxX, this.maxY, this.player, 5);
    }else if (this.interact === 5) {
      Notebook.kluis = true;
    }else if (this.interact === 4) {
      Notebook.diamant = true;
    }else if (this.interact === 3) {
      Notebook.treinRailSysteemMap = true;
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

    if (this.interact === 3) {
      const drawer: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/interractables/drawerWithMap.png');
      context.drawImage(drawer, 0, 0, window.innerWidth, window.innerHeight);
    }

    super.render(canvas);
  }
}
