import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
} from "../ui/alert-dialog"

type DialogProps = {
  open: boolean
  setOpen: (value: boolean) => void
  children: React.ReactNode
  backdropClose?: boolean
  className?: string
  title: string
  onConfirmClick: () => void
  cancelText?: string
  confirmText?: string
  onCancelClick?: () => void
}

const BaseDialog = (props: DialogProps) => {
  const {
    title = "",
    children,
    cancelText,
    confirmText,
    backdropClose = true,
    open,
    setOpen,
    onConfirmClick,
    onCancelClick,
    className,
  } = props

  const backdropCloseHandler = () => {
    if (!backdropClose) return
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogOverlay onClick={backdropCloseHandler} className="bg-zinc-900/20" />
      <AlertDialogContent className={className}>
        <AlertDialogHeader>
          {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
          <AlertDialogDescription asChild>{children}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancelClick}>{cancelText ?? "取消"}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmClick}>{confirmText ?? "確定"}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default BaseDialog
