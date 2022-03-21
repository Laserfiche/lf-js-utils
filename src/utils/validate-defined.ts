/**
 * If value is undefined, it returns the defaultValue, or throws an exception.
 * Else returns the not-undefined value.
 * @param value 
 * @param paramName the parameter name used in the error message
 * @param defaultValue default value when undefined value is passed in
 * @returns defined value
 */
export function validateDefined<T>(value: T | undefined, paramName: string, defaultValue?: T): T {
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`${paramName} undefined`);
  }
  return value;
}
