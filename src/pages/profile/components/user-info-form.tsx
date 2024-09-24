import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { userInfoFormDefault, userInfoFormSchema } from "../utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormInput } from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { FormTextArea } from "@/components/form/textarea"
import { ChangeEvent, useMemo, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import CropperDialog from "./cropper-dialog"
import { Edit } from "lucide-react"
import { useUserInfo } from "@/hooks/session-storage"
import { useMutation, useQuery } from "@tanstack/react-query"
import { apiGetProfile, apiPatchProfile } from "@/api/profile"
import { toast } from "sonner"
import { actions } from "@/utils/toast"

const UserInfoForm = () => {
  const uploadAvatarInputRef = useRef<(HTMLInputElement | null)[]>([])
  const [userInfo] = useUserInfo()
  const [open, setOpen] = useState(false)

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: apiGetProfile,
    select: (res) => res.data,
  })

  const userInfoValues = useMemo(
    () => ({
      ...userInfoFormDefault,
      username: userInfo?.name || "",
      description: profile?.description,
    }),
    [profile, userInfo],
  )

  const form = useForm<z.infer<typeof userInfoFormSchema>>({
    resolver: zodResolver(userInfoFormSchema),
    values: userInfoValues,
    mode: "onChange",
  })
  const { control, watch, handleSubmit, setValue } = form

  const { fields } = useFieldArray({ control, name: "images" })

  const watchAvatars = watch("images")
  const watchCurrentAvatar = watch("current_image")

  const patchProfileMutation = useMutation({ mutationFn: apiPatchProfile })

  const handleAvatarFileChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (uploadAvatarInputRef.current[index] && e.target.files?.length) {
      setValue(`current_image`, {
        id: self.crypto.randomUUID(),
        avatar: index === 0,
        img: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
        index,
      })
      setOpen(true)
    }
  }

  const onSubmit = (values: z.infer<typeof userInfoFormSchema>) => {
    console.log(values)

    const submit = async () => {
      const profilePayload = {
        id: profile?.id || "",
        data: { description: values.description || "" },
      }
      await patchProfileMutation.mutateAsync(profilePayload)
    }
    toast.promise(submit, actions.update)
  }

  return (
    <FormProvider {...form}>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full">
          <p className="my-2">主要大頭貼</p>
          <div className="flex justify-center gap-2">
            <div className="relative">
              <img
                src={watchAvatars[0].url}
                alt="emptyImg"
                className="max-w-52 cursor-pointer"
                onClick={() => uploadAvatarInputRef.current?.[0]?.click()}
              />
              <Edit className="absolute bottom-2 right-2 h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div>
          <p className="my-2">我的更多照片</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {watchAvatars.map((field) =>
              field.index !== 0 ? (
                <div className="relative" key={field.index}>
                  <img
                    src={field.url}
                    alt="emptyImg"
                    className="max-w-52 cursor-pointer"
                    onClick={() => uploadAvatarInputRef.current?.[field.index]?.click()}
                  />
                  <Edit className="absolute bottom-2 right-2 h-6 w-6 text-white" />
                </div>
              ) : null,
            )}
          </div>
        </div>
        {fields.map((field, index) => (
          <Input
            key={field.id}
            ref={(el) => (uploadAvatarInputRef.current[index] = el)}
            className="hidden"
            id="picture"
            type="file"
            accept=".jpg, .jpeg, .png, .gif, .bmp"
            onChange={(event) => handleAvatarFileChange(event, index)}
          />
        ))}
      </div>
      <FormInput name="username" labelDisplay="block" label="姓名" disabled />
      <FormTextArea name="description" labelDisplay="block" label="自我介紹" />
      <Button onClick={handleSubmit(onSubmit)}>儲存</Button>

      {watchCurrentAvatar && <CropperDialog image={watchCurrentAvatar} open={open} setOpen={setOpen} profile_id={profile?.id || ""} />}
    </FormProvider>
  )
}

export default UserInfoForm
