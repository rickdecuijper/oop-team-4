import Game from './Game.js';
import CanvasRenderer from './CanvasRenderer.js';
import MouseListener from './MouseListener.js';
import SceneStart from './SceneStart.js';
import Scene from './Scene.js';
import Player from './Player.js';

export default class TheCrazyDiamant extends Game{
  private canvasItem:[] = [];

  private currentScene: Scene;

  private mouseListener: MouseListener;

  private canvas: HTMLCanvasElement;

  private player: Player;

  public constructor(canvas: HTMLCanvasElement){
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.mouseListener = new MouseListener(this.canvas);
    this.player = new Player(this.canvas.width, this.canvas.height);
    this.currentScene = new SceneStart(this.canvas.width, this.canvas.height, this.player);
  }

  /**
  * Process all input. Called from the GameLoop.
  */
  public processInput():void{
    this.currentScene.processInput(this.mouseListener);
    this.player.move(this.mouseListener.getMousePosition().x,
      this.mouseListener.getMousePosition().y);
  }

  /**
  * Update game state. Called from the GameLoop
  * @param elapsed time elapsed from the GameLoop
  * @returns true if the game should continue
  */
  public update(elapsed: number): boolean{
    this.currentScene.update(elapsed, this.canvasItem);
    const nextScene: Scene | null = this.currentScene.ifCanvasItemIsClicked();
    if (nextScene !== null) {
      this.currentScene = nextScene;
    }
    return true;
  }

  /**
   * Render all the elements in the screen. Called from GameLoop
   */
  public render(): void {
    CanvasRenderer.clearCanvas(this.canvas);
    CanvasRenderer.fillCanvas(this.canvas, 'black');
    this.currentScene.render(this.canvas);
  }
}
