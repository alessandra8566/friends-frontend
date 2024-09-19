import { cn } from "@/utils/shadcn"
import { NavLink } from "react-router-dom"

const MainNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          cn("text-sm font-medium transition-colors hover:text-primary", {
            "text-muted-foreground": !isActive,
          })
        }
      >
        首頁
      </NavLink>
      <NavLink
        to={"/chat"}
        className={({ isActive }) =>
          cn("text-sm font-medium transition-colors hover:text-primary", {
            "text-muted-foreground": !isActive,
          })
        }
      >
        聊天室
      </NavLink>
      <NavLink
        to={"/favorite"}
        className={({ isActive }) =>
          cn("text-sm font-medium transition-colors hover:text-primary", {
            "text-muted-foreground": !isActive,
          })
        }
      >
        我的最愛
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          cn("text-sm font-medium transition-colors hover:text-primary", {
            "text-muted-foreground": !isActive,
          })
        }
      >
        個人設定
      </NavLink>
    </nav>
  )
}

export default MainNav