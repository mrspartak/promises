<p align="center">
  <img width="560" src="https://raw.githubusercontent.com/mrspartak/promises/master/assets/logo.svg" alt="@mrspartak/promises logo">
</p>
<br/>
<p align="center">
  <a href="https://npmjs.com/package/@mrspartak/promises"><img src="https://img.shields.io/npm/v/@mrspartak/promises.svg" alt="npm package"></a>
  <a href="https://npmjs.com/package/@mrspartak/promises"><img src="https://img.shields.io/bundlephobia/min/%40mrspartak/promises.svg" alt="bundle size"></a>
  <a href="https://npmjs.com/package/@mrspartak/promises"><img src="https://img.shields.io/npm/dw/%40mrspartak%2Fpromises.svg" alt="downloads"></a>
</p>
<br/>

# 🔧 Typescript promise utilities
@mrspartak/promises is toolbelt with useful promise utilities that also utilizing a power of Typescript

## Contents
- [Installation](#Installation)
- [API to](#to---Simplified-Promise-Handling-with-Tuples)

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