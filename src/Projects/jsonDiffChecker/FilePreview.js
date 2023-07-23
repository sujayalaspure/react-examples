import React, { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { FileContentPreview, FilePreviewContainer } from "./style"
import DIFFViewer from "./DIFFViewer"
import ChevronIcon from "./ChevronIcon"

const FilePreview = forwardRef(({ name, onClearClick, file, flattenObject, missingKeys }, ref) => {
  const content = file.content
  const [isVisible, setIsVisible] = useState(!!content)
  const missingKeysSet = new Set(missingKeys.map((item) => item.keyValue))
  const diffPreviewRef = useRef(null)

  useImperativeHandle(ref, () => ({
    scrollToVisible: (key) => {
      diffPreviewRef.current.scrollToVisible(key)
    },
  }))

  return (
    <FilePreviewContainer show={isVisible}>
      <div className="fileTitle">
        <p
          className="hideButton"
          onClick={(e) => {
            e.stopPropagation()
            setIsVisible((prev) => !prev)
          }}
        >
          <ChevronIcon right={!isVisible} />
        </p>
        {file.name} ({missingKeys.length})
        <p name={name} onClick={onClearClick} className="clearButton">
          x
        </p>
      </div>
      <FileContentPreview show={isVisible}>
        {flattenObject?.length > 0 ? (
          <DIFFViewer ref={diffPreviewRef} missingKeysSet={missingKeysSet} jsonArray={flattenObject} />
        ) : (
          <pre>{JSON.stringify(content, null, 2)}</pre>
        )}
      </FileContentPreview>
    </FilePreviewContainer>
  )
})

export default FilePreview
