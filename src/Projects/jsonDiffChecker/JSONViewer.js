import React, { useState } from "react"
import { FileContentPreview } from "./style"

function JSONViewer({ content }) {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <FileContentPreview show={isVisible}>
      <p
        onClick={(e) => {
          e.stopPropagation()
          setIsVisible((prev) => !prev)
        }}
      >
        &#709;
      </p>
      <pre>{typeof data === "string" ? content : JSON.stringify(content, null, 2)}</pre>
    </FileContentPreview>
  )
}

export default JSONViewer
