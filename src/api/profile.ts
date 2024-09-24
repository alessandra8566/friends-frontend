import { ImageUpload, ImageUploadPatch, UserProfile, UserProfilePatch } from "@/utils/types/profile"
import { request } from "./request"

export const apiGetProfile = () => request.get<UserProfile>(`/profile`)
export const apiPatchProfile = (payload: { id: string; data: UserProfilePatch }) =>
  request.patch<UserProfile>(`/profile/${payload.id}`, payload.data)

// image
export const apiUploadImage = (payload: { id: string; data: FormData }) =>
  request.post<ImageUpload>(`/profile/${payload.id}/image`, payload.data)
export const apiPatchImages = (payload: { id: string; data: FormData }) =>
  request.patch<ImageUploadPatch>(`/profile/${payload.id}/images`, payload.data)
export const apiDeleteImage = (payload: { id: string; data: { ids: string[] } }) =>
  request.delete(`/profile/${payload.id}/images`, { data: payload.data })
