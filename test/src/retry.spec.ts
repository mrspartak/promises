import { describe, expect, it } from "vitest";
import { retry } from '../../src/retry.js'
import { to } from "../../src/to.js";

describe('retry', () => {
  it('should be a function', () => {
    expect(typeof retry).toBe('function')
  })

  it('should return a promise', async () => {
    const promise = retry(() => Promise.resolve('test'), 1)
    expect(promise instanceof Promise).toBe(true)
  })

  it('should resolve after the first attempt', async () => {
    const promise = retry(() => Promise.resolve('test'), 1)
    expect(await promise).toBe('test')
  })

  it('should reject after the first attempt', async () => {
    const promise = retry(() => Promise.reject('test'), 1)
    await expect(promise).rejects.toStrictEqual(Error('test'))
  })

  it('should not accept a negative number of attempts', async () => {
    expect(() => retry(() => Promise.resolve('test'), -1)).rejects.toThrowError('attempts must be greater than 0')
  })

  it('should not accept a non-integer number of attempts', async () => {
    expect(() => retry(() => Promise.resolve('test'), 1.5)).rejects.toThrowError('attempts must be an integer')
  })

  it('should not accept a zero number of attempts', async () => {
    expect(() => retry(() => Promise.resolve('test'), 0)).rejects.toThrowError('attempts must be greater than 0')
  })

  it('should not accept a negative delay', async () => {
    expect(() => retry(() => Promise.resolve('test'), 1, { delay: -1 })).rejects.toThrowError('delay must be greater than or equal to 0')
  })

  it("should respect the delay option", async () => {
    const promise = retry(() => Promise.reject('test'), 2, { delay: 10 })
    const start = Date.now()
    await to(promise)
    const end = Date.now()
    expect(end - start).toBeGreaterThanOrEqual(8) // Timers are not precise, so we allow a small margin of error
  })

  it("should not delay if the delay option is 0", async () => {
    const promise = retry(() => Promise.reject('test'), 2, { delay: 0 })
    const start = Date.now()
    await to(promise)
    const end = Date.now()
    expect(end - start).toBeLessThan(10)
  })

  it("should work with a successful retry after failure", async () => {
    let attempt = 0
    const promise = retry(() => {
      attempt++;
      return attempt === 1 ? Promise.reject('error') : Promise.resolve('success')
    }, 2)
    const [error, result] = await to(promise)
    expect(error).toBeNull()
    expect(result).toBe('success')
    expect(attempt).toBe(2)
  })
})