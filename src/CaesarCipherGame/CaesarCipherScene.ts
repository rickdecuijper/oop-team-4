/**
 * CaesarCipherScene.ts
 *
 * This Scene class implements a mini-game where players must encode or decode
 * messages using the Caesar cipher. The user can input a shift value and
 * attempt to match or solve the puzzle. Once the puzzle is solved or exited,
 * the scene can transition back to another level or scene.
 */

import Scene from '../Scene.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import { encodeCaesar, decodeCaesar} from './CaesarCipherUtils.js';
import CaesarInputHandler from './CaesarCipherInputHandler (1).js';
import CaesarRenderer from './CaesarCipherRenderer.js';

export default class CaesarCipherScene extends Scene {
  private inputHandler: CaesarInputHandler | null;

  private puzzleRenderer: CaesarRenderer | null;

  private puzzleMessage: string;

  private shiftKey: number;

  private puzzleSolved: boolean;

  private attempts: number;

  private readonly ALPHABET: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
  ];

  private userShiftTable: string[];

  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY, player);

    this.inputHandler = null;
    this.puzzleRenderer = null;
    this.puzzleMessage = 'HELLO WORLD';
    this.shiftKey = Math.floor(Math.random() * 25) + 1;
    this.puzzleMessage = encodeCaesar(this.puzzleMessage, this.shiftKey);

    this.puzzleSolved = false;
    this.attempts = 0;
    this.userShiftTable = new Array(26).fill('');
  }

  /**
   *
   */
  public override processInput(mouseListener: MouseListener): void {
    super.processInput(mouseListener);
  }

  /**
   *
   */
  public override update(elapsed: number): void {
    super.update(elapsed, []);

    if (!this.inputHandler) {
      this.inputHandler = new CaesarInputHandler();

      // onSubmit => add types:
      this.inputHandler.onSubmit = (
        userText: string,
        userShift: number,
        mode: 'encode' | 'decode'
      ): void => {
        this.attempts += 1;

        // correctPlaintext typed:
        const correctPlaintext: string = 'HELLO WORLD';
        let attemptResult: string = '';

        if (mode === 'decode') {
          attemptResult = decodeCaesar(userText, userShift);
        } else {
          attemptResult = encodeCaesar(userText, userShift);
        }

        if (attemptResult.toUpperCase() === correctPlaintext) {
          this.puzzleSolved = true;
        }
      };
    }
    if (this.puzzleSolved) {
      this.interact = 2;
    }
  }

  /**
   *
   * @returns null
   */
  public override ifCanvasItemIsClicked(): Scene | null {
    if (this.interact === 1) {
      return null;
    }
    if (this.interact === 2) {
      return null;
    }
    return null;
  }

  /**
   *
   */
  public override render(canvas: HTMLCanvasElement): void {
    if (!this.puzzleRenderer) {
      this.puzzleRenderer = new CaesarRenderer(canvas);
    }
    // typed context
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(this.background, 0, 0, canvas.width, canvas.height);
    }

    // typed userText, userShift, userMode
    const userText: string = this.inputHandler?.getUserText() ?? '';
    const userShift: number = this.inputHandler?.getShiftKey() ?? 3;
    const userMode: string = this.inputHandler?.getMode() ?? 'decode';

    // typed realTimeResult
    let realTimeResult: string = '';
    if (userMode === 'encode') {
      realTimeResult = encodeCaesar(userText, userShift);
    } else {
      realTimeResult = decodeCaesar(userText, userShift);
    }

    this.puzzleRenderer.drawPuzzleHUD(
      this.puzzleMessage,
      userShift,
      this.puzzleSolved,
      this.attempts,
      userText,
      userMode,
    );

    // typed xPos, yPos
    const xPos: number = 20;
    const yPos: number = 400;
    context!.font = '18px Arial';
    context!.fillStyle = 'blue';
    context!.fillText(`Real-time result: ${realTimeResult}`, xPos, yPos);

    context!.fillStyle = 'red';
    context!.fillText('INSTRUCTION: SHIFT THE ALPHABET BY 3 SPACES', 20, 440);

    this.puzzleRenderer.drawShiftTable(
      this.ALPHABET,
      this.userShiftTable,
      canvas.width - 160,
      50
    );

    super.render(canvas);
  }
}
