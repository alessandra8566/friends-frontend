import { BASE_URL } from "./config/env"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createHashRouter, RouterProvider } from "react-router-dom"
import routes from "./router"
import { Loader2 } from "lucide-react"
import { Toaster } from "./components/ui/sonner"

const queryClient = new QueryClient()

const router = createHashRouter(routes, {
  basename: BASE_URL,
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        fallbackElement={
          <div className="relative h-screen">
            <p className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 animate-pulse items-center justify-center text-center text-2xl text-white">
              <Loader2 className="text-write mr-3 h-8 w-8 animate-spin" />
              <span>Loading......</span>
            </p>
          </div>
        }
      />
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
