import CanvasRenderer from '../CanvasRenderer.js';
import Scene from '../Scene.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Level2 from './Level2.js';
import NotebookIntro from '../NotebookIntro.js';
import Notebook from '../Notebook.js';
import WordleScene from '../WordleMiniGame/WordleScene.js';

export default class Level1 extends Scene {
  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY, player);
    this.background = CanvasRenderer.loadNewImage('./assets/backgrounds/mainarea(level1).png');
    this.newCanvasItem(window.innerWidth - 250, window.innerHeight - 250, CanvasRenderer.loadNewImage('./assets/caseIcon.png')); //1 notebook
    this.newCanvasItem(window.innerWidth / 3.6, window.innerHeight / 1.9, CanvasRenderer.loadNewImage('./assets/collisionfields/200x400invis.png')); // 2 - henk
    this.newCanvasItem(window.innerWidth / 1.5, window.innerHeight / 1.8, CanvasRenderer.loadNewImage('./assets/collisionfields/200x400invis.png')); // 3 - gerda
    this.newCanvasItem(window.innerWidth / 1.5, window.innerHeight / 3.3, CanvasRenderer.loadNewImage('./assets/collisionfields/200x100invis.png')); // 4 - tassen
    this.newCanvasItem(window.innerWidth / 2.2, window.innerHeight / 2.5, CanvasRenderer.loadNewImage('./assets/collisionfields/200x300invis.png')); // 5 - deur
    this.newCanvasItem(window.innerWidth / 2.1, window.innerHeight / 1.4, CanvasRenderer.loadNewImage('./assets/collisionfields/100x150invis.png')); // 6 - de trein ticket
  }

  /**
   * Process input from the mouse
   * @param mouseListener mouse listener object
   */
  public override processInput(mouseListener: MouseListener): void {
    super.processInput(mouseListener);
    if (mouseListener.buttonPressed(0)){
      //henk dialog
      if(this.interact === 2){
        this.interact = 10;
      }else if(this.interact === 10){
        this.interact = 11;
      }else if(this.interact === 11){
        this.interact = 12;
      }else if(this.interact === 12){
        this.interact = 13;
      //gerda dialog
      }else if(this.interact === 3){
        this.interact = 20;
      }else if(this.interact === 20){
        this.interact = 21;
      }else if(this.interact === 21){
        this.interact = 22;
      }else{
        this.interact = 14;
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
    if (this.interact === 5) {
      return new Level2(this.maxX, this.maxY, this.player);
    }else if (this.interact === 1) {
      return new NotebookIntro(this.maxX, this.maxY, this.player, 1);
    }else if (this.interact === 6) {
      Notebook.treinTicket = true;
    }else if (this.interact === 4) {
      return new WordleScene(this.maxX, this.maxY, this.player);
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

    //henk dialog
    if(this.interact === 2){
      const henktxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/henk/henk2.png');
      context.drawImage(henktxt, 0, 0, window.innerWidth, window.innerHeight);
    }if(this.interact === 10){
      const henktxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/henk/henk3.png');
      context.drawImage(henktxt, 0, 0, window.innerWidth, window.innerHeight);
    }if(this.interact === 11){
      const henktxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/henk/henk4.png');
      context.drawImage(henktxt, 0, 0, window.innerWidth, window.innerHeight);
    }if(this.interact === 12){
      const henktxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/henk/henk5.png');
      context.drawImage(henktxt, 0, 0, window.innerWidth, window.innerHeight);
    }if(this.interact === 13){
      const henktxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/henk/henk7.png');
      context.drawImage(henktxt, 0, 0, window.innerWidth, window.innerHeight);
    }

    //gerda dialog
    if(this.interact === 3){
      const gerdatxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/gerda/gerda1.png');
      context.drawImage(gerdatxt, 0, 0, window.innerWidth, window.innerHeight);
    }if(this.interact === 20){
      const gerdatxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/gerda/gerda2.png');
      context.drawImage(gerdatxt, 0, 0, window.innerWidth, window.innerHeight);
    }if(this.interact === 21){
      const gerdatxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/gerda/gerda3.png');
      context.drawImage(gerdatxt, 0, 0, window.innerWidth, window.innerHeight);
    }if(this.interact === 22){
      const gerdatxt: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/gesprekken/gerda/gerda4.png');
      context.drawImage(gerdatxt, 0, 0, window.innerWidth, window.innerHeight);
    }

    super.render(canvas);
  }
}
