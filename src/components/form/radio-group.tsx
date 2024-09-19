import { Controller, FieldPath, FieldValues, PathValue, UseControllerProps } from "react-hook-form"
import { cn } from "@/utils/shadcn"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { useId } from "react"
import { BaseFormProps, CustomFormSelectProps } from "./utils"

export const FormRadioGroup = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  labelDisplay = "inline",
  ...props
}: UseControllerProps<TFieldValues, TName> & BaseFormProps & { radioGroupProps?: CustomFormSelectProps }) => {
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
                className={cn("w-20 shrink-0 font-normal", typeof props.label === "object" && props.label.className, {
                  "mb-2 block": labelDisplay === "block",
                })}
              >
                {typeof props.label === "object" ? props.label.name : props.label}
              </Label>
            )}
            <RadioGroup
              className="!m-0 flex flex-wrap items-center gap-2"
              {...field}
              {...props.radioGroupProps}
              onChange={() => ""}
              onValueChange={(data) => {
                if (props.radioGroupProps?.onValueChange) props.radioGroupProps.onValueChange(data)
                if (data) field.onChange(data as PathValue<TFieldValues, TName>)
              }}
            >
              {props.radioGroupProps?.items.map(({ value, text }) => (
                <div key={value} className="flex items-center space-x-3 space-y-0">
                  <RadioGroupItem id={value + compId} value={value} />
                  <Label htmlFor={value + compId} className="cursor-pointer">
                    {text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {errmsg && <span className="text-xs text-red-600">{errmsg}</span>}
          </div>
        )
      }}
    />
  )
}
