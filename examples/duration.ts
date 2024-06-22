import { duration } from "@mrspartak/promises"
import { migrate } from "./migrate"

const migratePromise = migrate()

// Measure the duration of the migrate function
const [error, result, duration] = await duration(migratePromise)

console.log(`Migration took ${duration}ms`)