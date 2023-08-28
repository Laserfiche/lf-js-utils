
/**
 *
 * @param str Function to check if an input string is empty
 * @returns
 */
 export function inputIsEmpty(str: string): boolean {
  const trimmed = str.trim();
  return trimmed.length === 0;
}
