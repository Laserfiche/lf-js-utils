export function sleepAsync(timeMs: number): Promise<void> {
  const promise = new Promise<void>((resolve) => {
    setTimeout(() => resolve(), timeMs);
  });
  return promise;
}

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
 * */
 export function yieldAsync(): Promise<void> {
  const promise = new Promise<void>((resolve) => {
    setTimeout(() => resolve());
  });
  return promise;
}