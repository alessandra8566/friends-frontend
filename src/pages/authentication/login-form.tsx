import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/utils/shadcn"
import { FormProvider, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { loginDefault, loginFormSchema } from "./utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormInput } from "@/components/form/input"
import { useMutation } from "@tanstack/react-query"
import { apiLogin } from "@/api/auth"
import { jwtDecode } from "jwt-decode"
import { Gender, JwtType } from "@/utils/types/user"
import { actions } from "@/utils/toast"
import { toast } from "sonner"
import { useSessionStorage } from "usehooks-ts"
import { useUserInfo } from "@/hooks/session-storage"

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

const LoginForm = ({ className, ...props }: UserAuthFormProps) => {
  const navigate = useNavigate()
  const [, setToken] = useSessionStorage("token", "")
  const [, setUserInfo] = useUserInfo()

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    values: loginDefault,
  })
  const { handleSubmit } = form

  const signInMutation = useMutation({
    mutationFn: apiLogin,
    onSuccess: ({ data }) => {
      setToken(data.access_token)
      const decoded = jwtDecode<JwtType>(data.access_token)
      setUserInfo({
        user_id: decoded.user_id,
        email: decoded.email,
        name: decoded.name,
        birthday: decoded.birthday,
        gender: decoded.gender as Gender,
        role: decoded.role,
      })
      navigate("/dashboard")
    },
  })
  const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
    toast.promise(signInMutation.mutateAsync(values), actions.login)
  }
  return (
    <div className="lg:p-8">
      <FormProvider {...form}>
        <div className="mx-auto flex w-[350px] flex-col justify-center space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">會員登入</h1>
            <p className="text-sm text-muted-foreground">在下面輸入您的電子郵件</p>
          </div>
          <div className={cn("grid gap-6", className)} {...props}>
            <div className="grid gap-2">
              <div className="grid gap-2">
                <FormInput
                  name="email"
                  inputProps={{
                    placeholder: "請輸入信箱",
                    type: "email",
                    autoComplete: "email",
                    autoCorrect: "off",
                    disabled: signInMutation.isPending,
                  }}
                />
                <FormInput
                  name="password"
                  inputProps={{
                    type: "password",
                    placeholder: "請輸入密碼",
                    disabled: signInMutation.isPending,
                  }}
                />
              </div>
              <Button disabled={signInMutation.isPending} onClick={handleSubmit(onSubmit)}>
                {signInMutation.isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                登入
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
            <span className="bg-background px-2 text-muted-foreground">沒有帳號嗎？</span>
            <span
              className="cursor-pointer bg-background underline underline-offset-4"
              onClick={() => navigate("sign-in")}
            >
              申請帳號
            </span>
          </div>
        </div>
      </FormProvider>
    </div>
  )
}

export default LoginForm
