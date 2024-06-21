/**
 * Type alias for a promise of type T.
 */
type ToIn<T> = Promise<T>;

/**
 * Type alias for the output of the to function.
 * It can be either an array with an Error and null, or an array with null and the result of type T.
 */
type ToOut<T> = [Error, null] | [null, T];

/**
 * Type alias for a function that can optionally be executed after the promise resolves or rejects.
 * It can return void or a Promise that resolves to void.
 */
type ToFinally = () => void | Promise<void>;

/**
 * Wraps a promise and returns a tuple with either an error or the result.
 * Optionally executes a finally callback after the promise settles.
 *
 * @template $Promise The type of the value the input promise resolves to.
 * @param {ToIn<$Promise>} promise - The input promise to be wrapped.
 * @param {ToFinally} [_finally] - Optional finally callback to be executed after the promise settles.
 * @returns {Promise<ToOut<$Promise>>} A promise that resolves to a tuple containing either an error or the result.
 * 
 * @includeExample examples/to.ts
 */
export async function to<$Promise>(promise: ToIn<$Promise>, _finally?: ToFinally): Promise<ToOut<$Promise>> {
  try {
    // Await the result of the input promise.
    const result = await promise;
    // Return a tuple with null error and the result.
    return [null, result];
  } catch (error) {
    // If the error is an instance of Error, return it with null result.
    if (error instanceof Error) {
      return [error, null];
    }
    // For non-Error reject values, return a generic Error with a descriptive message.
    return [new Error(typeof error === 'string' ? error : 'non-supported reject value'), null];
  } finally {
    // If a finally callback is provided, await its execution.
    if (_finally) await _finally();
  }
}
