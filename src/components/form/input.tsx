import { Label } from "@radix-ui/react-label"
import { Controller, FieldPath, FieldValues, UseControllerProps } from "react-hook-form"
import { CustomInput, CustomInputProps } from "../input"
import { cn } from "@/utils/shadcn"
import { useId } from "react"
import { BaseFormProps } from "./utils"

const FormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  labelDisplay = "inline",
  ...props
}: UseControllerProps<TFieldValues, TName> & BaseFormProps & { inputProps?: CustomInputProps }) => {
  const compId = useId()
  return (
    <Controller
      {...props}
      render={({ field, fieldState }) => {
        const { error } = fieldState
        const errorMsg = error ? String(error?.message) : undefined
        return (
          <div
            className={cn(props?.className, {
              "flex items-center": labelDisplay === "inline",
            })}
          >
            {props.label && (
              <Label
                htmlFor={`input-${compId}`}
                className={cn("w-20 shrink-0", typeof props.label === "object" && props.label.className, {
                  "block mb-2": labelDisplay === "block"
                })}
              >
                {typeof props.label === "object" ? props.label.name : props.label}
              </Label>
            )}
            <div className="w-full">
              <CustomInput
                id={`input-${compId}`}
                {...field}
                {...props.inputProps}
                className={cn("w-full border-[.5px] border-[#9B9B9B9B]", props.inputProps?.className, {
                  "opacity-50": props.inputProps?.disabled,
                })}
              />
              {errorMsg && <span className="block text-xs text-red-600">{errorMsg}</span>}
            </div>
          </div>
        )
      }}
    />
  )
}

export { FormInput }
