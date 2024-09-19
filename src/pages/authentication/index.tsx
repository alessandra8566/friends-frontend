import { Icons } from "@/components/icons"
import { Outlet } from "react-router-dom"

const UserAuthentication = () => {
  return (
    <div className="container relative h-screen flex items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Icons.logo className="h-24 w-24" />
          Acme Inc
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat ipsa sed amet dolores, eos
              obcaecati officiis quo commodi beatae veritatis!&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default UserAuthentication
