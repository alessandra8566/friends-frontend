import { z } from "zod";

export const signInFormSchema = z.object({
  name: z.string().max(20),
  email: z.string().email(),
  password: z.string().max(20),
})

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().max(20),
})

export const signInDefault: z.infer<typeof signInFormSchema> = {
  name: "",
  email: "",
  password: "",
}

export const loginDefault: z.infer<typeof loginFormSchema> = {
  email: "",
  password: "",
}