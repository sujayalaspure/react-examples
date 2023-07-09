import React, { useState } from "react"
import {
  FormWrapper,
  ImageSelector,
  SelectedImageContainer,
  UploadButton,
  UploadImageContainer,
  UploadInput,
  UploadLink,
} from "./style"
import { useCollection, useStorage } from "../../firebase"
import { Link } from "react-router-dom"
// import useStorage from "../../firebase/useStorage"

function UploadImage() {
  const fileInputRef = React.useRef(null)
  const [data, setData] = useState({
    url: "",
    description: "",
    fromLink: true,
    file: null,
  })
  const [showImage, setShowImage] = useState(false)
  const [displayMsg, setDisplayMsg] = useState("")
  const [password, setPassword] = useState("")

  const { addDocument } = useCollection(process.env.REACT_APP_BUCKET_ID)
  const { handleUpload, uploadState } = useStorage()

  const onInputChange = (e) => {
    const { name, value } = e.target
    if (name === "url") {
      setData({ ...data, fromLink: true })
      setShowImage(true)
    }
    setData({
      ...data,
      [name]: value,
    })
  }

  const onUploadClick = async (e) => {
    e.preventDefault()
    if (data.fromLink) {
      const success = await addDocument({
        description: data.description,
        url: uploadState.downloadUrl || data.url,
        searchArray: data.description.toLowerCase().split(" "),
      })
      if (success) {
        setData({
          url: "",
          description: "",
          fromLink: true,
        })
        setShowImage(false)
        setDisplayMsg("Image uploaded successfully")
      }
    } else {
      handleUpload(data.file, async (url) => {
        const success = await addDocument({
          description: data.description,
          url: url,
          searchArray: data.description.toLowerCase().split(" "),
        })
        if (success) {
          setData({
            url: "",
            description: "",
            fromLink: true,
          })
          fileInputRef.current.value = ""
          setShowImage(false)
          setDisplayMsg("Image uploaded successfully")
        }
      })
    }
  }

  const onUrlBlur = () => {
    setShowImage(true)
    setDisplayMsg("")
  }

  const onFileUpload = (e) => {
    const file = e.target.files[0]
    console.log(file)
    if (!file) {
      setData({
        ...data,
        url: "",
        fromLink: true,
      })
      return
    }
    const reader = new FileReader()
    console.log(reader)
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      // handleUpload(file)
      setData({
        ...data,
        url: reader.result,
        file,
        fromLink: false,
      })
      setShowImage(true)
      setDisplayMsg("")
    }
  }

  return (
    <UploadImageContainer>
      <FormWrapper>
        {displayMsg && <div className="error">{displayMsg}</div>}
        {showImage && data.url && (
          <SelectedImageContainer>
            <img
              onLoad={() => {
                setDisplayMsg("")
              }}
              onError={() => {
                setDisplayMsg("Image not found")
                setShowImage(false)
              }}
              src={data.url}
              alt={data.description}
            />
            <span
              onClick={() => {
                fileInputRef.current.value = ""
                setData({
                  ...data,
                  url: "",
                  fromLink: true,
                  file: null,
                })
              }}
            >
              x
            </span>
          </SelectedImageContainer>
        )}
        <form className="form" onSubmit={onUploadClick}>
          <ImageSelector>
            <input ref={fileInputRef} onChange={onFileUpload} type="file" accept="image/*" />
            {data.fromLink && (
              <>
                <span>or</span>
                <UploadInput
                  value={data.url}
                  name="url"
                  placeholder="Add url"
                  onChange={onInputChange}
                  onBlur={onUrlBlur}
                />
              </>
            )}
          </ImageSelector>
          <UploadInput
            value={data.description}
            autoComplete="none"
            name="description"
            placeholder="Add description"
            onChange={onInputChange}
          />
          <UploadInput
            autoComplete="current-password"
            type="password"
            placeholder="Type password to upload"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <UploadButton
            type="submit"
            disabled={
              password !== process.env.REACT_APP_password || !(data.url && data.description) || uploadState.isUploading
            }
            onClick={onUploadClick}
          >
            {uploadState.isUploading ? `Uploading: ${uploadState.progress}%` : "Upload"}
          </UploadButton>
        </form>
      </FormWrapper>
      <UploadLink>
        <Link to="/imagecarausal">Show galary</Link>
      </UploadLink>
    </UploadImageContainer>
  )
}

export default UploadImage
