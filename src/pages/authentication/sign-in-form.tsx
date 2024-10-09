import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/utils/shadcn"
import { useNavigate } from "react-router-dom"
import { genderSelectItem, signInDefault, signInFormSchema } from "./utils"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { FormInput } from "@/components/form/input"
import { useMutation } from "@tanstack/react-query"
import { apiSignIn } from "@/api/auth"
import { toast } from "sonner"
import { actions } from "@/utils/toast"
import { jwtDecode } from "jwt-decode"
import { useSessionStorage } from "usehooks-ts"
import { JwtType } from "@/utils/types/user"
import { useUserInfo } from "@/hooks/session-storage"
import { FormRadioGroup } from "@/components/form/radio-group"
import { FormCalendar } from "@/components/form/calendar"

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

const SignInForm = ({ className, ...props }: UserAuthFormProps) => {
  const navigate = useNavigate()

  const [, setToken] = useSessionStorage("token", "")
  const [, setUserInfo] = useUserInfo()

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    values: signInDefault,
  })
  const { handleSubmit } = form

  const signInMutation = useMutation({
    mutationFn: apiSignIn,
    onSuccess: ({ data }) => {
      setToken(data.access_token)
      const decoded = jwtDecode<JwtType>(data.access_token)
      setUserInfo({
        user_id: decoded.user_id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
      })
      navigate("/dashboard")
    },
  })
  const onSubmit = (values: z.infer<typeof signInFormSchema>) => {
    toast.promise(signInMutation.mutateAsync(values), actions.sign_in)
  }

  return (
    <form className="lg:p-8">
      <FormProvider {...form}>
        <div className="mx-auto flex w-[350px] flex-col justify-center space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">會員註冊</h1>
            <p className="text-sm text-muted-foreground">在下面輸入您的電子郵件</p>
          </div>
          <div className={cn("grid gap-6", className)} {...props}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <FormRadioGroup
                  name="gender"
                  className="h-9 justify-center"
                  radioGroupProps={{ items: genderSelectItem }}
                />
                <FormInput
                  name="name"
                  inputProps={{
                    placeholder: "請輸入暱稱",
                    type: "text",
                  }}
                />
                <FormInput
                  name="email"
                  inputProps={{
                    placeholder: "請輸入信箱",
                    type: "email",
                    autoComplete: "email",
                    autoCorrect: "off",
                  }}
                />
                <FormCalendar name="birthday" calendarProps={{ placeholder: "請選擇生日" }} />
                <FormInput
                  name="password"
                  inputProps={{
                    type: "password",
                    placeholder: "請輸入密碼",
                    autoComplete: "new-password"
                  }}
                />
                <FormInput
                  name="re_password"
                  inputProps={{
                    type: "password",
                    placeholder: "請確認密碼",
                    autoComplete: "new-password"
                  }}
                />
              </div>
              <Button disabled={signInMutation.isPending} onClick={handleSubmit(onSubmit)}>
                {signInMutation.isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                註冊
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">或</span>
              </div>
            </div>
            <Button variant="outline" type="button" disabled={signInMutation.isPending}>
              {signInMutation.isPending ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.google className="mr-2 h-4 w-4" />
              )}{" "}
              Google
            </Button>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            點擊繼續即表示您同意我們的 <a className="underline underline-offset-4 hover:text-primary">服務條款</a> 和{" "}
            <a className="underline underline-offset-4 hover:text-primary">隱私權政策</a>.
          </p>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-2 text-muted-foreground">已有帳號？</span>
            <span className="cursor-pointer bg-background underline underline-offset-4" onClick={() => navigate("/")}>
              會員登入
            </span>
          </div>
        </div>
      </FormProvider>
    </form>
  )
}

export default SignInForm
