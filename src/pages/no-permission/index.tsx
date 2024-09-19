import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

function NoPermission() {
  const navigate = useNavigate()

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-login bg-cover bg-center text-3xl text-white">
      您沒有權限訪問此頁面
      <Button className="mt-10 bg-green-500" onClick={() => navigate("/")}>
        返回登入頁面
      </Button>
    </div>
  )
}

export default NoPermission
