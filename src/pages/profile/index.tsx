import Sidebar from "@/components/sidebar"
import { Separator } from "@/components/ui/separator"
import { Outlet } from "react-router-dom"

const sidebarNavItems = [
  {
    title: "個人資料",
    to: "/profile/info",
  },
  {
    title: "個人頭像",
    to: "/profile/avatar",
  },
  // {
  //   title: "帳戶資料",
  //   to: "/profile/account",
  // },
  // {
  //   title: "交友偏好",
  //   to: "/profile/prefer",
  // },
  // {
  //   title: "通知設定",
  //   to: "/profile/notification",
  // },
]

const Profile = () => {
  return (
    <div className="space-y-6 p-6 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">個人設定</h2>
        <p className="text-muted-foreground">管理您的帳戶和通知設定</p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5 overflow-auto">
          <Sidebar items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Profile
