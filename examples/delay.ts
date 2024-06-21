import { delay, sleep } from "@mrspartak/promises"
import { parsePage } from "./parser"

for (let i = 0; i < 10; i++) {
  // Parse the page and wait for 1 second before parsing the next page
  const pageData = await parsePage(i)
  await delay(1000)
}

// You can also use alias sleep instead of delay
await sleep(1000)