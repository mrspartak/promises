<p align="center">
  <img width="560" src="https://raw.githubusercontent.com/mrspartak/promises/master/assets/logo.svg" alt="@mrspartak/promises logo">
</p>
<br/>
<p align="center">
  <a href="https://npmjs.com/package/@mrspartak/promises"><img src="https://img.shields.io/npm/v/@mrspartak/promises.svg" alt="npm package"></a>
  <a href="https://npmjs.com/package/@mrspartak/promises"><img src="https://img.shields.io/bundlephobia/min/%40mrspartak/promises.svg" alt="bundle size"></a>
  <a href="https://npmjs.com/package/@mrspartak/promises"><img src="https://img.shields.io/npm/dw/%40mrspartak%2Fpromises.svg" alt="downloads"></a>
  <a href='https://coveralls.io/github/mrspartak/promises?branch=master'><img src='https://coveralls.io/repos/github/mrspartak/promises/badge.svg?branch=master' alt='Coverage Status' /></a>
</p>
<br/>

# 🔧 Typescript promise utilities
@mrspartak/promises is a toolkit with useful promise utilities that utilize the power of TypeScript

## Contents
- [Installation](#Installation)
- [to](#to---Simplified-Promise-Handling-with-Tuples)
- [delay](#delay---Pause-Execution-for-a-Specified-Time)
- [timeout](#timeout---Timeout-a-Promise)
- [deferred](#deferred---Create-a-Deferred-Promise)
- [retry](#retry---Retry-a-Promise-Returning-Function)
- [duration](#duration---Measure-the-Time-Taken-for-a-Promise-to-Resolve)

## Installation
```sh
# yarn
yarn add @mrspartak/promises
# npm
npm i @mrspartak/promises
# pnpm
pnpm add @mrspartak/promises
# bun
bun add @mrspartak/promises
```

## Functions

### `to` - Simplified Promise Handling with Tuples

This function helps reduce the verbosity of try/catch blocks by allowing you to handle promise results inline. Inspired by Go's error handling, it returns a tuple with either an error or the result, making your asynchronous code cleaner and more maintainable.

**Pros:**
- **✨ Cleaner Code**: Reduces the verbosity and complexity of using multiple try/catch blocks, leading to more readable and maintainable code.
- **📝 No Need for Predefined Variables**: Eliminates the need to declare variables before the try/catch block, simplifying variable management and ensuring proper typing.
- **📏 Forces a Consistent Error Handling Pattern**: Encourages a unified and specific way of dealing with errors, improving code consistency across the project.

```ts 
import { to } from "@mrspartak/promises"
import { api } from "./api"

// Simple tuple destructuring
const [apiError, user] = await to(api.get("/me"))
if (apiError) {
  // Handle error
}

// Using finally
$component.isLoading = true
const [apiError, status] = await to(api.post("/me/status", { status: "online" }), () => {
  $component.isLoading = false
})
if (apiError) {
  // Handle error
}
```

### `delay` - Pause Execution for a Specified Time

The delay function pauses the execution of your code for a specified number of milliseconds. This can be useful in various scenarios, such as waiting for an operation to complete, introducing a delay between retries, or simply pausing execution for debugging purposes.

! The function has alias `sleep`

```ts
import { delay, sleep } from "@mrspartak/promises"
import { parsePage } from "./parser"

for (let i = 0; i < 10; i++) {
  // Parse the page and wait for 1 second before parsing the next page
  const pageData = await parsePage(i)
  await delay(1000)
}

// You can also use alias sleep instead of delay
await sleep(1000)
```

### `timeout` - Timeout a Promise

The timeout function allows you to set a maximum time for a promise to resolve. If the promise does not resolve within the specified time, an error is thrown.

```ts
import { timeout } from "@mrspartak/promises"
import { api } from "./api"

// Can be used as a race condition
const [error, user] = await timeout(api.getUser(), 1000)
if (error) {
  // error can be either a timeout error or an error from the api
}
```

### `deferred` - Create a Deferred Promise

The deferred function allows you to manually resolve or reject a promise at a later time. This can be useful in scenarios where you need to control the timing of the resolution or rejection, such as in testing or when dealing with asynchronous operations that don't natively return promises.

```ts
import { deferred } from "@mrspartak/promises"

// Create a deferred promise
const { promise, resolve, reject } = deferred<void>()

setTimeout(() => {
  // Resolve the promise
  resolve()
}, 1000)

await promise // Will wait for 1 second before resolving
```

### `retry` - Retry a Promise-Returning Function

The `retry` function allows you to retry a promise-returning function a specified number of times with an optional delay between attempts if it fails. This can be useful for handling transient errors, such as network requests that may occasionally fail.

```ts
import { retry } from "@mrspartak/promises"
import { apiCall } from "./api"

// Retry the API call up to 3 times with a delay of 1000 milliseconds between attempts
const [error, result] = await retry(() => apiCall(), 3, { delay: 1000 })
if (error) {
  // error will always be an error returneb by a promise rejection
}
```

### `duration` - Measure the Time Taken for a Promise to Resolve

The `duration` function allows you to measure the time it takes for a promise to resolve or reject. This is useful for performance monitoring and debugging asynchronous operations in your code.

```ts
import { duration } from "@mrspartak/promises"
import { apiCall } from "./api"

// Measure the time taken to resolve the API call
const [error, result, time] = await duration(apiCall())
if (error) {
  // Handle error
}
```