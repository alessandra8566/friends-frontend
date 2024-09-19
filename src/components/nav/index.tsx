import { Icons } from "../icons"
import { Input } from "../ui/input"
import MainNav from "./main-nav"
import UserNav from "./user-nav"

const Nav = () => {
  return (
    <div className="flex h-16 items-center px-4">
      <Icons.logo />
      <MainNav className="mx-6 hidden sm:block" />
      <div className="ml-auto flex items-center space-x-4">
        <div>
          <Input type="search" placeholder="Search..." className="md:w-[100px] lg:w-[300px]" />
        </div>
        <UserNav />
      </div>
    </div>
  )
}

export default Nav