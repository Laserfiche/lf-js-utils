/**
 * Creates a Promise that completes after the specified number of miliseconds
 * @param timeMs 
 * @returns 
 * @example
 * ```typescript
 * await sleepAsync(3000); // returns in 3 seconds
 * ```
 */
export function sleepAsync(timeMs: number): Promise<void> {
  const promise = new Promise<void>((resolve) => {
    setTimeout(() => resolve(), timeMs);
  });
  return promise;
}

/**
 * Returns a Promise that completes when the test function returns true, or after the timeout has elapsed
 * @param func a function that returns true when the test condition is met
 * @param timeoutFunc the function called after a timeout
 * @param timeoutMs miliseconds to wait for the test function to return true before timing out
 * @returns 
 * @example
 * ```typescript
 * let test = 1;
 * const trueFunc = () => {test == 1}
 * const falseFunc = () => {test == 2}
 * const timeoutFunc = () => {console.warn('timeout!')}
 * waitForConditionAsync(trueFunc, timeoutFunc, 3000); // returns right away
 * waitForConditionAsync(falseFunc, timeoutFunc, 3000); // returns in 3s and console.warn('timeout!')
 * ```
 */
export async function waitForConditionAsync(func: () => boolean, timeoutFunc: () => void, timeoutMs: number = 2000): Promise<void> {
  const startTime = new Date().getTime();
  while (new Date().getTime() - startTime < timeoutMs) {
    if (func()) {
      return;
    } else {
      await sleepAsync(50);
    }
  }
  timeoutFunc();
}


/**
 * Asynchronous method to force the method to complete asynchronously
 * @example
 * ```typescript
 * this.isLoading = true;
 * await yieldAsync();  // makes sure this.isLoading is true, and the subsequence call is based on this.isLoading being true
 * ```
 */
 export function yieldAsync(): Promise<void> {
  const promise = new Promise<void>((resolve) => {
    setTimeout(() => resolve());
  });
  return promise;
}