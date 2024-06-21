import { timeout } from "@mrspartak/promises"
import { api } from "./api"

// Can be used as a race condition
const user = await timeout(api.getUser(), 1000)