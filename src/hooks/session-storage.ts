import { CurrentUserInfo } from "@/utils/types/user"
import { useSessionStorage } from "usehooks-ts"

export const useUserInfo = (initValue: CurrentUserInfo | null = null) => {
  return useSessionStorage<CurrentUserInfo | null>("userInfo", initValue)
}
