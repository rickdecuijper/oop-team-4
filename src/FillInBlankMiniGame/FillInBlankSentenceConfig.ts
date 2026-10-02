/**
 * FillInBlankSentenceConfig.ts
 *
 * Responsible for providing the fill-in-the-blank data from the JSON file.
 * You can fetch or import the JSON, then expose a method to retrieve it.
 */

export interface FillInBlankData {
  sentence: string;
  correctAnswer: string[];
  options: string[];
  blanksCount: number;
}

export class FillInBlankSentenceConfig {
  private static data: FillInBlankData[] = [];

  /**
   * Loads the fill-in-the-blank data.
   */
  public static async loadData(): Promise<void> {
    this.data = [
      {
        sentence: 'Er zit een ___ op de kluis. Als je goed kijkt is deze niet van ___',
        correctAnswer: ['slot', 'staal'],
        options: ['kat', 'tekening', 'slot', 'scheur', 'open', 'staal', 'licht'],
        blanksCount: 1,
      },
    ];
  }

  public static getAllData(): FillInBlankData[] {
    return this.data;
  }

  public static getRandomSentence(): FillInBlankData {
    // typed randomIndex
    const randomIndex: number = Math.floor(Math.random() * this.data.length);
    return this.data[randomIndex];
  }
}
