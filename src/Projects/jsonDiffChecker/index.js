import {useRef, useState} from "react"
import {Body, Button, Container, FileContentContainer, FooterButtons, Header, RightSideBar} from "./style"
import useDiff from "./useDiff"
import MetaData from "./MetaData"
import FilePreview from "./FilePreview"
import Toast from "./Toast"
import FileSelector from "./FileSelector"
import DIFFKeysCardViewer from "./DIFFKeysCardViewer"

const inititalState = {
  fileOne: {
    name: "",
    file: null,
    show: false,
    content: null,
  },
  fileTwo: {
    name: "",
    file: null,
    show: false,
    content: null,
  },
}

function JSONDiffChecker() {
  const [selectedFiles, setSelectedFile] = useState({...inititalState})
  const toastRef = useRef(null)
  const fileOnePreviewRef = useRef(null)
  const fileTwoPreviewRef = useRef(null)
  const {compareContent, missingKeys, clearComparison, metaData, isLoading, clearFileData} = useDiff()

  const handleFileChange = ({fileNumber, fileData, inputFrom, url}) => {
    try {
      if (inputFrom === "file") {
        // console.log("handleFileChange", fileData)
        if (fileData.type !== "application/json") {
          toastRef.current.showToast("Please select a json file")
          return
        }
        if (fileData.size > 1500000) {
          toastRef.current.showToast("Please select a file less than 1.5MB")
          return
        }
        const reader = new FileReader()
        reader.readAsText(fileData, "UTF-8")
        reader.onload = (e) => {
          try {
            console.log(typeof e.target.result, JSON.parse(e.target.result))
            setSelectedFile({
              ...selectedFiles,
              [fileNumber]: {
                ...selectedFiles[fileNumber],
                file: fileData,
                name: fileData?.name,
                content: JSON.parse(e.target.result),
                show: true,
                usingLink: false,
              },
            })
          } catch (error) {
            toastRef.current.showToast("Not a Valid JSON File")
          }
        }
      } else if (inputFrom === "link") {
        // console.log("handleFileChange", fileData)
        setSelectedFile({
          ...selectedFiles,
          [fileNumber]: {
            ...selectedFiles[fileNumber],
            file: fileData,
            name: fileData?.name,
            content: JSON.parse(fileData?.data),
            show: true,
            usingLink: true,
            url,
          },
        })
      }
    } catch (error) {
      console.log(error)
      toastRef.current.showToast("😓 Something went south. Please try again")
    }
  }

  const onCompare = () => {
    console.log("compare")
    if (!selectedFiles.fileOne.file || !selectedFiles.fileTwo.file) {
      toastRef.current.showToast("Please select two files to compare")
      return
    }
    const {totalCount, error} = compareContent(selectedFiles)
    if (error) {
      toastRef.current.showToast(error)
      return
    }

    toastRef.current.showToast(`Total keys missmatched: ${totalCount}`)
  }

  const clearFile = (e) => {
    e.stopPropagation()
    const name = e.target.getAttribute("name")
    console.log(name)
    clearFileData(name)
    setSelectedFile({
      ...selectedFiles,
      [name]: {
        name: "",
        file: null,
        show: false,
        content: null,
      },
    })
  }

  const clearAll = () => {
    setSelectedFile({...inititalState})
    clearComparison()
  }

  const copyDiffAsText = () => {
    let text = ""
    text += `Total keys missmatched: ${missingKeys.totalCount}\n\n`
    text += `Extra Keys in file "${selectedFiles.fileOne.name}": ${missingKeys.compOne.length}\n`
    text += missingKeys.compOne.map((item) => item.keyValue).join("\n")
    text += "\n\n-------------------------------------------------- \n\n"
    text += `Extra Keys in file "${selectedFiles.fileTwo.name}": ${missingKeys.compTwo.length}\n`
    text += missingKeys.compTwo.map((item) => item.keyValue).join("\n")
    navigator.clipboard.writeText(text)
    toastRef.current.showToast("Copied to clipboard")
    console.log(text)
  }

  const onKeyRowClick = (item) => {
    if ([selectedFiles.fileOne.name, selectedFiles.fileOne.url].includes(item.fileName)) {
      fileOnePreviewRef.current.scrollToVisible(item.keyValue)
    }
    if ([selectedFiles.fileTwo.name, selectedFiles.fileTwo.url].includes(item.fileName)) {
      fileTwoPreviewRef.current.scrollToVisible(item.keyValue)
    }
  }

  return (
    <>
      <Container>
        <Header>
          <h1>JSON Diff Checker</h1>
          <p>This is a JSON Diff Checker. It takes two JSON files and compares</p>
        </Header>
        <Body>
          <FileContentContainer>
            <FooterButtons>
              <Button onClick={clearAll}>Clear</Button>
              <Button onClick={onCompare}>{isLoading ? "Comparing ..." : "Compare"}</Button>
            </FooterButtons>
            <div className="main">
              <div className="fileViewColumn">
                <FileSelector fileNumber="fileOne" file={selectedFiles.fileOne.file} onChange={handleFileChange} />
                {selectedFiles.fileOne.file && (
                  <FilePreview
                    name="fileOne"
                    onClearClick={clearFile}
                    ref={fileOnePreviewRef}
                    flattenObject={metaData.fileOne.flattenObject}
                    file={selectedFiles.fileOne}
                    missingKeys={missingKeys.compOne}
                  />
                )}
              </div>
              <div className="fileViewColumn">
                <FileSelector fileNumber="fileTwo" file={selectedFiles.fileTwo.file} onChange={handleFileChange} />
                {selectedFiles.fileTwo.file && (
                  <FilePreview
                    name="fileTwo"
                    onClearClick={clearFile}
                    ref={fileTwoPreviewRef}
                    flattenObject={metaData.fileTwo.flattenObject}
                    file={selectedFiles.fileTwo}
                    missingKeys={missingKeys.compTwo}
                  />
                )}
              </div>
            </div>
          </FileContentContainer>
          <RightSideBar>
            {missingKeys.totalCount > 0 && (
              <MetaData metaData={metaData} missingKeys={missingKeys} selectedFiles={selectedFiles} />
            )}
            {missingKeys.totalCount > 0 && <Button onClick={copyDiffAsText}>Copy Diff as text</Button>}
            {missingKeys.totalCount > 0 && (
              <DIFFKeysCardViewer onRowClick={onKeyRowClick} selectedFiles={selectedFiles} missingKeys={missingKeys} />
            )}
          </RightSideBar>
        </Body>
      </Container>
      <Toast ref={toastRef} />
      {/* <Footer /> */}
    </>
  )
}

export default JSONDiffChecker
