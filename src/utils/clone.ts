/**
 * Deep clone (copies properties only, not methods)
 */
export function clone<T>(object: T): T {
  if (object === undefined) {
    return object;
  }
  const stringified: string = JSON.stringify(object);
  const clonedObject: T = JSON.parse(stringified) as T;
  return clonedObject;
}
