import { ImageUpload, ImageUploadPatch, Profile, ProfileBase, UserProfile, UserProfileDetail } from "@/utils/types";
import { request } from "./request"

export const apiGetProfile = () => request.get<Profile>(`/profile`)
export const apiGetProfileById = (id: string) => request.get<UserProfile>(`/profile/view/${id}`)
export const apiPatchProfile = (payload: { id: string; data: ProfileBase }) =>
  request.patch<Profile>(`/profile/${payload.id}`, payload.data)

// image
export const apiUploadImage = (payload: { id: string; data: FormData }) =>
  request.post<ImageUpload>(`/profile/${payload.id}/image`, payload.data)
export const apiPatchImages = (payload: { id: string; data: FormData }) =>
  request.patch<ImageUploadPatch>(`/profile/${payload.id}/images`, payload.data)
export const apiDeleteImage = (payload: { profile_id: string; image_id: string }) =>
  request.delete(`/profile/${payload.profile_id}/image/${payload.image_id}`)

export const apiGetProfileAvatars = () => request.get<Profile[]>("/profile/avatars")
export const apiGetProfilesDetails = () => request.get<UserProfileDetail[]>("/profile/details")
export const apiGetProfileDetails = (id: string) => request.get<UserProfileDetail>(`/profile/details/${id}`)