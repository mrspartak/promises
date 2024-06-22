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
    const [error, result] = await retry(() => Promise.resolve('test'), 1)
    expect(error).toBeNull()
    expect(result).toBe('test')
  })

  it('should reject after the first attempt', async () => {
    const [error, result] = await retry(() => Promise.reject('test'), 1)
    expect(error).toBeInstanceOf(Error)
    expect(error?.message).toBe('test')
    expect(result).toBeNull()
  })

  it('should not accept a negative number of attempts', async () => {
    const [error] = await retry(() => Promise.resolve('test'), -1)
    expect(error).toBeInstanceOf(Error)
    expect(error?.message).toBe('retry: attempts must be greater than 0')
  })

  it('should not accept a non-integer number of attempts', async () => {
    const [error] = await retry(() => Promise.resolve('test'), 1.5)
    expect(error).toBeInstanceOf(Error)
    expect(error?.message).toBe('retry: attempts must be a positive integer')
  })

  it('should not accept a zero number of attempts', async () => {
    const [error] = await retry(() => Promise.resolve('test'), 0)
    expect(error).toBeInstanceOf(Error)
    expect(error?.message).toBe('retry: attempts must be greater than 0')
  })

  it('should not accept a negative delay', async () => {
    const [error] = await retry(() => Promise.resolve('test'), 1, { delay: -1 })
    expect(error).toBeInstanceOf(Error)
    expect(error?.message).toBe('retry: delay must be non-negative')
  })

  it("should respect the delay option", async () => {
    const start = Date.now()
    await retry(() => Promise.reject('test'), 2, { delay: 10 })
    const end = Date.now()
    expect(end - start).toBeGreaterThanOrEqual(8) // Timers are not precise, so we allow a small margin of error
  })

  it("should not delay if the delay option is 0", async () => {
    const start = Date.now()
    await retry(() => Promise.reject('test'), 2, { delay: 0 })
    const end = Date.now()
    expect(end - start).toBeLessThan(10)
  })

  it("should work with a successful retry after failure", async () => {
    let attempt = 0
    const [error, result] = await retry(() => {
      attempt++;
      return attempt === 1 ? Promise.reject('error') : Promise.resolve('success')
    }, 2)
    expect(error).toBeNull()
    expect(result).toBe('success')
    expect(attempt).toBe(2)
  })
})