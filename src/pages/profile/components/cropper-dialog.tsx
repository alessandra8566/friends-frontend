import ConfirmDialog from "@/components/dialog"
import { createRef } from "react"
import Cropper, { ReactCropperElement } from "react-cropper"
import "cropperjs/dist/cropper.css"
import { useFieldArray, useFormContext } from "react-hook-form"
import { z } from "zod"
import { userAvatarFormSchema } from "../utils"
import { useMutation } from "@tanstack/react-query"
import { apiUploadImage } from "@/api/profile"
import { toast } from "sonner"
import { actions } from "@/utils/toast"

interface CropperDialogsProps {
  open: boolean
  setOpen: (value: boolean) => void
  profile_id: string
  image?: {
    id: string
    url: string
    img?: File
    index: number
  }
}

const CropperDialog = (props: CropperDialogsProps) => {
  const { image, profile_id } = props
  const { control } = useFormContext<z.infer<typeof userAvatarFormSchema>>()
  const { update } = useFieldArray({ control, name: "images" })
  const cropperRef = createRef<ReactCropperElement>()

  const createProfileImagesMutation = useMutation({ mutationFn: apiUploadImage })

  const onConfirm = () => {
    if (image) {
      const { index, img, id } = image
      const crop_img_url = cropperRef.current?.cropper.getCroppedCanvas().toDataURL()
      cropperRef.current?.cropper.getCroppedCanvas().toBlob((blob) => {
        if (!blob) return
        const file = new File([blob], img?.name || `圖片_${index}`, {
          type: "image/png",
        })
        update(index, {
          id,
          url: crop_img_url || "",
          img: file,
          avatar: index === 0,
          index,
        })

        const form = new FormData()
        form.append("file", file)
        form.append("index", index.toString())
        form.append("avatar", (index === 0).toString())

        toast.promise(createProfileImagesMutation.mutateAsync({ id: profile_id, data: form }), actions.update)
      })
    }
  }

  return (
    <ConfirmDialog {...props} title="圖片裁剪" onConfirmClick={onConfirm} className="max-w-96">
      <div className="flex-grow">
        <Cropper
          ref={cropperRef}
          style={{ height: 400, width: "100%" }}
          aspectRatio={1}
          src={image?.url}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={true}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          guides={false}
          scalable={false}
          cropBoxResizable={false}
        />
      </div>
    </ConfirmDialog>
  )
}

export default CropperDialog
