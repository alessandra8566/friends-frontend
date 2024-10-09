import { SelectValueItem } from "@/components/select"
import { z } from "zod"

export const genderType = ["male", "female"] as const
export type GenderType = (typeof genderType)[number]

export const authenticationTran: Record<GenderType, string> = {
  male: "男性",
  female: "女性",
}

export const genderSelectItem = genderType.map<SelectValueItem>((item) => ({
  text: authenticationTran[item],
  value: item,
}))

export const signInFormSchema = z
  .object({
    name: z.string().max(20),
    email: z.string().email(),
    password: z.string().max(20),
    re_password: z.string().max(20),
    gender: z.enum(genderType),
    birthday: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.re_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "密碼不一致",
        path: ["re_password"], // Path to highlight the error
      })
    }
  })

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().max(20),
})

export const signInDefault: z.infer<typeof signInFormSchema> = {
  name: "",
  email: "",
  password: "",
  re_password: "",
  gender: "male",
  birthday: "",
}

export const loginDefault: z.infer<typeof loginFormSchema> = {
  email: "",
  password: "",
}
