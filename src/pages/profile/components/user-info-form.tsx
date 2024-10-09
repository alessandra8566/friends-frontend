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
import { apiGetProfile, apiPatchProfile } from "@/api/profile"
import { useMemo } from "react"
import { actions } from "@/utils/toast"
import { toast } from "sonner"

const UserInfoForm = () => {
  const { data: profile, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: apiGetProfile,
    select: (res) => res.data,
  })

  const userInfoFormValues: z.infer<typeof userInfoFormSchema> = useMemo(() => {
    return {
      ...userInfoFormDefault,
      name: profile?.name ?? userInfoFormDefault.name,
      height: profile?.height ?? userInfoFormDefault.height,
      weight: profile?.weight ?? userInfoFormDefault.weight,
      location: profile?.location ?? userInfoFormDefault.location,
      introduced: profile?.introduce ?? userInfoFormDefault.introduce,
      hobby: profile?.hobby ?? userInfoFormDefault.hobby,
      job: profile?.job ?? userInfoFormDefault.job,
      education: profile?.education ?? userInfoFormDefault.education,
      constellation: profile?.constellation ?? userInfoFormDefault.constellation,
      languages: profile?.languages ?? userInfoFormDefault.languages,
      smoke: profile?.smoke ?? userInfoFormDefault.smoke,
      drink: profile?.drink ?? userInfoFormDefault.drink,
    }
  }, [profile])

  const form = useForm<z.infer<typeof userInfoFormSchema>>({
    resolver: zodResolver(userInfoFormSchema),
    values: userInfoFormValues,
  })

  const { watch, setValue, handleSubmit } = form
  const watchValues = watch()

  const patchProfileMutation = useMutation({ mutationFn: apiPatchProfile })

  const onSubmit = (values: z.infer<typeof userInfoFormSchema>) => {
    const patchProfile = async () => {
      await patchProfileMutation.mutateAsync({ id: profile?.id || "", data: values })
      refetch()
    }

    toast.promise(patchProfile, actions.update)
    console.log(values)
  }

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-8">
        <h2 className="text-lg font-bold">基本資料</h2>
        <div className="grid gap-4">
          <FormInput name="name" label="暱稱" labelDisplay="block" />
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
