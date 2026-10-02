/**
 * inputHandler.ts
 *
 * Manages user input for the Caesar cipher mini-game, including:
 *  - typed letters for the message
 *  - adjusting the shift value
 *  - choosing encode/decode mode (optional)
 *  - submitting the puzzle attempt
 *
 * Usage:
 * 1. Instantiate the class: `const handler = new CaesarInputHandler();`
 * 2. Provide optional callbacks (e.g. `handler.onSubmit = ...`).
 * 3. The user types or presses keys, which update internal state. 
 * 4. On pressing Enter, `onSubmit` is called with the latest text, shift, and mode.
 */

export type CaesarMode = 'encode' | 'decode';

export default class CaesarInputHandler {
  /**
   * Stores the current message the user has typed.
   */
  private userText: string;

  /**
   * The current shift value (1-25).
   */
  private shiftKey: number;

  /**
   * Indicates whether user is in 'encode' or 'decode' mode.
   * If you only want to do one mode, you can remove this property.
   */
  private mode: CaesarMode;

  /**
   * Callback invoked when the user chooses to "submit" their attempt.
   */
  public onSubmit?: (userText: string, shiftKey: number, mode: CaesarMode) => void;

  /**
   * Constructor sets up the needed event listeners for keyboard input.
   */
  public constructor() {
    this.userText = '';
    this.shiftKey = 3; // default shift
    this.mode = 'decode'; // default mode (customize as you wish)

    // Add keyboard event listener
    window.addEventListener('keydown', this.handleKeyDown);
  }

  /**
   * Cleans up event listeners, useful if you are switching away from this scene.
   */
  public destroy(): void {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  /**
   * Returns the current user text. Other classes (e.g., the Scene or Renderer)
   * can call this if they need to display the typed text in real-time.
   */
  public getUserText(): string {
    return this.userText;
  }

  /**
   * Returns the current shift key.
   */
  public getShiftKey(): number {
    return this.shiftKey;
  }

  /**
   * Returns the current encode/decode mode.
   */
  public getMode(): CaesarMode {
    return this.mode;
  }

  /**
   * The main keyboard handler. This example:
   *  - Accepts letters, numbers, punctuation, etc. to store in `userText`.
   *  - Uses Backspace to remove last character.
   *  - Uses +/- or arrow up/down to change the shift key.
   *  - Uses 'E' or 'D' to toggle mode between "encode" and "decode" (if desired).
   *  - Presses Enter to submit the puzzle attempt via `onSubmit`.
   */
  private handleKeyDown = (event: KeyboardEvent): void => {
    const key:string = event.key; // e.g. "a", "A", "Enter", etc.
    const upper:string = key.toUpperCase(); // e.g. "A", "E", "D"
    const ctrl:boolean = event.ctrlKey; // check if user is holding CTRL
  
    // Press Enter => call onSubmit callback
    if (key === 'Enter') {
      if (this.onSubmit) {
        this.onSubmit(this.userText, this.shiftKey, this.mode);
      }
      return;
    }
  
    // Press Backspace => remove last character
    if (key === 'Backspace') {
      this.userText = this.userText.slice(0, -1);
      return;
    }
  
    // Adjust shift key with +/- or arrow keys
    if (key === '+' || key === '=') {
      this.shiftKey = Math.min(25, this.shiftKey + 1);
      return;
    }
    if (key === '-' || key === '_') {
      this.shiftKey = Math.max(1, this.shiftKey - 1);
      return;
    }
    if (key === 'ArrowUp') {
      this.shiftKey = Math.min(25, this.shiftKey + 1);
      return;
    }
    if (key === 'ArrowDown') {
      this.shiftKey = Math.max(1, this.shiftKey - 1);
      return;
    }
  
    // Toggle mode only if user holds CTRL or ALT plus E/D
    //  => e.g. Ctrl+E => encode, Ctrl+D => decode
    if (ctrl && upper === 'E') {
      this.mode = 'encode';
      event.preventDefault();
      return;
    }
    if (ctrl && upper === 'D') {
      this.mode = 'decode';
      event.preventDefault();
      return;
    }
  
    // Otherwise, if it's a single printable character, add to userText
    // (Ignore if it's something like Shift, Meta, or multi-length keys)
    if (key.length === 1 && !event.metaKey) {
      // Append the exact character typed (including uppercase if Shift was pressed)
      this.userText += key;
    }
  };
}
