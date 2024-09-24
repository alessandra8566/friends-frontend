import { ImageUpload, ImageUploadPatch, UserProfile, UserProfilePatch } from "@/utils/types/profile"
import { request } from "./request"

export const apiGetProfile = () => request.get<UserProfile>(`/profile`)
export const apiGetProfileById = (id: string) => request.get<UserProfile>(`/profile/view/${id}`)
export const apiPatchProfile = (payload: { id: string; data: UserProfilePatch }) =>
  request.patch<UserProfile>(`/profile/${payload.id}`, payload.data)

// image
export const apiUploadImage = (payload: { id: string; data: FormData }) =>
  request.post<ImageUpload>(`/profile/${payload.id}/image`, payload.data)
export const apiPatchImages = (payload: { id: string; data: FormData }) =>
  request.patch<ImageUploadPatch>(`/profile/${payload.id}/images`, payload.data)
export const apiDeleteImage = (payload: { profile_id: string; image_id: string }) =>
  request.delete(`/profile/${payload.profile_id}/image/${payload.image_id}`)

export const apiGetProfileAvatars = () => request.get<UserProfile[]>("/profile/avatars")