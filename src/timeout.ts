import { to } from "./to.js";

/**
 * Type alias for a promise of type T.
 */
type TimeoutIn<T> = Promise<T>;

/**
 * Return type for the timeout function.
 */
type TimeoutOut<T> = [Error, null] | [null, T];

/**
 * This function ensures that a provided promise is resolved within a specified time.
 * If the promise does not resolve within the specified time, an error is thrown.
 * 
 * @template T The type of the value that the input promise resolves to.
 * @param {Promise<T>} promise - The promise to be awaited.
 * @param {number} ms - The number of milliseconds to wait.
 * @param {string} [message] - The error message to throw.
 * @returns {Promise<[Error, null] | [null, T]>} A promise that resolves to a tuple containing either an error or the result.
 * 
 * @includeExample examples/timeout.ts
 */
export async function timeout<T>(promise: TimeoutIn<T>, ms: number, message?: string): Promise<TimeoutOut<T>> {
  // Validate that the input time is a number
  if (typeof ms !== 'number') {
    throw new Error('timeout(ms) requires a number as a parameter');
  }

  // Validate that the number is positive
  if (ms < 0) {
    throw new Error('timeout(ms) requires a positive number as a parameter');
  }

  // Create a timeout promise that rejects after the specified delay
  const timeoutPromise = new Promise<T>((_, reject) => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId)
      reject(new Error(message || 'Timeout'));
    }, ms);
  });

  // Return a race between the input promise and the timeout promise
  return await to(Promise.race([promise, timeoutPromise]));
}
