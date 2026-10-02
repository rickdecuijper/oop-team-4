import CanvasRenderer from '../CanvasRenderer.js';
import Scene from '../Scene.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Level2 from './Level2.js';
import NotebookIntro from '../NotebookIntro.js';
import Notebook from '../Notebook.js';

export default class Level4 extends Scene {
  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY, player);
    this.background = CanvasRenderer.loadNewImage('./assets/cabin2+Sophie.png');
    this.newCanvasItem(10, window.innerHeight - 300, CanvasRenderer.loadNewImage('./assets/terugknop.png'));
    this.newCanvasItem(window.innerWidth - 250, window.innerHeight - 250, CanvasRenderer.loadNewImage('./assets/caseIcon.png'));
    this.newCanvasItem(window.innerWidth / 2.4, window.innerHeight / 1.7, CanvasRenderer.loadNewImage('./assets/collisionfields/400x200invis.png')); //3 - desk
    this.newCanvasItem(window.innerWidth / 1.3, window.innerHeight / 2.3, CanvasRenderer.loadNewImage('./assets/collisionfields/200x400invis.png')); //4 - sophie
  }

  /**
   * Process input from the mouse
   * @param mouseListener mouse listener object
   */
  public override processInput(mouseListener: MouseListener): void {
    super.processInput(mouseListener);

    if (mouseListener.buttonPressed(0)){
      if(this.interact === 3){
        this.interact = 13;
      }else if(this.interact === 4){
        this.interact = 6;
      }else if(this.interact === 6){
        this.interact = 7;
      }else if(this.interact === 7){
        this.interact = 8;
      }else if(this.interact === 8){
        this.interact = 9;
      }else if(this.interact === 9){
        this.interact = 10;
      }else if(this.interact === 10){
        this.interact = 11;
      }else if(this.interact === 11){
        this.interact = 12;
      }else{
        this.interact = 15;
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
    } else if (this.interact === 2) {
      return new NotebookIntro(this.maxX, this.maxY, this.player, 4);
    }else if(this.interact === 3){
      Notebook.museumTicket = true;
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
      const drawer: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/interractables/sophieCubbordTicket.png');
      context.drawImage(drawer, 0, 0, window.innerWidth, window.innerHeight);
    }

    if (this.interact === 4) {
      const sophietxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/sophie/sophie1.png');
      context.drawImage(sophietxt, 0, 0, window.innerWidth, window.innerHeight);
    }if (this.interact === 6) {
      const sophietxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/sophie/sophie2.png');
      context.drawImage(sophietxt, 0, 0, window.innerWidth, window.innerHeight);
    }if (this.interact === 7) {
      const sophietxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/sophie/sophie3.png');
      context.drawImage(sophietxt, 0, 0, window.innerWidth, window.innerHeight);
    }if (this.interact === 8) {
      const sophietxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/sophie/sophie4.png');
      context.drawImage(sophietxt, 0, 0, window.innerWidth, window.innerHeight);
    }if (this.interact === 9) {
      const sophietxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/sophie/sophie5.png');
      context.drawImage(sophietxt, 0, 0, window.innerWidth, window.innerHeight);
    }if (this.interact === 10) {
      const sophietxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/sophie/sophie6.png');
      context.drawImage(sophietxt, 0, 0, window.innerWidth, window.innerHeight);
    }if (this.interact === 11) {
      const sophietxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/sophie/sophie7.png');
      context.drawImage(sophietxt, 0, 0, window.innerWidth, window.innerHeight);
    }if (this.interact === 12) {
      const sophietxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/sophie/sophie8.png');
      context.drawImage(sophietxt, 0, 0, window.innerWidth, window.innerHeight);
    }

    super.render(canvas);
  }
}
