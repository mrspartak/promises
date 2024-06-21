import { describe, expect, it } from "vitest";
import { timeout } from '../../src/timeout.js'
import { delay } from '../../src/delay.js'

describe('timeout', () => {
  it('should be a function', () => {
    expect(typeof timeout).toBe('function')
  })

  it('should return a promise', () => {
    expect(timeout(new Promise((resolve) => resolve('value')), 100) instanceof Promise).toBe(true)
  })

  it('should return the value', async () => {
    const value = 'value'
    expect(await timeout(new Promise((resolve) => resolve('value')), 100)).toStrictEqual(value)
  })

  it('should throw an error if time is not a number', async () => {
    const error = 'timeout(ms) requires a number as a parameter'
    // @ts-ignore
    await expect(timeout(new Promise((resolve) => resolve('value')), '100')).rejects.toThrowError(error)
  })

  it('should throw an error if time is negative', async () => {
    const error = 'timeout(ms) requires a positive number as a parameter'
    await expect(timeout(new Promise((resolve) => resolve('value')), -100)).rejects.toThrowError(error)
  })

  it('should throw an error if promise rejects', async () => {
    await expect(timeout(new Promise((_, reject) => reject('error')), 100)).rejects.toThrowError('error')
  })

  it('should throw an error if promise times out', async () => {
    await expect(timeout(delay(105), 100)).rejects.toThrowError('Timeout')
  })

  it('should throw an error if promise times out with custom message', async () => {
    await expect(timeout(delay(105), 100, 'custom error')).rejects.toThrowError('custom error')
  })
})