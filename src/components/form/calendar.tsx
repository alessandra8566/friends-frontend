import { Label } from "@radix-ui/react-label"
import { Controller, FieldPath, FieldValues, PathValue, UseControllerProps } from "react-hook-form"
import { BaseFormProps, CustomFormCalendarProps } from "./utils"
import { cn } from "@/utils/shadcn"
import { useId } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "../ui/button"
import moment from "moment"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

const FormCalendar = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  labelDisplay = "inline",
  ...props
}: UseControllerProps<TFieldValues, TName> & BaseFormProps & { calendarProps?: CustomFormCalendarProps }) => {
  const compId = useId()
  const dateFormat = props.calendarProps?.dateFormat || "YYYY/MM/DD"
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
                className={cn("w-20 shrink-0", typeof props.label === "object" && props.label.className)}
              >
                {typeof props.label === "object" ? props.label.name : props.label}
              </Label>
            )}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="!m-0 w-full justify-between text-left font-normal"
                  disabled={props.calendarProps?.disabled}
                >
                  {field.value ? (
                    moment(field.value, dateFormat).format(dateFormat)
                  ) : (
                    <span>{props.calendarProps?.placeholder ?? "請選擇日期"}</span>
                  )}
                  <CalendarIcon className="mr-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className={cn("w-auto p-0 ", props.calendarProps?.className)}>
                <Calendar
                  mode="single"
                  captionLayout="dropdown-buttons"
                  fromYear={1950}
                  toYear={moment().year()}
                  selected={moment(field.value, dateFormat).toDate()}
                  onSelect={(date) => {
                    if (date && props.calendarProps?.onChange) return props.calendarProps?.onChange(date)
                    field.onChange(moment(date, dateFormat).format(dateFormat) as PathValue<TFieldValues, TName>)
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errorMsg && <span className="text-xs text-red-600">{errorMsg}</span>}
          </div>
        )
      }}
    />
  )
}

export { FormCalendar }
