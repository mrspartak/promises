import { delay } from "./delay";
import { to } from "./to";

/**
 * Options for the retry function.
 * 
 * @typedef {Object} RetryOptions
 * @property {number} [delay=0] - The delay (in milliseconds) between retry attempts. Must be non-negative.
 */
type RetryOptions = {
  delay?: number;
};

/**
 * Retries a promise-returning function a specified number of times with an optional delay between attempts if it fails.
 *
 * @template T The type of the value that the promise resolves to.
 * @param {() => Promise<T>} fn - The promise-returning function to be retried.
 * @param {number} attempts - The number of retry attempts. Must be a positive integer.
 * @param {RetryOptions} [options] - Optional settings for retry behavior.
 * @param {number} [options.delay=0] - The delay (in milliseconds) between retry attempts.
 * @returns {Promise<T>} The resolved value of the promise.
 * @throws {Error} Throws an error if all retry attempts fail.
 *
 * @includeExample examples/retry.ts
 */
export async function retry<T>(
  fn: () => Promise<T>,
  attempts: number,
  options?: RetryOptions
): Promise<T> {
  // Ensure the number of attempts is greater than 0
  if (attempts < 1) {
    throw new Error("attempts must be greater than 0");
  }
  // Ensure the number of attempts is an integer
  if (attempts % 1 !== 0) {
    throw new Error("attempts must be an integer");
  }

  let lastError!: Error; // Placeholder for the last encountered error

  // Get the delay amount from options or default to 0
  const delayAmount = options?.delay ?? 0;

  // Ensure the delay amount is non-negative
  if (delayAmount < 0) {
    throw new Error("delay must be greater than or equal to 0");
  }

  // Loop to retry the function the specified number of times
  for (let attempt = 1; attempt <= attempts; attempt++) {
    // Use the 'to' utility to handle the promise and catch any errors
    const [error, result] = await to(fn());
    // If no error, return the result
    if (!error) {
      return result;
    }

    // If there's a delay, wait for the specified amount of time before the next attempt
    if (delayAmount) await delay(delayAmount);

    // Store the last encountered error
    lastError = error;
  }

  // If all attempts fail, throw the last encountered error
  throw lastError;
}
