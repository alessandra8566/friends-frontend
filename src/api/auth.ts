import { User, UserLogin, UserPatch, UserSignIn } from "@/utils/types/user";
import { request } from "./request";

export const apiRefresh = (payload: { refresh: string }) => request.post("/auth/jwt/refresh/", payload)
export const apiSignIn = (payload: UserSignIn) => request.post("/users/sign-in", payload)
export const apiLogin = (payload: UserLogin) => request.post("/users/login", payload)

export const apiPatchUser = (payload: { id: string, data: UserPatch }) => request.patch<User>(`/users/${payload.id}`, payload.data)