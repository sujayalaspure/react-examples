import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { FileContentPreview, FilePreviewContainer } from "./style"

import PropTypes from "prop-types"
import ChevronIcon from "./ChevronIcon"
import DIFFViewer from "./DIFFViewer"

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

  console.log(file)

  return (
    <FilePreviewContainer show={isVisible}>
      <div className="fileTitle" title={file.usingLink ? file.url : file.name}>
        <p
          className="hideButton"
          onClick={(e) => {
            e.stopPropagation()
            setIsVisible((prev) => !prev)
          }}
        >
          <ChevronIcon right={!isVisible} />
        </p>
        {file.usingLink ? `${file.url?.trunc(30)}` : `${file.name?.trunc(30)} (${missingKeys.length})`}
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

FilePreview.propTypes = {
  name: PropTypes.string,
  onClearClick: PropTypes.func,
  file: PropTypes.object,
  flattenObject: PropTypes.array,
  missingKeys: PropTypes.array,
}

FilePreview.displayName = "FilePreview"
export default FilePreview
