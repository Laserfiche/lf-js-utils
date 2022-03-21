/**
 * Creates a Promise that completes after the specified number of miliseconds
 * @param timeMs 
 * @returns 
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
 */
 export function yieldAsync(): Promise<void> {
  const promise = new Promise<void>((resolve) => {
    setTimeout(() => resolve());
  });
  return promise;
}