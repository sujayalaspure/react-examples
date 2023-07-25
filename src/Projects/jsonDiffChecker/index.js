import React, { useEffect, useRef, useState } from "react"
import {
  Body,
  Button,
  Container,
  FileContentContainer,
  FooterButtons,
  Header,
  RightSideBar,
  ToastWrapper,
} from "./style"
import useDiff from "./useDiff"
import Footer from "../../Components/footer"
import FilePreview from "./FilePreview"
import DIFFKeysCardViewer from "./DIFFKeysCardViewer"
import FileSelector from "./FileSelector"
import MetaData from "./MetaData"

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
  const [selectedFiles, setSelectedFile] = useState({ ...inititalState })
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
  })
  const fileOnePreviewRef = useRef(null)
  const fileTwoPreviewRef = useRef(null)
  const { compareContent, missingKeys, clearComparison, metaData, isLoading, clearFileData } = useDiff()

  const handleFileChange = ({ fileNumber, fileData, inputFrom }) => {
    try {
      if (inputFrom === "file") {
        // console.log("handleFileChange", fileData)
        if (fileData.type !== "application/json") {
          setShowToast({ show: true, message: "Please select a json file" })
          return
        }
        if (fileData.size > 1500000) {
          setShowToast({ show: true, message: "Please select a file less than 1.5MB" })
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
              },
            })
          } catch (error) {
            setShowToast({ show: true, message: "Not a Valid JSON File" })
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
          },
        })
      }
    } catch (error) {
      console.log(error)
      setShowToast({ show: true, message: "😓 Something went south. Please try again" })
    }
  }

  const onCompare = () => {
    console.log("compare")
    if (!selectedFiles.fileOne.file || !selectedFiles.fileTwo.file) {
      setShowToast({ show: true, message: "Please select two files to compare" })
      return
    }
    const { totalCount, error } = compareContent(selectedFiles)
    if (error) {
      setShowToast({ show: true, message: error })
      return
    }

    setShowToast({
      show: true,
      message: `Total keys missmatched: ${totalCount}`,
    })
  }

  useEffect(() => {
    let timeout
    if (showToast) {
      timeout = setTimeout(() => {
        setShowToast(false)
      }, 3000)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [showToast])

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
    setSelectedFile({ ...inititalState })
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
    setShowToast({ show: true, message: "Copied to clipboard" })
    console.log(text)
  }

  const onKeyRowClick = (item) => {
    if (item.fileName === selectedFiles.fileOne.name) {
      fileOnePreviewRef.current.scrollToVisible(item.keyValue)
    }
    if (item.fileName === selectedFiles.fileTwo.name) {
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
      <Toast showToast={showToast.show} message={showToast.message} />
      <Footer />
    </>
  )
}

export default JSONDiffChecker

const Toast = ({ message, showToast }) => (
  <ToastWrapper showToast={showToast}>
    <p>{message}</p>
  </ToastWrapper>
)

/**
 * BUGS:
 * - [ ] closing bracket not rendering correctly. if having empty object.
 * - [ ] not rendering if having consecutive nested objects
 * - [ ] last remaining closing bracket not rendering correctly
 * - [ ] check for null and undefined values
 * - [ ] last line number not updating correctly
 * - [ ] render empty array/ object on the same line.
 * - [ ] from DiffView remove ref for every key. Only add to the extra keys.
 * - [ ] rows in DiffView is re-rendering on hide/show operation
 *
 * Features:
 * - [x] compare two json files
 * - [x] Fetch data from json url
 * - [x] show diff in file preview
 * - [x] show extra keys
 * - [x] click on the key to scroll to the key in the file
 * - [x] copy diff as text
 * - [x] show meta data
 * - [x] show time taken to compare
 * - [ ] Optimize the diff algorithm
 * - [ ] diff preview add load more button
 * - [ ] Scroll both the files simultaneously
 * - [ ] Add file name change option while copying diff as text
 *
 */
