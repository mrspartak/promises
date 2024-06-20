/**
 * async 'to' utility
 * Usecase: allows to elemitante excess brackets and lines of try/catch. GO style error handling
 * How to use:
 *
 * const [error, result] = await to( anyPromise );
 * if(error) {
 *   // handle error if needed
 * }
 */
type ToReturn<T> = [Error, null] | [null, T];

export async function to<T>(promise: Promise<T>): Promise<ToReturn<T>> {
  try {
    const result = await promise;
    return [null, result];
  } catch (error) {
    if (error instanceof Error) {
      return [error, null];
    }
    return [new Error(typeof error === 'string' ? error : 'non-supported reject value'), null];
  }
}
