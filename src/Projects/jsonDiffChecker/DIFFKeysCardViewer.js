import { DIFFKeysCardsContainer } from "./style"
import PropTypes from "prop-types"
import FileKeysDiff from "./FileKeysDiff"

DIFFKeysCardViewer.propTypes = {
  selectedFiles: PropTypes.object,
  missingKeys: PropTypes.object,
  onRowClick: PropTypes.func,
}

function DIFFKeysCardViewer({ selectedFiles, missingKeys, onRowClick }) {
  const fileOneName = selectedFiles.fileOne.usingLink ? selectedFiles.fileOne.url : selectedFiles.fileOne.name
  const fileTwoName = selectedFiles.fileTwo.usingLink ? selectedFiles.fileTwo.url : selectedFiles.fileTwo.name
  return (
    <DIFFKeysCardsContainer>
      <FileKeysDiff onRowClick={onRowClick} fileName={fileOneName} missingKeys={missingKeys.compOne} />
      <FileKeysDiff onRowClick={onRowClick} fileName={fileTwoName} missingKeys={missingKeys.compTwo} />
    </DIFFKeysCardsContainer>
  )
}

export default DIFFKeysCardViewer
