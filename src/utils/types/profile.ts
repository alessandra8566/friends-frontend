export interface UserProfile {
  id: string;
  user_id: string;
  description: string;
  images: Image[]
  create_at: string
}

export interface UserProfilePatch {
  description: string;
}

export interface Image {
  id: string;
  name: string;
  url: string
  index: number;
  user_profile_id: string;
  avatar: boolean;
  create_at: string;
}

export interface ImageUpload {
  user_profile_id: string;
  name: string;
  url: string;
  index: number;
  avatar: boolean;
}

export interface ImageUploadPatch extends ImageUpload {
  id: string;
}
