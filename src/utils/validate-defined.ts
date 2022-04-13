/**
 * If value is undefined, it returns the defaultValue, or throws an exception.
 * Else returns the not-undefined value.
 * @param value 
 * @param paramName the parameter name used in the error message
 * @param defaultValue default value when undefined value is passed in
 * @returns defined value
 * @example
 * ```typescript
 * const value1 = undefined;
 * const value2 = 'validString';
 * const defaultString = 'defaultString';
 * const param = 'stringParam';
 * 
 * validateDefined(value1, param, defaultString); // 'defaultString'
 * validateDefined(value1, param, undefined); // Error: stringParam undefined
 * validateDefined(value2, param, defaultString); // 'validString'
 * validateDefined(value2, param, undefined); // 'validString'
 * ```
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
