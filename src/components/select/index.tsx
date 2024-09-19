import { useMemo, forwardRef } from "react"
import { cn } from "@/utils/shadcn"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "../ui/label"
export interface SelectValueItem {
  text: string
  value: string
  image_url?: string
}

export type CustomSelectProps = {
  value: string
  placeholder?: string
  items: SelectValueItem[]
  onValueChange?: (value: string) => void
  disabled?: boolean
  className?: string
  label?: string
  id?: string
  topLayer?: boolean
}

const CustomSelect = forwardRef<HTMLButtonElement, CustomSelectProps>(
  ({ value, placeholder, onValueChange, items, disabled, className, label, id, ...props }, ref) => {
    const uuid = useMemo(() => {
      return self.crypto.randomUUID()
    }, [])

    return (
      <>
        {label && (
          <Label className="pr-3" htmlFor={id ?? uuid}>
            {label}
          </Label>
        )}
        <Select onValueChange={onValueChange} disabled={disabled} value={value} {...props}>
          <SelectTrigger ref={ref} id={id ?? uuid} className={cn("bg-white", className)}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="z-select">
            {placeholder && (
              <SelectItem disabled key="placeholder" value="">
                {placeholder}
              </SelectItem>
            )}
            {items.map((x) => (
              <SelectItem key={x.value} value={x.value} className="cursor-pointer">
                <div className="flex items-center gap-2">
                  {x.image_url && <img className="mr-2 h-7 w-7" src={x.image_url} alt={x.text} />}
                  {x.text}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </>
    )
  }
)

CustomSelect.displayName = "CustomSelect"

export { CustomSelect }
