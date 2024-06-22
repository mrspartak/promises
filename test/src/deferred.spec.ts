import { describe, expect, it } from "vitest";
import { deferred } from '../../src/deferred.js'

describe('deferred', () => {
  it('should be a function', () => {
    expect(typeof deferred).toBe('function')
  })

  it('should return an object', () => {
    const deferredObject = deferred()
    expect(deferredObject.promise instanceof Promise).toBe(true)
    expect(deferredObject.resolve instanceof Function).toBe(true)
    expect(deferredObject.reject instanceof Function).toBe(true)
  })

  it('should resolve the promise after calling resolve', async () => {
    const { promise, resolve } = deferred<string>()
    setTimeout(() => resolve('test'), 10)

    expect(await promise).toBe('test')
  })

  it('should reject the promise after calling reject', async () => {
    const { promise, reject } = deferred<string>()
    setTimeout(() => reject('test'), 10)

    await expect(promise).rejects.toBe('test')
  })
})