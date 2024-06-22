import { describe, expect, it } from "vitest";
import { duration } from '../../src/duration.js'
import { delay } from '../../src/delay.js'

describe('duration', () => {
  it('should be a function', () => {
    expect(typeof duration).toBe('function')
  })

  it('should return a promise', async () => {
    const promise = duration(Promise.resolve('test'))
    expect(promise instanceof Promise).toBe(true)
  })

  it('should return the time taken to resolve the promise', async () => {
    const promiseFn = async () => {
      await delay(10)
      return 'test'
    }

    const promise = duration(promiseFn())
    const [error, result, time] = await promise

    expect(error).toBeNull()
    expect(result).toBe('test')
    expect(time).toBeGreaterThan(10)
  })

  it('should return the time taken to reject the promise', async () => {
    const promiseFn = async () => {
      throw new Error('test')
    }

    const promise = duration(promiseFn())
    const [error, result, time] = await promise

    expect(error).toStrictEqual(Error('test'))
    expect(result).toBeNull()
    expect(time).toBeGreaterThan(0)
  })

  it('should support date.now api when performance.now is not available', async () => {
    // disable performance.now
    const originalPerformanceNow = performance.now
    // @ts-ignore
    performance.now = undefined

    const promise = duration(Promise.resolve('test'))
    const [error, result, time] = await promise

    expect(error).toBeNull()
    expect(result).toBe('test')
    expect(time).greaterThanOrEqual(0)

    // restore performance.now
    performance.now = originalPerformanceNow
  })
})