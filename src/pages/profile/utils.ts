import { z } from "zod"
import EmptyImg from "@/assets/images/empty-image.jpg"
import { SelectValueItem } from "@/components/select"
import { constellation, education, profileEnumTran, frequency, job, languageUse, location, commonEnumTran, gender } from "@/utils/types"

export const locationSelectItems = location.map<SelectValueItem>((item) => ({ text: item, value: item }))
export const educationSelectItems = education.map<SelectValueItem>((item) => ({
  text: item === "null" ? commonEnumTran.null : item,
  value: item,
}))
export const constellationSelectItems = constellation.map<SelectValueItem>((item) => ({
  text: item === "null" ? commonEnumTran.null : item,
  value: item,
}))
export const languageUseSelectItems = languageUse.map<SelectValueItem>((item) => ({ text: item, value: item }))
export const frequencySelectItems = frequency.map<SelectValueItem>((item) => ({ text: profileEnumTran[item], value: item }))
export const jobSelectItems = job.map<SelectValueItem>((item) => ({
  text: item === "null" ? commonEnumTran.null : item,
  value: item,
}))

export const imageInfoDefault: z.infer<typeof imageInfoSchema> = {
  id: "",
  index: 0,
  avatar: false,
  img: "",
  url: EmptyImg,
}

export const userAvatarFormDefault: z.infer<typeof userAvatarFormSchema> = {
  images: Array(7)
    .fill(null)
    .map((_, index) => ({
      ...imageInfoDefault,
      index,
    })),
  current_image: imageInfoDefault,
}

export const imageInfoSchema = z.object({
  id: z.string(),
  avatar: z.boolean(),
  img: z.any().optional(),
  url: z.string(),
  index: z.number(),
})

export const userAvatarFormSchema = z.object({
  images: z.array(imageInfoSchema),
  current_image: imageInfoSchema,
})

export const userInfoFormSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  gender: z.enum(gender),
  introduce: z.string().optional(),
  birthday: z.string().optional(),
  like_style: z.string().optional(),
  constellation: z.preprocess((value) => (value !== "null" ? value : undefined), z.enum(constellation).optional()),
  location: z.enum(location).optional(),
  weight: z.number().optional(),
  height: z.number().optional(),
  job: z.preprocess((value) => (value !== "null" ? value : undefined), z.enum(job).optional()),
  education: z.preprocess((value) => (value !== "null" ? value : undefined), z.enum(education).optional()),
  hobby: z.string().optional(),
  smoke: z.enum(frequency).optional(),
  drink: z.enum(frequency).optional(),
  languages: z.enum(languageUse).optional(),
})

export const userInfoFormDefault: z.infer<typeof userInfoFormSchema> = {
  name: "",
  email: "",
  gender: "female",
  birthday: "",
  introduce: "",
  like_style: "",
  constellation: "null",
  location: "台北市",
  weight: 60,
  height: 170,
  job: "null",
  education: "null",
  hobby: "",
  smoke: "never",
  drink: "never",
  languages: "中文",
}
