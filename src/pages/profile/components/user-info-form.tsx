import {
  constellationSelectItems,
  educationSelectItems,
  frequencySelectItems,
  jobSelectItems,
  languageUseSelectItems,
  locationSelectItems,
  userInfoFormDefault,
  userInfoFormSchema,
} from "../utils"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Slider } from "@/components/ui/slider"
import { FormSelect } from "@/components/form/select"
import { FormTextArea } from "@/components/form/textarea"
import { FormInput } from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { useMutation, useQuery } from "@tanstack/react-query"
import { apiGetProfile, apiGetProfileDetails, apiPatchProfile } from "@/api/profile"
import { useMemo } from "react"
import { actions } from "@/utils/toast"
import { toast } from "sonner"
import { genderSelectItem } from "@/pages/authentication/utils"
import { useUserInfo } from "@/hooks/session-storage"
import { useParams } from "react-router-dom"
import { apiPatchUser } from "@/api/auth"
import { FormCalendar } from "@/components/form/calendar"

const UserInfoForm = () => {
  const { id = "" } = useParams()
  const [user] = useUserInfo()

  const { data: profile, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: apiGetProfile,
    select: (res) => res.data,
    enabled: !id,
    refetchOnWindowFocus: false,
  })

  const { data: profileDetail } = useQuery({
    queryKey: ["profile", "details", id],
    queryFn: () => apiGetProfileDetails(id),
    select: (res) => res.data,
    enabled: !!id,
    refetchOnWindowFocus: false,
  })

  const userInfoFormValues: z.infer<typeof userInfoFormSchema> = useMemo(() => {
    return {
      ...userInfoFormDefault,
      name: profileDetail?.name ?? user?.name ?? userInfoFormDefault.name,
      email: profileDetail?.email ?? user?.email ?? userInfoFormDefault.email,
      gender: profileDetail?.gender ?? user?.gender ?? userInfoFormDefault.gender,
      birthday: profileDetail?.birthday ?? user?.birthday ?? userInfoFormDefault.birthday,
      introduce: profile?.introduce ?? profileDetail?.introduce ?? userInfoFormDefault.introduce,
      like_style: profile?.like_style ?? profileDetail?.like_style ?? userInfoFormDefault.like_style,
      constellation: profile?.constellation ?? profileDetail?.constellation ?? userInfoFormDefault.constellation,
      location: profile?.location ?? profileDetail?.location ?? userInfoFormDefault.location,
      weight: profile?.weight ?? profileDetail?.weight ?? userInfoFormDefault.weight,
      height: profile?.height ?? profileDetail?.height ?? userInfoFormDefault.height,
      job: profile?.job ?? profileDetail?.job ?? userInfoFormDefault.job,
      education: profile?.education ?? profileDetail?.education ?? userInfoFormDefault.education,
      hobby: profile?.hobby ?? profileDetail?.hobby ?? userInfoFormDefault.hobby,
      smoke: profile?.smoke ?? profileDetail?.smoke ?? userInfoFormDefault.smoke,
      drink: profile?.drink ?? profileDetail?.drink ?? userInfoFormDefault.drink,
      languages: profile?.languages ?? profileDetail?.languages ?? userInfoFormDefault.languages,
    }
  }, [profile, profileDetail, user])

  const form = useForm<z.infer<typeof userInfoFormSchema>>({
    resolver: zodResolver(userInfoFormSchema),
    values: userInfoFormValues,
  })

  const { watch, setValue, handleSubmit } = form
  const watchValues = watch()
  
  const patchUserMutation = useMutation({ mutationFn: apiPatchUser })
  const patchProfileMutation = useMutation({ mutationFn: apiPatchProfile })

  const onSubmit = (values: z.infer<typeof userInfoFormSchema>) => {
    const patchProfile = async () => {
      await patchProfileMutation.mutateAsync({ id: id || profile?.id || "", data: values })
      if (id) await patchUserMutation.mutateAsync({ id, data: { gender: values.gender, birthday: values.birthday } })
      refetch()
    }

    toast.promise(patchProfile, actions.update)
  }

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-8">
        <h2 className="text-lg font-bold">基本資料</h2>
        <div className="grid gap-4">
          <FormInput name="name" label="暱稱" labelDisplay="block" />
          {["admin"].includes(user?.role || "") && id && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2">性別</p>
                <FormSelect name="gender" selectProps={{ items: genderSelectItem }} />
              </div>
              <div>
                <p className="mb-2">年齡</p>
                <FormCalendar name="birthday" />
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <p>身高: {watchValues.height} 公分</p>
            <Slider
              defaultValue={[watchValues.height || 160]}
              min={140}
              max={220}
              className="w-full"
              onValueChange={([value]) => setValue("height", value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>體重: {watchValues.weight} 公斤</p>
            <Slider
              defaultValue={[watchValues.weight || 60]}
              min={35}
              max={120}
              className="w-full"
              onValueChange={([value]) => setValue("weight", value)}
            />
          </div>
          <FormSelect
            name="location"
            labelDisplay="block"
            label="居住地"
            selectProps={{ items: locationSelectItems }}
          />
          <FormTextArea name="introduce" labelDisplay="block" label="自我介紹" />
          <FormInput name="hobby" labelDisplay="block" label="興趣" />
        </div>
        <h2 className="text-lg font-bold">其他資訊</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormSelect name="job" labelDisplay="block" label="職業類別" selectProps={{ items: jobSelectItems }} />
          <FormSelect
            name="education"
            labelDisplay="block"
            label="學歷"
            selectProps={{ items: educationSelectItems }}
          />
          <FormSelect
            name="constellation"
            labelDisplay="block"
            label="星座"
            selectProps={{ items: constellationSelectItems }}
          />
          <FormSelect
            name="languages"
            labelDisplay="block"
            label="語言"
            selectProps={{ items: languageUseSelectItems }}
          />
          <FormSelect
            name="smoke"
            labelDisplay="block"
            label={{ name: "是否有吸菸習慣", className: "w-60" }}
            selectProps={{ items: frequencySelectItems }}
          />
          <FormSelect
            name="drink"
            labelDisplay="block"
            label={{ name: "是否有飲酒習慣", className: "w-60" }}
            selectProps={{ items: frequencySelectItems }}
          />
        </div>
        <Button onClick={handleSubmit(onSubmit)}>儲存</Button>
      </div>
    </FormProvider>
  )
}

export default UserInfoForm
