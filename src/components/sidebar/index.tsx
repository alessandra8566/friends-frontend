import { cn } from "@/utils/shadcn"
import { NavLink } from "react-router-dom"
import { buttonVariants } from "../ui/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    to: string
    title: string
  }[]
}

const SidebarNav = ({ className, items, ...props }: SidebarNavProps) => {
  return (
    <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)} {...props}>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: "ghost" }),
              isActive ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
              "justify-start",
            )
          }
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  )
}

export default SidebarNav
