import { SelectValueItem } from "../select"

export type FormLabel = string | { name: string; className?: string }
export interface BaseFormProps {
  className?: string
  label?: FormLabel
  labelDisplay?: "inline" | "block"
}
export type CustomFormCheckboxProps = {
  value?: string
  placeholder?: string
  onCheckedChange?: (value: boolean) => void
  disabled?: boolean
  className?: string
  label?: FormLabel
  id?: string
  hidden?: boolean
}
export type CustomFormSelectProps = {
  value?: string
  placeholder?: string
  items: SelectValueItem[]
  onValueChange?: (value: string) => void
  onCheckedChange?: (checked: boolean, value?: string) => void
  disabled?: boolean
  className?: string
  id?: string
}

export type CustomFormCalendarProps = {
  value?: string
  placeholder?: string
  onChange?: (value: Date) => void
  dateFormat?: string
  disabled?: boolean
  className?: string
  label?: string
  id?: string
}
