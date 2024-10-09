export const gender = ["male", "female"] as const
export type Gender = (typeof gender)[number]

export const frequency = ["never", "sometimes", "often"] as const
export type Frequency = (typeof frequency)[number]

export const job = ["null", "學生", "上班族", "自由業", "家管", "其他"] as const
export type Job = (typeof job)[number]

export const location = [
  "台北市",
  "新北市",
  "桃園市",
  "台中市",
  "台南市",
  "高雄市",
  "新竹縣",
  "苗栗縣",
  "彰化縣",
  "南投縣",
  "雲林縣",
  "嘉義縣",
  "屏東縣",
  "宜蘭縣",
  "花蓮縣",
  "台東縣",
  "澎湖縣",
  "金門縣",
  "基隆市",
  "新竹市",
] as const
export type Location = (typeof location)[number]

export const education = ["null", "高中 / 高職", "專科", "學士", "碩士", "博士"] as const
export type Education = (typeof education)[number]

export const constellation = [
  "null",
  "牡羊座",
  "金牛座",
  "雙子座",
  "巨蟹座",
  "獅子座",
  "處女座",
  "天秤座",
  "天蠍座",
  "射手座",
  "魔羯座",
  "水瓶座",
  "雙魚座",
] as const
export type Constellation = (typeof constellation)[number]

export const languageUse = ["中文", "英文", "韓文", "泰文", "越南文"] as const
export type LanguageUse = (typeof languageUse)[number]

export const profileEnumTran: Record<Frequency | Gender, string> = {
  never: "從不",
  sometimes: "有時",
  often: "經常",
  male: "男",
  female: "女"
}

export interface ProfileBase {
  introduce?: string | null
  like_style?: string | null
  constellation?: Constellation | null
  location?: Location | null
  weight?: number 
  height?: number
  job?: Job | null
  education?: Education | null
  hobby?: string | null
  smoke?: Frequency | null
  drink?: Frequency | null
  languages?: LanguageUse
}

export interface Profile extends ProfileBase {
  id: string
  name: string
  images: Image[]
  created_at: string
  updated_at: string
}

export interface UserProfile extends Profile {
  birthday: string
  gender: Gender
}

export interface Image {
  id: string
  name: string
  url: string
  index: number
  user_profile_id: string
  avatar: boolean
  create_at: string
}

export interface ImageUpload {
  user_profile_id: string
  name: string
  url: string
  index: number
  avatar: boolean
}

export interface ImageUploadPatch extends ImageUpload {
  id: string
}
