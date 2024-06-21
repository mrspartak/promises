/**
 * Type alias for a promise of type T.
 */
type TimeoutIn<T> = Promise<T>;

/**
 * Return type for the timeout function.
 */
type TimeoutOut<T> = Promise<T>;

/**
 * This function ensures that a provided promise is resolved within a specified time.
 * If the promise does not resolve within the specified time, an error is thrown.
 * 
 * @template T The type of the value that the input promise resolves to.
 * @param {Promise<T>} promise - The promise to be awaited.
 * @param {number} ms - The number of milliseconds to wait.
 * @param {string} [message] - The error message to throw.
 * @returns {Promise<T>} The resolved value of the promise.
 * @throws {Error} Throws an error if the input time is not a positive number or if the promise times out.
 * 
 * @includeExample examples/timeout.ts
 */
export async function timeout<T>(promise: TimeoutIn<T>, ms: number, message?: string): TimeoutOut<T> {
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
  return Promise.race([promise, timeoutPromise]);
}
