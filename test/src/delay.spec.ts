import { describe, expect, it } from "vitest";
import { delay, sleep } from '../../src/delay.js'

describe('delay', () => {
  it('should be a function', () => {
    expect(typeof delay).toBe('function')
  })

  it('should return a promise', () => {
    expect(delay(1) instanceof Promise).toBe(true)
  })

  it('should resolve after the specified delay', async () => {
    const start = Date.now()
    await delay(100)
    const end = Date.now()
    expect(end - start).toBeGreaterThanOrEqual(98) // Timers are not precise, so we allow a small margin of error
  })

  it('should throw an error if the input is not a number', async () => {
    // @ts-ignore
    await expect(delay('test')).rejects.toThrow('delay(ms) requires a number as a parameter')
  })

  it('should throw an error if the number is negative', async () => {
    await expect(delay(-1)).rejects.toThrow('delay(ms) requires a positive number as a parameter')
  })

  it('should not throw an error if the number is zero', async () => {
    await expect(delay(0)).resolves.toBeUndefined()
  })
})

describe('sleep', () => {
  it('should be a function', () => {
    expect(typeof sleep).toBe('function')
  })

  it('should return a promise', () => {
    expect(sleep(1) instanceof Promise).toBe(true)
  })
})