import React, { useState } from "react"
import { Code, DIFFKeysCardsContainer, FileKeysDiffContainer, KeyWrapper } from "./style"
import ChevronIcon from "./ChevronIcon"

function DIFFKeysCardViewer({ selectedFiles, missingKeys, onRowClick }) {
  return (
    <DIFFKeysCardsContainer>
      <FileKeysDiff onRowClick={onRowClick} fileName={selectedFiles?.fileOne?.name} missingKeys={missingKeys.compOne} />
      <FileKeysDiff onRowClick={onRowClick} fileName={selectedFiles?.fileTwo?.name} missingKeys={missingKeys.compTwo} />
    </DIFFKeysCardsContainer>
  )
}

export default DIFFKeysCardViewer

const FileKeysDiff = ({ fileName, missingKeys, onRowClick }) => {
  const [renderLen, setRenderLen] = useState(1000)
  const [isVisible, setIsVisible] = useState(true)

  const onClickHandler = (e, item) => {
    e.stopPropagation()
    if (onRowClick) onRowClick({ fileName, ...item })
  }

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
          <ChevronIcon right={!isVisible} />
        </span>
      </div>
      <div className="contentList">
        {missingKeys.slice(0, renderLen).map((item, i) => (
          <KeyWrapper onClick={(e) => onClickHandler(e, item)} key={item.keyValue + i}>
            Extra key <Code>{item.keyValue.replace(".", " > ")}</Code> in File <Code>{fileName.trunc(30)}</Code>
          </KeyWrapper>
        ))}
        {missingKeys?.length > renderLen && (
          <button className="loadMore" onClick={() => setRenderLen((prev) => prev + 1000)}>
            LoadMore
          </button>
        )}
      </div>
    </FileKeysDiffContainer>
  )
}
