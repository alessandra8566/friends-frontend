import { Navigate } from "react-router-dom"
import { useUserInfo } from "@/hooks/session-storage"
import { Role } from "@/utils/types"

function withAuth(Component: React.ComponentType, acceptRoles?: Role[]) {
  return function AuthenticatedComponent() {
    const [userInfo] = useUserInfo()

    if (!userInfo) {
      return <Navigate to="/no-permission" />
    }

    if (acceptRoles && !acceptRoles?.includes(userInfo.role)) {
      return <Navigate to="/no-permission" />
    }

    return <Component />
  }
}

export default withAuth
