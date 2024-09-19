import { Label } from "@radix-ui/react-label"
import { Controller, FieldPath, FieldValues, UseControllerProps } from "react-hook-form"
import { cn } from "@/utils/shadcn"
import { useId } from "react"
import { Textarea, TextareaProps } from "../ui/textarea"
import { BaseFormProps } from "./utils"

const FormTextArea = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  labelDisplay = "inline",
  ...props
}: UseControllerProps<TFieldValues, TName> & BaseFormProps & { textareaProps?: TextareaProps }) => {
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
                  "mb-2 block": labelDisplay === "block",
                })}
              >
                {typeof props.label === "object" ? props.label.name : props.label}
              </Label>
            )}
            <Textarea
              className="!m-0 rounded border-[.5px] border-[#9B9B9B9B] bg-white focus-within:border-sky-600 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              {...field}
              {...props.textareaProps}
              onChange={(value) => {
                if (props.textareaProps?.onChange) return props.textareaProps?.onChange(value)
                field.onChange(value)
              }}
            />
            {errorMsg && <span className="text-xs text-red-600">{errorMsg}</span>}
          </div>
        )
      }}
    />
  )
}

export { FormTextArea }
