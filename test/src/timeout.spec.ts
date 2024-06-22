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
    const [error, result] = await timeout(new Promise((resolve) => resolve('value')), 100)
    expect(error).toBeNull()
    expect(result).toBe(value)
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
    const [error, result] = await timeout(new Promise((_, reject) => reject('error')), 100)
    expect(error).toBeInstanceOf(Error)
    expect(error?.message).toBe('error')
    expect(result).toBeNull()
  })

  it('should throw an error if promise times out', async () => {
    const [error, result] = await timeout(delay(105), 100)
    expect(error).toBeInstanceOf(Error)
    expect(error?.message).toBe('Timeout')
    expect(result).toBeNull()
  })

  it('should throw an error if promise times out with custom message', async () => {
    const [error, result] = await timeout(delay(105), 100, 'custom error')
    expect(error).toBeInstanceOf(Error)
    expect(error?.message).toBe('custom error')
    expect(result).toBeNull()
  })
})