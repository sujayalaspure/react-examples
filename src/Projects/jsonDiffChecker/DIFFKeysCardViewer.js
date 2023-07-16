import React from "react"
import { Code, DIFFKeysCardsContainer, KeyWrapper } from "./style"

function DIFFKeysCardViewer({ selectedFiles, missingKeys }) {
  return (
    <DIFFKeysCardsContainer>
      <div className="keysDiff">
        <div className="fileTitle">{selectedFiles?.fileOne?.name}</div>
        {missingKeys.compOne.map((key) => (
          <KeyWrapperCard key={key} keyName={key} file={selectedFiles?.fileOne?.name?.trunc(30)} />
        ))}
      </div>
      <div className="keysDiff">
        <div className="fileTitle">{selectedFiles?.fileTwo?.name}</div>

        {missingKeys.compTwo.map((key) => (
          <KeyWrapperCard key={key} keyName={key} file={selectedFiles?.fileTwo?.name?.trunc(30)} />
        ))}
      </div>
    </DIFFKeysCardsContainer>
  )
}

export default DIFFKeysCardViewer

const KeyWrapperCard = ({ keyName, file }) => (
  <KeyWrapper>
    Extra key <Code>{keyName.replace(".", " > ")}</Code> in File <Code>{file}</Code>
  </KeyWrapper>
)
