export type Role = "admin" | "vip1_user" | "vip2_user" | "user"

export const gender = ["male", "female"] as const
export type Gender = (typeof gender)[number]

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
export interface UserPatch {
  gender?: Gender
  birthday?: string
}

export interface JwtType {
  user_id: string
  name: string
  email: string
  birthday: string
  gender: string
  role: Role
  exp: number
}

export type CurrentUserInfo = {
  user_id: string
  email: string
  name: string
  birthday: string
  gender: Gender
  role: Role
}

export interface User {
  id: string
  email: string
  name: string
}