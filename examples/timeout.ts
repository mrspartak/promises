import { timeout } from "@mrspartak/promises"
import { api } from "./api"

// Can be used as a race condition
const [error, user] = await timeout(api.getUser(), 1000)
if (error) {
  // error can be either a timeout error or an error from the api
}