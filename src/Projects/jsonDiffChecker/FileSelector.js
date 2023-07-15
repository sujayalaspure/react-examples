import React, { useRef } from "react"
import { FileNamePreview, FileSelectorInput } from "./style"

function FileSelector({ name, file, onChange, onClearClick }) {
  const fileRef = useRef(null)

  React.useEffect(() => {
    const ref = fileRef.current
    ref?.addEventListener("dragenter", handleDragEnter)
    ref?.addEventListener("dragleave", handleDragLeave)

    return () => {
      ref?.removeEventListener("dragenter", handleDragEnter)
      ref?.removeEventListener("dragleave", handleDragLeave)
    }
  }, [])

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    fileRef.current.style.backgroundColor = "#e7e7e7"
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    fileRef.current.style.backgroundColor = "white"
  }

  return (
    <>
      {!file ? (
        <FileSelectorInput accept="application/JSON" name={name} onChange={onChange} ref={fileRef} type="file" />
      ) : (
        <FileNamePreview>
          {file?.name}
          <div onClick={onClearClick} name={name}>
            X
          </div>
        </FileNamePreview>
      )}
    </>
  )
}

export default FileSelector
