import { Semaphore } from './semaphore';

/**
 * Given a function that represents asynchronous work, return a wrapped version
 * of that function that only allows a give number of instances of that work to
 * be happening at a time.
 */
// tslint:disable-next-line:no-any
export function wrapPool<S extends any[], T>(
  fn: (...args: S) => Promise<T>,
  poolSize: number
): (...args: S) => Promise<T> {
  const semaphore = new Semaphore(poolSize);
  return async (...args: S) => {
    await semaphore.acquire();
    try {
      return await fn(...args);
    } finally {
      semaphore.release();
    }
  };
}
