import { useState } from "react"
import { Code, FileKeysDiffContainer, KeyWrapper } from "./style"
import ChevronIcon from "./ChevronIcon"
import PropTypes from "prop-types"

FileKeysDiff.propTypes = {
  fileName: PropTypes.string,
  missingKeys: PropTypes.array,
  onRowClick: PropTypes.func,
}

function FileKeysDiff({ fileName, missingKeys, onRowClick }) {
  const [renderLen, setRenderLen] = useState(1000)
  const [isVisible, setIsVisible] = useState(true)
  const [rowClicked, setRowClicked] = useState(null)

  const onClickHandler = (e, item, index) => {
    e.stopPropagation()
    if (onRowClick) onRowClick({ fileName, ...item })
    setRowClicked(index)
    const timeout = setTimeout(() => {
      setRowClicked(null)
      clearTimeout(timeout)
    }, 3000)
  }

  return (
    <FileKeysDiffContainer className="keysDiff" isVisible={isVisible}>
      <div title={fileName} className="fileTitle">
        {fileName?.trunc(30)} ({Math.min(renderLen, missingKeys.length)}/{missingKeys.length})
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
          <KeyWrapper isClicked={rowClicked === i} onClick={(e) => onClickHandler(e, item, i)} key={item.keyValue + i}>
            Extra key <Code title={item.keyValue}>{item.keyValue.replace(".", " > ")}</Code> in File{" "}
            <Code title={fileName}>{fileName.trunc(30)}</Code>
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

export default FileKeysDiff
