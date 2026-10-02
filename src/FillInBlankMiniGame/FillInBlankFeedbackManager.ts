/**
 * FillInBlankFeedbackManager.ts
 *
 * Tracks correct/incorrect states and offers simple methods to display messages or highlight.
 */
export class FillInBlankFeedbackManager {
  private feedbackMessage: string = '';

  public setCorrect(): void {
    this.feedbackMessage = 'Correct!';
  }

  public setIncorrect(): void {
    this.feedbackMessage = 'probeer het opnieuw!';
  }

  public clear(): void {
    this.feedbackMessage = '';
  }

  public getMessage(): string {
    return this.feedbackMessage;
  }
}

