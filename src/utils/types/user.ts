type Role = "admin" | "vip1_user" | "vip2_user" | "user"

export interface UserSignIn {
  name: string
  email: string
  password: string
  role?: string
}

export interface UserLogin {
  email: string
  password: string
}

export interface JwtType {
  user_id: string
  name: string
  email: string
  role: Role
}

export type CurrentUserInfo = {
  user_id: string
  email: string
  name: string
  role: Role
}