import CanvasRenderer from '../CanvasRenderer.js';
import Scene from '../Scene.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Level2 from './Level2.js';
import Level7 from './Level7.js';
import NotebookIntro from '../NotebookIntro.js';
import Notebook from '../Notebook.js';
import FillInBlankScene from '../FillInBlankMiniGame/FillInBlankScene.js';

export default class Level6 extends Scene {
  public static notebookComplete: boolean = false;

  private mustMakeNotebookComplete: boolean = false;

  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY, player);
    this.background = CanvasRenderer.loadNewImage('./assets/bar.png');
    this.newCanvasItem(10, window.innerHeight - 300, CanvasRenderer.loadNewImage('./assets/terugknop.png')); //1
    this.newCanvasItem(window.innerWidth / 18, window.innerHeight / 3, CanvasRenderer.loadNewImage('./assets/collisionfields/200x400invis.png')); //2 - jack
    this.newCanvasItem(window.innerWidth / 3, window.innerHeight / 2.8, CanvasRenderer.loadNewImage('./assets/collisionfields/100x200invis.png')); //3 - safe
    this.newCanvasItem(window.innerWidth / 2.2, window.innerHeight / 4, CanvasRenderer.loadNewImage('./assets/collisionfields/200x400invis.png')); //4 - door
    this.newCanvasItem(window.innerWidth - 250, window.innerHeight - 250, CanvasRenderer.loadNewImage('./assets/caseIcon.png')); //5 notebook
    this.newCanvasItem(window.innerWidth / 1.35, window.innerHeight / 2.8, CanvasRenderer.loadNewImage('./assets/collisionfields/100x100invis.png')); //6 - bottle
    this.newCanvasItem(window.innerWidth / 1.2, window.innerHeight / 4, CanvasRenderer.loadNewImage('./assets/collisionfields/100x200invis.png')); //7 - bartender
    this.newCanvasItem(window.innerWidth / 1.1, window.innerHeight / 3.3, CanvasRenderer.loadNewImage('./assets/collisionfields/200x400invis.png')); //8 - kees
  }

  /**
   * Process input from the mouse
   *
   * @param mouseListener mouse listener object
   */
  public override processInput(mouseListener: MouseListener): void {
    super.processInput(mouseListener);
    if (mouseListener.buttonPressed(0)) {
      if(this.interact === 2){ //jack dialog
        this.interact = 10;
      }else if(this.interact === 10){
        this.interact = 11;
      }else if(this.interact === 11){
        this.interact = 12;
      }else if(this.interact === 7){ //bartender dialog
        this.interact = 20;
      }else if(this.interact === 20){
        this.interact = 21;
      }else if(this.interact === 21){
        this.interact = 22;
      }else if(this.interact === 22){
        this.interact = 23;
      }else if(this.interact === 23){
        this.interact = 24;
      }else if(this.interact === 8){ //kees dialog
        this.interact = 30;
      }else if(this.interact === 30){
        this.interact = 31;
      }else if(this.interact === 31){
        this.interact = 32;
      }else if(this.interact === 32){
        this.interact = 33;
      }else if(this.interact === 33){
        this.interact = 34;
      }else if(this.interact === 34){
        this.interact = 35;
      }else{
        this.interact = 36;
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
   */
  public override ifCanvasItemIsClicked(): Scene | null {
    if (this.interact === 1) {
      return new Level2(this.maxX, this.maxY, this.player);
    }else if (this.interact === 3) {
      Notebook.kluis = true;
      Notebook.diamant = true;
    }else if (this.interact === 4 && Level6.notebookComplete){
      return new Level7(this.maxX, this.maxY, this.player);
    }else if (this.interact === 4 && !Level6.notebookComplete) {
      this.mustMakeNotebookComplete = true;
    }else if (this.interact === 5) {
      return new NotebookIntro(this.maxX, this.maxY, this.player, 6);
    }else if (this.interact === 4) {
      return new FillInBlankScene(this.maxX, this.maxY, this.player);
    }else if (this.interact === 2) {
      Notebook.sigaar = true;
    }else if (this.interact === 6) {
      Notebook.fles = true;
    }else if (this.interact === 7) {
      Notebook.kurkOpener = true;
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
    if(this.mustMakeNotebookComplete){
      CanvasRenderer.writeText(canvas, 'make the notebook compleet by getting all 10 items', 1020, 200, 'center', 'Arial', 40, 'white');
    }

    if(this.interact === 3){
      const safe: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/interractables/insideSafe.png');
      context.drawImage(safe, 0, 0, window.innerWidth, window.innerHeight);
    }

    if(this.interact === 2){
      const jacktxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/jack/jack1.png');
      context.drawImage(jacktxt, 0, 0, window.innerWidth, window.innerHeight);
    }if(this.interact === 10){
      const jacktxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/jack/jack2.png');
      context.drawImage(jacktxt, 0, 0, window.innerWidth, window.innerHeight);
    }if(this.interact === 11){
      const jacktxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/jack/2.1.png');
      context.drawImage(jacktxt, 0, 0, window.innerWidth, window.innerHeight);
    }if(this.interact === 12){
      const jacktxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/jack/3.png');
      context.drawImage(jacktxt, 0, 0, window.innerWidth, window.innerHeight);
    }

    if(this.interact === 7){
      const bartendertxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/bartender/bartender1.png');
      context.drawImage(bartendertxt, 0, 0, window.innerWidth, window.innerHeight);
    }if(this.interact === 20){
      const bartendertxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/bartender/bartender2.png');
      context.drawImage(bartendertxt, 0, 0, window.innerWidth, window.innerHeight);
    }if(this.interact === 21){
      const bartendertxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/bartender/bartender3.png');
      context.drawImage(bartendertxt, 0, 0, window.innerWidth, window.innerHeight);
    }if(this.interact === 22){
      const bartendertxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/bartender/bartender4.png');
      context.drawImage(bartendertxt, 0, 0, window.innerWidth, window.innerHeight);
    }if(this.interact === 23){
      const bartendertxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/bartender/bartender5.png');
      context.drawImage(bartendertxt, 0, 0, window.innerWidth, window.innerHeight);
    }if(this.interact === 24){
      const bartendertxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/bartender/bartender6.png');
      context.drawImage(bartendertxt, 0, 0, window.innerWidth, window.innerHeight);
    }

    if(this.interact === 8){
      const bartendertxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/kees/kees1.png');
      context.drawImage(bartendertxt, 0, 0, window.innerWidth, window.innerHeight);
    }if(this.interact === 30){
      const bartendertxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/kees/kees2.png');
      context.drawImage(bartendertxt, 0, 0, window.innerWidth, window.innerHeight);
    }if(this.interact === 31){
      const bartendertxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/kees/kees3.png');
      context.drawImage(bartendertxt, 0, 0, window.innerWidth, window.innerHeight);
    }if(this.interact === 32){
      const bartendertxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/kees/kees4.png');
      context.drawImage(bartendertxt, 0, 0, window.innerWidth, window.innerHeight);
    }if(this.interact === 33){
      const bartendertxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/kees/kees5.png');
      context.drawImage(bartendertxt, 0, 0, window.innerWidth, window.innerHeight);
    }if(this.interact === 34){
      const bartendertxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/kees/kees6.png');
      context.drawImage(bartendertxt, 0, 0, window.innerWidth, window.innerHeight);
    }if(this.interact === 35){
      const bartendertxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/kees/kees7.png');
      context.drawImage(bartendertxt, 0, 0, window.innerWidth, window.innerHeight);
    }

    super.render(canvas);
  }
}
