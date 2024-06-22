import { retry } from "@mrspartak/promises"
import { apiCall } from "./api"

// Retry the API call up to 3 times with a delay of 1000 milliseconds between attempts
const [error, result] = await retry(() => apiCall(), 3, { delay: 1000 })
if (error) {
  // error will always be an error returneb by a promise rejection
}