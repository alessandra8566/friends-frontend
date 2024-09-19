import { Outlet } from "react-router-dom"
import Nav from "./nav"

const BaseLayout = () => {
  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <Nav />
      </div>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  )
}

export default BaseLayout
