/**
 * Represents a deferred promise, which exposes the resolve and reject functions.
 * 
 * @template T The type of the value that the promise resolves to.
 */
export type DeferredOut<T> = {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
};

/**
 * Creates a deferred promise, allowing manual resolution or rejection.
 * 
 * @template T The type of the value that the promise resolves to.
 * @returns {DeferredOut<T>} An object containing the promise, resolve, and reject functions.
 * 
 * @includeExample examples/deferred.ts
 */
export function deferred<T>(): DeferredOut<T> {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: any) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}
