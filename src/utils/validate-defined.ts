export function validateDefined<T>(value: T | undefined, paramName: string, defaultValue?: T): T {
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`${paramName} undefined`);
  }
  return value;
}
