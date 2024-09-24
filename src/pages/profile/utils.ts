import { z } from "zod"
import EmptyImg from "@/assets/images/empty-image.jpg"

export const imageInfoDefault: z.infer<typeof imageInfoSchema> = {
  id: "",
  index: 0,
  avatar: false,
  img: "",
  url: EmptyImg,
}

export const userInfoFormDefault: z.infer<typeof userInfoFormSchema> = {
  images: Array(7)
    .fill(null)
    .map((_, index) => ({
      ...imageInfoDefault,
      index,
    })),
  current_image: imageInfoDefault,
  username: "",
  description: "",
}

export const imageInfoSchema = z.object({
  id: z.string(),
  avatar: z.boolean(),
  img: z.any().optional(),
  url: z.string(),
  index: z.number(),
})

export const userInfoFormSchema = z.object({
  images: z.array(imageInfoSchema),
  current_image: imageInfoSchema,
  username: z.string().min(2, { message: "名字最少2個字元" }).max(30, { message: "名字最多30個字" }).optional(),
  description: z.string().max(600, { message: "自我介紹最多30個字" }).optional(),
})
