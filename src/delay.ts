/**
 * Pauses execution for a specified number of milliseconds.
 *
 * @param {number} ms - The number of milliseconds to delay execution.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 * @throws {Error} Thrown if the input is not a number or if the number is negative.
 * 
 * @includeExample examples/delay.ts
 */
export async function delay(ms: number): Promise<void> {
  // Validate that the input is a number
  if (typeof ms !== 'number') {
    throw new Error('delay(ms) requires a number as a parameter');
  }

  // Validate that the number is positive
  if (ms < 0) {
    throw new Error('delay(ms) requires a positive number as a parameter');
  }

  // Return a promise that resolves after the specified delay
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Alias for delay: sleep
export const sleep = delay;