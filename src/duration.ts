import { to } from "./to.js";

/**
 * Type representing the output of the duration function.
 * The result is a tuple that includes either an error or a value, and the duration in milliseconds.
 * 
 * @template T The type of the resolved value of the promise.
 */
type DurationOut<T> = [Error, null, number] | [null, T, number];

/**
 * Gets the current time in milliseconds.
 * Uses the performance.now() method if available, otherwise falls back to Date.now().
 * 
 * @returns {number} The current time in milliseconds.
 */
function getTime(): number {
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    return performance.now();
  }
  return Date.now();
}

/**
 * Measures the time it takes for a promise to resolve or reject.
 * 
 * @template T The type of the resolved value of the promise.
 * @param {Promise<T>} promise - The promise to be measured.
 * @returns {Promise<DurationOut<T>>} A promise that resolves to a tuple containing either an error or a value, and the duration in milliseconds.
 * 
 * @includeExample examples/duration.ts
 */
export async function duration<$Promise extends Promise<any>>(promise: $Promise): Promise<DurationOut<Awaited<$Promise>>> {
  const start = getTime(); // Record the start time
  const result = await to(promise); // Await the promise using the 'to' utility
  return [...result, getTime() - start]; // Return the result along with the duration
}
