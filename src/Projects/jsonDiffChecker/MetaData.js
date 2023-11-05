import { Code, MetaDataContainer } from "./style"
import PropTypes from "prop-types"

MetaData.propTypes = {
  selectedFiles: PropTypes.object,
  missingKeys: PropTypes.object,
  metaData: PropTypes.object,
}

function MetaData({ selectedFiles, missingKeys, metaData }) {
  const fileOneName = selectedFiles.fileOne.usingLink ? selectedFiles.fileOne.url : selectedFiles.fileOne.name
  const fileTwoName = selectedFiles.fileTwo.usingLink ? selectedFiles.fileTwo.url : selectedFiles.fileTwo.name
  return (
    <MetaDataContainer>
      Files to Compare:
      <br /> 1. <Code title={fileOneName}>{fileOneName?.trunc(40)}</Code> ({metaData.fileOne.size})
      <br /> 2. <Code title={fileTwoName}>{fileTwoName?.trunc(40)}</Code> ({metaData.fileTwo.size})
      {metaData.timeTakenToCompare > 0 && (
        <>
          <br />
          Time taken to compare: <Code>{metaData.timeTakenToCompare.toFixed(2)}</Code> ms.
          <br />
        </>
      )}
      <hr />
      Total <Code>{missingKeys.totalCount}</Code> keys difference. <br />
      Extra Keys in <Code title={fileOneName}>{fileOneName?.trunc(30)}</Code>: {missingKeys.compOne.length}
      <br />
      Extra Keys in <Code title={fileTwoName}>{fileTwoName?.trunc(30)}</Code>: {missingKeys.compTwo.length}
      <br />
    </MetaDataContainer>
  )
}

export default MetaData
