/**
 * Utility methods and data for the Wordle mini-game.
 */

/**
 * A small sample list of possible Wordle words (for demonstration).
 * In a real app, you'd likely have a much larger list.
 */
const WORD_LIST: string[] = [
  'appel',
  'druif',
  'stoel',
  'taart',
  'vogel',
  'molen',
  'kraan',
  'zomer',
  'vloer',
  'brood',
  'nacht',
  'varen',
  'regen',
  'rozen',
  'lucht',
  'kleur',
  'knoop',
  'steen',
  'smaak',
  'scher',
  'trots',
  'strom',
  'water',
  'brand',
  'bloem',
  'kroon',
  'hoorn',
  'toren',
  'brief',
  'sloep',
  'droom',
  'frame',
  'zwart',
  'groen',
  'blauw',
  'geest',
  'feest',
  'laten',
  'klant',
  'licht',
  'begin',
  'vloer',
  'engel',
  'lente',
  'haren',
  'vloer',
  'muren',
  'reken',
  'vraag',
  'piano',
];

/**
   * Pick a random word from WORD_LIST to serve as the solution.
   *
   * @returns a random word
   */
export function getRandomSolution(): string {
  const randomIndex: number = Math.floor(Math.random() * WORD_LIST.length);
  return WORD_LIST[randomIndex].toUpperCase();
}

/**
   * Check if a given word is in the dictionary (optional).
   *
   * In real Wordle, not all 5-letter words are valid guesses,
   * so typically there's a large dictionary to verify guess validity.
   *
   * @param word - The word to check.
   * @returns true if the word is recognized, false otherwise.
   */
export function isValidWord(word: string): boolean {
  const upperWord: string = word.toUpperCase();
  return WORD_LIST.includes(upperWord.toLowerCase());
}
