/**
 * FillInBlankUtils.ts
 *
 * General helper functions for the fill-in-the-blank mini-game.
 */

/**
 * Shuffles an array in place.
 * @param array The array to shuffle.
 */
export function shuffleArray<T>(array: T[]): void {
  for (let i: number = array.length - 1; i > 0; i -= 1) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Checks if a chosen word is the correct answer.
 * @param chosenWord The chosen word.
 * @param correctAnswers The array of correct answers.
 * @returns True if the chosen word is a correct answer, false otherwise.
 */
export function isCorrectAnswer(chosenWord: string, correctAnswers: string[]): boolean {
  return correctAnswers.map((w: string) => w.toLowerCase()).includes(chosenWord.toLowerCase());
}
