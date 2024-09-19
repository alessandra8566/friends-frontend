import ConfirmDialog from "@/components/dialog"
import { createRef } from "react"
import Cropper, { ReactCropperElement } from "react-cropper"
import "cropperjs/dist/cropper.css"
import { useFieldArray, useFormContext } from "react-hook-form"
import { z } from "zod"
import { userInfoFormSchema } from "../utils"

interface CropperDialogsProps {
  open: boolean
  setOpen: (value: boolean) => void
  image?: {
    img_url: string
    img?: File
    index: number
  }
}

const CropperDialog = (props: CropperDialogsProps) => {
  const { image } = props
  const { control } = useFormContext<z.infer<typeof userInfoFormSchema>>()
  const { update } = useFieldArray({ control, name: "images" })
  const cropperRef = createRef<ReactCropperElement>()

  const onConfirm = () => {
    if (image) {
      const { index, img } = image
      const crop_img_url = cropperRef.current?.cropper.getCroppedCanvas().toDataURL()
      cropperRef.current?.cropper.getCroppedCanvas().toBlob((blob) => {
        if (!blob) return
        const file = new File([blob], img?.name || `圖片_${index}`, {
          type: "image/png",
        })
        update(index, {
          img_url: crop_img_url || "",
          img: file,
          avatar: index === 0,
          index,
        })
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
          src={image?.img_url}
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
