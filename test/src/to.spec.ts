import { describe, expect, it } from "vitest";
import { to } from '../../src/to.js'

describe('to', () => {
  it('should be a function', () => {
    expect(typeof to).toBe('function')
  })

  it('should return a promise', () => {
    // @ts-ignore
    expect(to() instanceof Promise).toBe(true)
  })

  it('should resolve with the value', async () => {
    const value = 'value'
    expect(await to(new Promise((resolve) => resolve('value')))).toStrictEqual([null, value])
  })

  it('should reject with the error', async () => {
    const error = new Error('error')
    expect(await to(new Promise((_, reject) => reject(error)))).toStrictEqual([error, null])
  })

  it('should call finally', async () => {
    let called = false
    await to(new Promise((resolve) => resolve('test')), () => {
      called = true
    })
    expect(called).toBe(true)
  })

  it('should call finally even if promise is rejected', async () => {
    let called = false
    await to(new Promise((_, reject) => reject('test')), () => {
      called = true
    })
    expect(called).toBe(true)
  })

  it('should await finally', async () => {
    let called = false
    await to(new Promise((resolve) => resolve('test')), async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
      called = true
    })
    expect(called).toBe(true)
  })

  it('should throw an error if string is thrown', async () => {
    const error = 'error 123'
    const [err] = await to(new Promise((_, reject) => reject(error)))
    expect(err instanceof Error).toBe(true)
    expect(err?.message).toBe('error 123')
  })

  it('should throw an error if non-Error thrown', async () => {
    const [err] = await to(new Promise((_, reject) => reject(123)))
    expect(err instanceof Error).toBe(true)
    expect(err?.message).toBe('non-supported reject value')
  })
})