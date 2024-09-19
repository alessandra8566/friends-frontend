import { Controller, FieldPath, FieldPathValue, FieldValues, UseControllerProps } from "react-hook-form"
import { CustomSelect } from "../select"
import { cn } from "@/utils/shadcn"
import { Label } from "@radix-ui/react-label"
import { useId } from "react"
import { FormMessage } from "../ui/form"
import { BaseFormProps, CustomFormSelectProps } from "./utils"

const FormSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  labelDisplay = "inline",
  ...props
}: UseControllerProps<TFieldValues, TName> & BaseFormProps & { selectProps: CustomFormSelectProps }) => {
  const compId = useId()
  return (
    <Controller
      {...props}
      render={({ field, fieldState }) => {
        const { error } = fieldState
        const errmsg = error ? String(error?.message) : undefined
        return (
          <div
            className={cn(props?.className, {
              "flex items-center": labelDisplay === "inline",
            })}
          >
            {props.label && (
              <Label
                htmlFor={`select-${compId}`}
                className={cn("w-20 shrink-0", typeof props.label === "object" && props.label.className, {
                  "mb-2 block": labelDisplay === "block",
                })}
              >
                {typeof props.label === "object" ? props.label.name : props.label}
              </Label>
            )}
            <CustomSelect
              className={cn("!m-0 border-[.5px] border-[#9B9B9B9B]")}
              {...field}
              {...props.selectProps}
              id={`select-${compId}`}
              onValueChange={(data) => {
                if (props.selectProps.onValueChange) props.selectProps.onValueChange(data)
                if (data) field.onChange(data as FieldPathValue<TFieldValues, TName>)
              }}
            />
            {errmsg && <FormMessage className="text-xs" />}
          </div>
        )
      }}
    />
  )
}
export { FormSelect }
