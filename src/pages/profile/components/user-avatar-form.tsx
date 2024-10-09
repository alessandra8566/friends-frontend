import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { userAvatarFormDefault, userAvatarFormSchema } from "../utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChangeEvent, useMemo, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import CropperDialog from "./cropper-dialog"
import { CircleX } from "lucide-react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { apiDeleteImage, apiGetProfile } from "@/api/profile"
import { toast } from "sonner"
import { actions } from "@/utils/toast"
import EmptyImg from "@/assets/images/empty-image.jpg"
import { Image } from "@/utils/types/profile"

const UserAvatarForm = () => {
  const uploadAvatarInputRef = useRef<(HTMLInputElement | null)[]>([])
  const [open, setOpen] = useState(false)

  const { data: profile, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: apiGetProfile,
    select: (res) => res.data,
  })

  const userInfoValues = useMemo(
    () => ({
      ...userAvatarFormDefault,
      images: userAvatarFormDefault.images.map((image) => {
        const matchingImage = profile?.images.find((item) => item.index === image.index)
        return matchingImage ? { ...image, ...matchingImage } : image
      }),
    }),
    [profile],
  )

  const form = useForm<z.infer<typeof userAvatarFormSchema>>({
    resolver: zodResolver(userAvatarFormSchema),
    values: userInfoValues,
    mode: "onChange",
  })
  const { control, watch, setValue } = form

  const { fields } = useFieldArray({ control, name: "images" })

  const watchAvatars = watch("images")
  const watchCurrentAvatar = watch("current_image")

  const deleteProfileImageMutation = useMutation({ mutationFn: apiDeleteImage })

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


  const onDeleteImage = (image: Image) => {
    const deleteImage = async () => {
      if (image && image.id) {
        await deleteProfileImageMutation.mutateAsync({ profile_id: profile?.id || "", image_id: image.id })
        refetch()
      }
    }
    toast.promise(deleteImage, actions.delete)
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
                onClick={() => {
                  if (watchAvatars[0].url !== EmptyImg) return
                  uploadAvatarInputRef.current?.[0]?.click()
                }}
              />
              {watchAvatars[0].url !== EmptyImg && <CircleX className="absolute right-2 top-2 h-6 w-6 text-red-700" onClick={() => onDeleteImage(watchAvatars[0] as Image)} />}
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
                    onClick={() => {
                      if (watchAvatars[field.index].url !== EmptyImg) return
                      uploadAvatarInputRef.current?.[field.index]?.click()}
                    }
                  />
                  {field.url !== EmptyImg && <CircleX className="absolute right-2 top-2 h-6 w-6 text-red-700" onClick={() => onDeleteImage(field as Image)} />}
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
      {watchCurrentAvatar && (
        <CropperDialog image={watchCurrentAvatar} open={open} setOpen={setOpen} profile_id={profile?.id || ""} />
      )}
    </FormProvider>
  )
}

export default UserAvatarForm
