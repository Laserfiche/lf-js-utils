/**
 * Returns the formatted string.
 * It will replace parameters of the format {x}, where x is a number and will be used as
 * the index to find the value in the array of params
 * @param stringToFormat The string to format
 * @param params The params to replace
 * @returns String with the params replaced. Will throw if the number of replacement parameters do not mat
 * @example
 * ```typescript
 * const formattedString = formatString('Do you like {0} and {1}? I like {0}', ['apples', 'bananas'])
 * // formattedString = 'Do you like apples and bananas? I like apples'
 * ```
 */
 export function formatString(stringToFormat: string, params?: string[]): string {
    const expectedParams: RegExpMatchArray = stringToFormat.match(/\{\d+\}/g) ?? [];
    const expectedNumParams: number = new Set(expectedParams).size;
    if (
      (expectedNumParams > 0 && params?.length !== expectedNumParams) ||
      (expectedNumParams === 0 && params && params.length > 0)
    ) {
      throw new Error(`Expected ${expectedNumParams} arguments. Actual arguments: ${params?.length ?? '0'}.`);
    }
  
    if (params && params.length > 0) {
      for (let i = 0; i < params.length; i++) {
        const replacement: string = params[i];
        const varRegex: RegExp = new RegExp(`\\{${i}\\}`, 'g');
        stringToFormat = stringToFormat.replace(varRegex, replacement);
      }
    }
    return stringToFormat;
  }
  