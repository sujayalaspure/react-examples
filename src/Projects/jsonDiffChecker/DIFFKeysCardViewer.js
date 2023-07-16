import React, { useState } from "react"
import { Code, DIFFKeysCardsContainer, FileKeysDiffContainer, KeyWrapper } from "./style"

function DIFFKeysCardViewer({ selectedFiles, missingKeys }) {
  return (
    <DIFFKeysCardsContainer>
      <FileKeysDiff fileName={selectedFiles?.fileOne?.name} missingKeys={missingKeys.compOne} />
      <FileKeysDiff fileName={selectedFiles?.fileTwo?.name} missingKeys={missingKeys.compTwo} />
    </DIFFKeysCardsContainer>
  )
}

export default DIFFKeysCardViewer

const FileKeysDiff = ({ fileName, missingKeys }) => {
  const [renderLen, setRenderLen] = useState(1000)
  const [isVisible, setIsVisible] = useState(true)

  return (
    <FileKeysDiffContainer className="keysDiff" isVisible={isVisible}>
      <div className="fileTitle">
        {fileName} ({Math.min(renderLen, missingKeys.length)}/{missingKeys.length})
        <span
          onClick={(e) => {
            e.stopPropagation()
            setIsVisible((prev) => !prev)
          }}
          className="icon"
        >
          &#7028;
        </span>
      </div>
      <div className="contentList">
        {missingKeys.slice(0, renderLen).map((keyName, i) => (
          <KeyWrapper key={keyName + i}>
            Extra key <Code>{keyName.replace(".", " > ")}</Code> in File <Code>{fileName.trunc(30)}</Code>
          </KeyWrapper>
        ))}
        {missingKeys.length > renderLen && (
          <button className="loadMore" onClick={() => setRenderLen((prev) => prev + 1000)}>
            LoadMore
          </button>
        )}
      </div>
    </FileKeysDiffContainer>
  )
}
