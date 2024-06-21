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