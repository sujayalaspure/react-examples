import React, { useEffect, useState } from "react"
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
import JSONViewer from "./JSONViewer"
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

  const { compareContent, missingKeys, clearComparison, metaData } = useDiff()

  const handleFileChange = (e) => {
    try {
      const {
        name,
        files: [file],
      } = e.target
      console.log(file)
      if (file.type !== "application/json") {
        setShowToast({ show: true, message: "Please select a json file" })
        return
      }
      const reader = new FileReader()
      reader.readAsText(file, "UTF-8")
      reader.onload = (e) => {
        try {
          console.log(typeof e.target.result, JSON.parse(e.target.result))
          setSelectedFile({
            ...selectedFiles,
            [name]: {
              ...selectedFiles[name],
              file,
              name: file?.name,
              content: JSON.parse(e.target.result),
              show: true,
            },
          })
        } catch (error) {
          setShowToast({ show: true, message: "Not a Valid JSON File" })
        }
      }
    } catch (error) {
      setShowToast({ show: true, message: "Something went south. Please try again" })
    }
  }

  const onCompare = () => {
    console.log("compare")
    if (!selectedFiles.fileOne.file || !selectedFiles.fileTwo.file) {
      setShowToast({ show: true, message: "Please select two files to compare" })
      return
    }
    const { totalCount } = compareContent(selectedFiles)
    setShowToast({
      show: true,
      message: `Total keys missmatched: ${totalCount}`,
    })
  }

  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false)
      }, 3000)
    }
  }, [showToast])

  const clearFile = (e) => {
    e.stopPropagation()
    const name = e.target.getAttribute("name")
    console.log(name)
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
    text += missingKeys.compOne.join("\n")
    text += "\n\n-------------------------------------------------- \n\n"
    text += `Extra Keys in file "${selectedFiles.fileTwo.name}": ${missingKeys.compTwo.length}\n`
    text += missingKeys.compTwo.join("\n")
    navigator.clipboard.writeText(text)
    setShowToast({ show: true, message: "Copied to clipboard" })
    console.log(text)
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
              <Button onClick={onCompare}>Compare</Button>
            </FooterButtons>
            <div className="main">
              <div className="fileViewColumn">
                <FileSelector
                  name="fileOne"
                  file={selectedFiles.fileOne.file}
                  onChange={handleFileChange}
                  onClearClick={clearFile}
                />
                <JSONViewer content={selectedFiles.fileOne?.content} />
              </div>
              <div className="fileViewColumn">
                <FileSelector
                  name="fileTwo"
                  file={selectedFiles.fileTwo.file}
                  onChange={handleFileChange}
                  onClearClick={clearFile}
                />
                <JSONViewer content={selectedFiles.fileTwo?.content} />
              </div>
            </div>
          </FileContentContainer>
          <RightSideBar>
            <MetaData metaData={metaData} missingKeys={missingKeys} selectedFiles={selectedFiles} />
            <Button onClick={copyDiffAsText}>Copy Diff as text</Button>
            <DIFFKeysCardViewer selectedFiles={selectedFiles} missingKeys={missingKeys} />
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
