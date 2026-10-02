import CanvasRenderer from '../CanvasRenderer.js';
import Scene from '../Scene.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Level2 from './Level2.js';
import NotebookIntro from '../NotebookIntro.js';
import Notebook from '../Notebook.js';

export default class Level3 extends Scene {
  public constructor(maxX: number, maxY: number, player: Player,) {
    super(maxX, maxY, player);
    this.background = CanvasRenderer.loadNewImage('./assets/cabin1.png');
    this.newCanvasItem(10, window.innerHeight - 300, CanvasRenderer.loadNewImage('./assets/terugknop.png'));
    this.newCanvasItem(window.innerWidth / 7.5, window.innerHeight / 3, CanvasRenderer.loadNewImage('./assets/collisionfields/200x400invis.png'));
    this.newCanvasItem(window.innerWidth - 250, window.innerHeight - 250, CanvasRenderer.loadNewImage('./assets/caseIcon.png'));
    this.newCanvasItem(window.innerWidth / 2.4, window.innerHeight / 1.7, CanvasRenderer.loadNewImage('./assets/collisionfields/400x200invis.png'));
  }

  /**
   * Process input from the mouse
   * @param mouseListener mouse listener object
   */
  public override processInput(mouseListener: MouseListener): void {
    super.processInput(mouseListener);

    if (mouseListener.buttonPressed(0)){
      if(this.player.isCollidingWithItem(this.canvasItem[0])){
        this.interact = 1;
      } else if (this.player.isCollidingWithItem(this.canvasItem[1])){
        this.interact = 2;
      } else if(this.player.isCollidingWithItem(this.canvasItem[2])){
        this.interact = 3;
      } else if (this.player.isCollidingWithItem(this.canvasItem[3])){
        this.interact = 5;
      }else if(this.interact === 2){
        this.interact = 10;
      }else if(this.interact === 10){
        this.interact = 11;
      }else if(this.interact === 11){
        this.interact = 12;
      }else if(this.interact === 12){
        this.interact = 13;
      }else if(this.interact === 13){
        this.interact = 14;
      }else if(this.interact === 14){
        this.interact = 15;
      }else if(this.interact === 15){
        this.interact = 16;
      }else if(this.interact === 16){
        this.interact = 17;
      }else if(this.interact === 17){
        this.interact = 18;
      }else if(this.interact === 18){
        this.interact = 19;
      }else if(this.interact === 19){
        this.interact = 20;
      }else if(this.interact === 20){
        this.interact = 21;
      }else{
        this.interact = 22;
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
    } else if (this.interact === 3) {
      return new NotebookIntro(this.maxX, this.maxY, this.player, 3);
    }else if (this.interact === 5) {
      Notebook.earrings = true;
    }
    return null;
  }

  /**
   * Render the scene to the canvas
   * @param canvas canvas to render to canvas
   */
  public override render(canvas: HTMLCanvasElement): void {
    const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
    context.drawImage(this.background, 0, 0, window.innerWidth, window.innerHeight);
    for(const item of this.canvasItem){
      item.render(canvas);
    }

    if (this.interact === 2) {
      Notebook.oliviaHandSchoenen = true;
      const oliviaText: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/olivia/olivia1.png');
      context.drawImage(oliviaText, 0, 0, window.innerWidth, window.innerHeight);
    }if (this.interact === 5) {
      const drawer: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/interractables/earringsdrawer.png');
      context.drawImage(drawer, 0, 0, window.innerWidth, window.innerHeight);
    }

    if (this.interact === 10) {
      const oliviaText: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/olivia/olivia2.png');
      context.drawImage(oliviaText, 0, 0, window.innerWidth, window.innerHeight);
    }if (this.interact === 11) {
      const oliviaText: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/olivia/olivia3.png');
      context.drawImage(oliviaText, 0, 0, window.innerWidth, window.innerHeight);
    }if (this.interact === 12) {
      const oliviaText: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/olivia/olivia4.png');
      context.drawImage(oliviaText, 0, 0, window.innerWidth, window.innerHeight);
    }if (this.interact === 13) {
      const oliviaText: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/olivia/olivia5.png');
      context.drawImage(oliviaText, 0, 0, window.innerWidth, window.innerHeight);
    }if (this.interact === 14) {
      const oliviaText: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/olivia/olivia6.png');
      context.drawImage(oliviaText, 0, 0, window.innerWidth, window.innerHeight);
    }if (this.interact === 15) {
      const oliviaText: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/olivia/olivia7.png');
      context.drawImage(oliviaText, 0, 0, window.innerWidth, window.innerHeight);
    }if (this.interact === 16) {
      const oliviaText: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/olivia/olivia8.png');
      context.drawImage(oliviaText, 0, 0, window.innerWidth, window.innerHeight);
    } if (this.interact === 17) {
      const oliviaText: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/olivia/olivia8.1.png');
      context.drawImage(oliviaText, 0, 0, window.innerWidth, window.innerHeight);
    }if (this.interact === 18) {
      const oliviaText: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/olivia/olivia9.png');
      context.drawImage(oliviaText, 0, 0, window.innerWidth, window.innerHeight);
    } if (this.interact === 19) {
      const oliviaText: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/olivia/olivia10.png');
      context.drawImage(oliviaText, 0, 0, window.innerWidth, window.innerHeight);
    }if (this.interact === 20) {
      const oliviaText: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/olivia/olivia11.png');
      context.drawImage(oliviaText, 0, 0, window.innerWidth, window.innerHeight);
    }if (this.interact === 21) {
      const oliviaText: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/olivia/olivia12.png');
      context.drawImage(oliviaText, 0, 0, window.innerWidth, window.innerHeight);
    }

    super.render(canvas);
  }
}
