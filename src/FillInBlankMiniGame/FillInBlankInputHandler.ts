/**
 * FillInBlankInputHandler.ts
 *
 * Handles mouse input for the fill-in-the-blank mini-game:
 *  - Option A: Drag-and-drop word tiles
 *  - Option B: Simple click to select a word, then click the blank to fill it
 */

import MouseListener from '../MouseListener.js';

export interface DraggableWord {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isDragging: boolean;
}

export class FillInBlankInputHandler {
  private mouseListener: MouseListener;

  private activeWord: DraggableWord | null = null;

  private dragOffsetX: number = 0;

  private dragOffsetY: number = 0;

  public constructor(mouseListener: MouseListener) {
    this.mouseListener = mouseListener;
  }

  /**
   *
   */
  public handleDragWords(words: DraggableWord[]): void {
    // typed mousePos:
    const mousePos: { x: number; y: number } = this.mouseListener.getMousePosition();

    if (this.mouseListener.buttonPressed(0)) {
      // typed clickedWord:
      const clickedWord: DraggableWord | undefined = words.find(
        (w: DraggableWord) =>
          mousePos.x >= w.x &&
          mousePos.x <= w.x + w.width &&
          mousePos.y >= w.y &&
          mousePos.y <= w.y + w.height
      );

      if (clickedWord) {
        this.activeWord = clickedWord;
        clickedWord.isDragging = true;
        this.dragOffsetX = mousePos.x - clickedWord.x;
        this.dragOffsetY = mousePos.y - clickedWord.y;
      }
    }

    if (this.activeWord && this.activeWord.isDragging) {
      this.activeWord.x = mousePos.x - this.dragOffsetX;
      this.activeWord.y = mousePos.y - this.dragOffsetY;
    }

    if (!this.mouseListener.isButtonDown(0) && this.activeWord) {
      this.activeWord.isDragging = false;
      this.activeWord = null;
    }
  }
}
