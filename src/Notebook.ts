import CanvasRenderer from './CanvasRenderer.js';
import Scene from './Scene.js';
import Player from './Player.js';
import CollisionField from './CollisionField.js';
import MouseListener from './MouseListener.js';
import Level1 from './gameLevels/Level1.js';
import Level2 from './gameLevels/Level2.js';
import Level3 from './gameLevels/Level3.js';
import Level4 from './gameLevels/Level4.js';
import Level5 from './gameLevels/Level5.js';
import Level6 from './gameLevels/Level6.js';

export default class Notebook extends Scene {
  private levelNo: number;

  private backToLevel: boolean = false;

  private page: number = 0;

  public pageImg: HTMLImageElement[] = [];

  private pageMax: number;

  private pageMin: number = 0;

  public static earrings: boolean = false;

  public static fles: boolean = false;

  public static kurkOpener: boolean = false;

  public static museumTicket: boolean = false;

  public static treinTicket: boolean = false;

  public static treinRailSysteemMap: boolean = false;

  public static kluis: boolean = false;

  public static diamant: boolean = false;

  public static oliviaHandSchoenen: boolean = false;

  public static sigaar: boolean = false;

  private items: boolean[] = [];

  private itemsImg: string[] = [];

  public constructor(maxX: number, maxY: number, player: Player,
    levelNo: number) {
    super(maxX, maxY, player);
    this.background = CanvasRenderer.loadNewImage('./assets/notebook/notebookBase.png');
    this.canvasItem.push(new CollisionField(10, window.innerHeight - 300, CanvasRenderer.loadNewImage('./assets/terugknop.png')));
    this.canvasItem.push(new CollisionField(window.innerWidth / 1.2 - window.innerWidth / 15,
      window.innerHeight / 1.2 - window.innerHeight / 38, CanvasRenderer.loadNewImage('./assets/nextButton.png')));
    this.canvasItem.push(new CollisionField(window.innerWidth / 1.6 - window.innerWidth / 15,
      window.innerHeight / 1.2 - window.innerHeight / 38, CanvasRenderer.loadNewImage('./assets/previewButton.png')));
    this.levelNo = levelNo;
    this.pageImg.push(CanvasRenderer.loadNewImage('./assets/mainPage.png'));
    this.pageMax = this.pageImg.length - 1;
    this.items = [Notebook.earrings, Notebook.fles, Notebook.kurkOpener, Notebook.museumTicket,
      Notebook.treinTicket, Notebook.treinRailSysteemMap, Notebook.kluis, Notebook.diamant,
      Notebook.oliviaHandSchoenen, Notebook.sigaar];
    this.itemsImg = ['notebook/earringsPages.png', 'notebook/pageBottleNote.png', 'notebook/notebookkurkenopenerpage.png', 'notebook/museumTicketPage.png',
      'notebook/trainTicketPage.png', 'notebook/notebookMap.png', 'notebook/notebooksafepage.png', 'notebook/notebookdiamondpage.png', 'notebook/glovesPage.png', 'notebook/sigarPage.png'];
  }

  /**
   * Process input from the mouse
   * @param mouseListener mouse listener object
   */
  public override processInput(mouseListener: MouseListener): void {
    super.processInput(mouseListener);
    if (mouseListener.buttonPressed(0)){
      if(this.player.isCollidingWithItem(this.canvasItem[0])){
        this.backToLevel = true;
      }else if(this.player.isCollidingWithItem(this.canvasItem[1])){
        if(this.page < this.pageMax){
          this.page = this.page + 1;
        }
      }else if(this.player.isCollidingWithItem(this.canvasItem[2])){
        if(this.page > this.pageMin){
          this.page = this.page - 1;
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
    this.makeNewPage();
    if(this.pageMax === 10){
      Level6.notebookComplete = true;
    }
  }

  /**
   *
   * @returns new scene to switch to, or null to keep current scene
   */
  public override ifCanvasItemIsClicked(): Scene | null {
    if(this.backToLevel){
      if (this.levelNo === 1) {
        return new Level1(this.maxX, this.maxY, this.player);
      } else if (this.levelNo === 2) {
        return new Level2(this.maxX, this.maxY, this.player);
      }else if (this.levelNo === 3) {
        return new Level3(this.maxX, this.maxY, this.player);
      }else if (this.levelNo === 4) {
        return new Level4(this.maxX, this.maxY, this.player);
      }else if (this.levelNo === 5) {
        return new Level5(this.maxX, this.maxY, this.player);
      }else if (this.levelNo === 6) {
        return new Level6(this.maxX, this.maxY, this.player);
      }
    }
    return null;
  }

  /**
   *
   * @param hint is the given hint-item
   */
  public makeNewPage(): void{
    for(let i: number = 0; i <= this.items.length; i++){
      if( this.items[i] === true){
        this.pageImg.push(CanvasRenderer.loadNewImage(`./assets/${this.itemsImg[i]}`));
        this.pageMax = this.pageMax + 1;
        this.items[i] = false;
      }
    }
  }

  /**
   * Render the scene to the canvas
   * @param canvas canvas to render to
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.fillCanvas(canvas, 'black');
    const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
    context.drawImage(this.background, 0, 0, window.innerWidth, window.innerHeight);
    CanvasRenderer.writeText(canvas, `Pagina ${this.page}/${this.pageMax}`, window.innerWidth / 2, window.innerHeight / 11, 'center', 'Arial', 40, 'white');
    for(const item of this.canvasItem){
      item.render(canvas);
    }for(let i: number = 0; i < this.pageImg.length; i++){
      if(this.page === i){
        context.drawImage(this.pageImg[i], 0, 0, window.innerWidth, window.innerHeight);
      }
    }
    super.render(canvas);
  }
}
