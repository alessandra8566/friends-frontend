import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { userInfoFormDefault, userInfoFormSchema } from "../utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { FormInput } from "@/components/form/input";
import { Button } from "@/components/ui/button";
import { FormTextArea } from "@/components/form/textarea";
import { ChangeEvent, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import CropperDialog from "./cropper-dialog";
import { Edit } from "lucide-react";

const UserInfoForm = () => {
  const uploadAvatarInputRef = useRef<(HTMLInputElement | null)[]>([]);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof userInfoFormSchema>>({
    resolver: zodResolver(userInfoFormSchema),
    values: userInfoFormDefault,
    mode: "onChange",
  });

  const { control, watch, handleSubmit, setValue } = form;

  const { fields } = useFieldArray({ control, name: "images" });

  const watchAvatars = watch("images");
  const watchCurrentAvatar = watch("current_image");

  const handleAvatarFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (uploadAvatarInputRef.current[index] && e.target.files?.length) {
      setValue(`current_image`, {
        avatar: index === 0,
        img: e.target.files[0],
        img_url: URL.createObjectURL(e.target.files[0]),
        index,
      });
      setOpen(true);
    }
  };

  const onSubmit = (values: z.infer<typeof userInfoFormSchema>) => {
    console.log(values);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <FormProvider {...form}>
      <div className="flex justify-center items-center flex-col">
        <div className="w-full">
          <p className="my-2">主要大頭貼</p>
          <div className="flex justify-center gap-2">
            <div className="relative">
              <img
                src={watchAvatars[0].img_url}
                alt="emptyImg"
                className="max-w-52 cursor-pointer"
                onClick={() => uploadAvatarInputRef.current?.[0]?.click()}
              />
              <Edit className="absolute bottom-2 right-2 w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div>
          <p className="my-2">我的更多照片</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {watchAvatars.map((field) =>
              field.index !== 0 ? (
                <div className="relative" key={field.index}>
                  <img
                    src={field.img_url}
                    alt="emptyImg"
                    className="max-w-52 cursor-pointer"
                    onClick={() =>
                      uploadAvatarInputRef.current?.[field.index]?.click()
                    }
                  />
                  <Edit className="absolute bottom-2 right-2 w-6 h-6 text-white" />
                </div>
              ) : null
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
      <FormInput name="username" labelDisplay="block" label="姓名" />
      <FormTextArea name="introduce" labelDisplay="block" label="自我介紹" />
      <Button onClick={handleSubmit(onSubmit)}>儲存</Button>

      {watchCurrentAvatar && (
        <CropperDialog
          image={watchCurrentAvatar}
          open={open}
          setOpen={setOpen}
        />
      )}
    </FormProvider>
  );
};

export default UserInfoForm;
