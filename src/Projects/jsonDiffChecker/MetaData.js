import React from "react"
import { Code, MetaDataContainer } from "./style"

function MetaData({ selectedFiles, missingKeys, metaData }) {
  return (
    <MetaDataContainer>
      Files to Compare:
      <br /> 1. <Code>{selectedFiles.fileOne.name?.trunc(40)}</Code> ({metaData.fileOne.size})
      <br /> 2. <Code>{selectedFiles.fileTwo.name?.trunc(40)}</Code> ({metaData.fileTwo.size})
      {metaData.timeTakenToCompare > 0 && (
        <>
          <br />
          Time taken to compare: <Code>{metaData.timeTakenToCompare.toFixed(2)}</Code> milliseconds.
          <br />
        </>
      )}
      <hr />
      Total <Code>{missingKeys.totalCount}</Code> keys difference. <br />
      Extra Keys in <Code>{metaData.fileOne.name?.trunc(30)}</Code>: {missingKeys.compOne.length}
      <br />
      Extra Keys in <Code>{metaData.fileTwo.name?.trunc(30)}</Code>: {missingKeys.compTwo.length}
      <br />
    </MetaDataContainer>
  )
}

export default MetaData
