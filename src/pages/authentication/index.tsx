import { Icons } from "@/components/icons"
import { JwtType } from "@/utils/types/user"
import { jwtDecode } from "jwt-decode"
import { useCallback, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useSessionStorage } from "usehooks-ts"
import moment from "moment"

const UserAuthentication = () => {
  const [token] = useSessionStorage("token", "")
  const navigate = useNavigate()

  const autoLogin = useCallback(() => {
    if (!token) return
    const decode = jwtDecode<JwtType>(token)
    const unixTimestampInSeconds = moment().unix()
    if (unixTimestampInSeconds <= decode.exp) navigate("/dashboard")
  }, [navigate, token])

  useEffect(() => {
    autoLogin()
  }, [autoLogin])

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