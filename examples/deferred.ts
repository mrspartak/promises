import { deferred } from "@mrspartak/promises"
import { readStream } from "./stream"

// Create a deferred promise
const { promise, resolve, reject } = deferred<void>()

// Read the stream in chunks and then resolve the promise
const stream = await readStream()
let data = ''
stream.on('data', (chunk) => {
  data += chunk
})
stream.on('end', () => {
  resolve()
})

// Resolve the promise with the data
await promise
console.log(data) // Data is ready