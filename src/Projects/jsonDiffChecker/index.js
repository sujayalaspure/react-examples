import React, { useRef, useState } from "react"
import {
  Body,
  Button,
  Code,
  Col,
  Container,
  FileContentPreview,
  FileNamePreview,
  FileSelector,
  Header,
  KeyWrapper,
  Row,
} from "./style"
import useDiff from "./useDiff"

function JSONDiffChecker() {
  const fileOne = useRef(null)
  const fileTwo = useRef(null)
  const [selectedFile, setSelectedFile] = useState({
    fileOne: null,
    fileTwo: null,
  })

  const { compareContent, missingKeys } = useDiff(selectedFile.fileOne, selectedFile.fileTwo)

  const [fileContent, setFileContent] = useState({
    fileOne: null,
    showOne: false,
    fileTwo: null,
    showTwo: false,
  })
  React.useEffect(() => {
    addEventListener(fileOne)
    addEventListener(fileTwo)

    return () => {
      removeEventListener(fileOne)
      removeEventListener(fileTwo)
    }
  }, [])

  const addEventListener = (dropBox) => {
    dropBox?.current?.addEventListener("dragenter", (e) => handleDragEnter(e, dropBox))
    dropBox?.current?.addEventListener("dragleave", (e) => handleDragLeave(e, dropBox))
  }

  const removeEventListener = (dropBox) => {
    dropBox?.current?.removeEventListener("dragenter", handleDragEnter)
    dropBox?.current?.removeEventListener("dragleave", handleDragLeave)
  }

  const handleDragEnter = (e, dropBoxRef) => {
    e.preventDefault()
    e.stopPropagation()
    dropBoxRef.current.style.backgroundColor = "#e7e7e7"
  }

  const handleDragLeave = (e, dropBoxRef) => {
    e.preventDefault()
    e.stopPropagation()
    dropBoxRef.current.style.backgroundColor = "white"
  }

  const handleFileChange = (e) => {
    const name = e.target.name
    const file = e.target.files[0]
    setSelectedFile({
      ...selectedFile,
      [name]: file,
    })
    const reader = new FileReader()
    reader.readAsText(file, "UTF-8")
    reader.onload = (e) => {
      // console.log(e.target.result)
      setFileContent({
        ...fileContent,
        [name]: e.target.result,
      })
    }
  }

  const onCompare = () => {
    console.log("compare")
    compareContent(fileContent.fileOne, fileContent.fileTwo)
  }

  const clearFile = (e) => {
    e.stopPropagation()
    const name = e.target.getAttribute("name")
    console.log(name)
    setSelectedFile({
      ...selectedFile,
      [name]: null,
    })
    setFileContent({
      ...fileContent,
      [name]: null,
    })
  }

  return (
    <Container>
      <Header>
        <h1>JSON Diff Checker</h1>
        <p>This is a JSON Diff Checker. It takes two JSON objects and compares</p>
      </Header>
      <Body>
        <Row colCount={2 + Number(missingKeys.totalCount > 0)}>
          <Col>
            {!selectedFile.fileOne ? (
              <FileSelector
                accept="application/JSON"
                name="fileOne"
                onChange={handleFileChange}
                ref={fileOne}
                type="file"
              />
            ) : (
              <FileNamePreview>
                {selectedFile.fileOne.name}
                <span onClick={clearFile} name="fileOne">
                  X
                </span>
              </FileNamePreview>
            )}
            <FileContentPreview show={fileContent.showOne}>
              <p
                onClick={(e) => {
                  e.stopPropagation()
                  setFileContent({
                    ...fileContent,
                    showOne: !fileContent.showOne && fileContent.fileOne,
                  })
                }}
              >
                &#709;
              </p>
              <PrettyPrintJson data={fileContent.fileOne} />
            </FileContentPreview>
          </Col>
          <Col>
            {!selectedFile.fileTwo ? (
              <FileSelector
                accept="application/JSON"
                name="fileTwo"
                onChange={handleFileChange}
                ref={fileTwo}
                type="file"
              />
            ) : (
              <FileNamePreview>
                {selectedFile.fileTwo.name}{" "}
                <span onClick={clearFile} name="fileTwo">
                  X
                </span>
              </FileNamePreview>
            )}
            <FileContentPreview show={fileContent.showTwo}>
              <p
                onClick={(e) => {
                  e.stopPropagation()
                  setFileContent({
                    ...fileContent,
                    showTwo: !fileContent.showTwo && fileContent.fileTwo,
                  })
                }}
              >
                &#709;
              </p>
              <PrettyPrintJson data={fileContent.fileTwo} />
            </FileContentPreview>
          </Col>
          {missingKeys.totalCount > 0 && (
            <Col>
              <span>
                Total <Code>{missingKeys.totalCount}</Code> keys difference
              </span>
              {missingKeys.compOne.map((key) => (
                <KeyWrapperCard key={key} keyName={key} file={selectedFile?.fileOne?.name} />
              ))}
              {missingKeys.compTwo.map((key) => (
                <KeyWrapperCard key={key} keyName={key} file={selectedFile?.fileTwo?.name} />
              ))}
            </Col>
          )}
        </Row>
        <Row colCount={2}>
          <Col>
            <Button>Clear</Button>
          </Col>
          <Col>
            <Button onClick={onCompare}>Compare</Button>
          </Col>
        </Row>
      </Body>
    </Container>
  )
}

export default JSONDiffChecker

const PrettyPrintJson = React.memo(({ data }) => (
  <pre>{typeof data === "string" ? data : JSON.stringify(data, null, 2)}</pre>
))

const KeyWrapperCard = ({ keyName, file }) => (
  <KeyWrapper>
    Extra key <Code>{keyName.replace(".", " > ")}</Code> in File <Code>{file}</Code>
  </KeyWrapper>
)
