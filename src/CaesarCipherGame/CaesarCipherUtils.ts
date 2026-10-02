/**
 * cipherUtils.ts
 *
 * Provides helper functions to encode and decode text using the Caesar cipher.
 * 
 * Key Features:
 *  - Shifts letters while wrapping around A-Z or a-z.
 *  - Ignores non-alphabetic characters (digits, punctuation, spaces remain unchanged).
 *  - Case-preserving (uppercase letters remain uppercase; lowercase remains lowercase).
 */

/**
 *
 */
export function encodeCaesar(message: string, shift: number): string {
  let encoded: string = '';

  // typed i
  for (let i: number = 0; i < message.length; i++) {
    const char: string = message[i];

    if (char >= 'A' && char <= 'Z') {
      const code: number = char.charCodeAt(0);
      const newCode: number = ((code - 65 + shift) % 26) + 65;
      encoded += String.fromCharCode(newCode);
    } else if (char >= 'a' && char <= 'z') {
      const code: number = char.charCodeAt(0);
      const newCode: number = ((code - 97 + shift) % 26) + 97;
      encoded += String.fromCharCode(newCode);
    } else {
      encoded += char;
    }
  }

  return encoded;
}

/**
 * Decodes a given message using the Caesar cipher with a specified shift.
 */
export function decodeCaesar(message: string, shift: number): string {
  let decoded: string = '';

  // typed i
  for (let i: number = 0; i < message.length; i++) {
    const char: string = message[i];

    if (char >= 'A' && char <= 'Z') {
      const code: number = char.charCodeAt(0);
      const newCode: number = ((code - 65 - shift + 26) % 26) + 65;
      decoded += String.fromCharCode(newCode);
    } else if (char >= 'a' && char <= 'z') {
      const code: number = char.charCodeAt(0);
      const newCode: number = ((code - 97 - shift + 26) % 26) + 97;
      decoded += String.fromCharCode(newCode);
    } else {
      decoded += char;
    }
  }

  return decoded;
}
