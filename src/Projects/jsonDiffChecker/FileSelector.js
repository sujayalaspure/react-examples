import React, { useRef, useState } from "react"
import PropTypes from "prop-types"
import { FileSelectorInput } from "./style"

const fileIcon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAiUlEQVR4nO3VMQ6AIAyF4f8KJg4el5HDubB4nefqgEawKWB4SbcOX2gBmOk4qqgErC0BAg5gswS8jTlClYBkNQ5VAhZgtzgJVQKwQujDDuRuR1OAPAB3+TcgALEVIFx6ojcgZJYsegHCw6ZH7x2QUU82E6A5Ajp9CVX46fwPUJrxATKq8QAzeOQEXYzcL7EJxK0AAAAASUVORK5CYII="

const linkIcon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACY0lEQVR4nO2Zz2oUQRCHv9wiRvMKYvTgQ0STrHh0UQRfwVz2pLDog+iK4DOo8RLBJILgC+jGSw4KiaDrn4mbi+BIQS0MTc9M947b3QvzQcHs0N1bv5mu3qpaaGlpmQeuAo+BIXCsJtcDoMMccAHYA/Ia29WxSbIGjBxE5GoydpXEuAz89hCRq31P6c3Inj+xOPlM39JpNbl+bhm3Q6Ii/gJ3K+bct4jZIEERPYe5W8a8h0RivYGIyUMozv1ABC4BPxuIEM4Y838RmAXgbUMRwlljDXkwQblmCdT+FOt0jDXeE5inhgPb+pZ8eRk72D8aDlyfYo17lrcqh0dQxoUvfwcs6v0bwBHwFbhVMb+nMVUU8ZoIjAsilvXebeBPwTER4ypiBKwQgf0aEWJfHEWcaNoShc0aEfL5pqOIDglQJkLuT5DTrD/PIuQA6AKvLKdTEBEbWooOtU441pjY9BCxrDGUxxBxvqI8rQtsVxGjWQd2VXn6v0TszPqILavsfEUIdzQVl3I309xJ0o6Z/2KXidjWtGPRQ0RylV3fSADnUkTPGNd1iAnZTlFY8yhPPzsEdvAaAu0djTwqu0OH00mCOjh7HiImW+sTcKDXwinjiM1iNJRzw6r6TmV0jTWCb62BpQPoy4Ild3pCYPYNB6ZJFfopdAczwwHpw/pgqyfeEIHMcGKpoYgfwEUiMJxya9lEjGOWpwPDmRcNRETvmueGPajpOyUnYsKuRcyWOrekTeWOpQOYlAjhnPabck8bp9IoKLLq+WflN+AKibJSss1ySxtTavnkWQceab6UhS5PW1paaMw/bajY23D20soAAAAASUVORK5CYII="

FileSelector.propTypes = {
  fileNumber: PropTypes.string,
  file: PropTypes.object,
  onChange: PropTypes.func,
}

function FileSelector({ fileNumber, file, onChange }) {
  const fileRef = useRef(null)
  const [inputType, setInputType] = useState("file")

  React.useEffect(() => {
    const ref = fileRef.current
    ref?.addEventListener("dragenter", handleDragEnter)
    ref?.addEventListener("dragleave", handleDragLeave)

    return () => {
      ref?.removeEventListener("dragenter", handleDragEnter)
      ref?.removeEventListener("dragleave", handleDragLeave)
    }
  }, [])

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    fileRef.current.style.backgroundColor = "#e7e7e7"
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    fileRef.current.style.backgroundColor = "white"
  }

  const onLinkClick = (e) => {
    e.stopPropagation()
    setInputType((prev) => (prev === "text" ? "file" : "text"))
  }

  const onFileAdded = (e) => {
    const { type } = e.target
    console.log(type)
    if (type === "file") {
      const {
        files: [file],
      } = e.target
      onChange({ fileNumber, fileData: file, inputFrom: "file" })
      return
    }
    if (type === "text") {
      onUrlAdded(e)
    }
  }

  function isValidJSONURL(url) {
    var regexQuery =
      "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$"
    var reg = new RegExp(regexQuery, "i")
    const res = reg.test(url)

    if (!res) return { isValid: false }

    var rx = /([^/?#]+)(?:[?#].*)?$/
    var m = url.match(rx)
    if (m) {
      console.log(url, "=>", m[1])
      return { isValid: true, fileName: m[1] }
    } else {
      console.log(url, "=> No match!")
      return { isValid: false }
    }
  }

  const onUrlAdded = (e) => {
    e.stopPropagation()
    const url = e.target.value
    console.log(url)
    const { isValid, fileName } = isValidJSONURL(url)
    if (!isValid) {
      console.log("Invalid url")
      onChange({ fileNumber, fileData: null, inputFrom: "link" })
      return
    }
    if (url)
      fetch(url)
        .then((res) => {
          console.log(res)
          return res.text()
        })
        .then((data) => {
          // console.log(data)
          onChange({ fileNumber, fileData: { data, name: fileName }, inputFrom: "link", url })
        })
        .catch((err) => console.log(err))
  }

  return (
    <>
      {!file ? (
        <FileSelectorInput type={inputType}>
          <input
            accept="application/JSON"
            name={fileNumber}
            onChange={onFileAdded}
            ref={fileRef}
            type={inputType}
            placeholder="Add Link Here"
          />
          <span>or</span>
          <div className="link-button" onClick={onLinkClick}>
            <img height={"23px"} alt="link icon" src={inputType === "text" ? fileIcon : linkIcon} />
          </div>
        </FileSelectorInput>
      ) : null}
    </>
  )
}

export default FileSelector
