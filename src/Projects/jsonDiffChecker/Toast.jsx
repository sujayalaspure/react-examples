import { forwardRef, useImperativeHandle, useState } from "react"
import { ToastWrapper } from "./style"

const Toast = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState({
    showToast: false,
    message: "",
  })
  useImperativeHandle(ref, () => ({
    showToast: (message) => {
      setIsVisible({
        showToast: true,
        message,
      })
      const timeout = setTimeout(() => {
        setIsVisible({
          showToast: false,
          message: "",
        })
        clearTimeout(timeout)
      }, 3000)
    },
  }))

  return (
    <ToastWrapper showToast={isVisible.showToast}>
      <p>{isVisible.message}</p>
    </ToastWrapper>
  )
})

Toast.displayName = "Toast"

export default Toast
