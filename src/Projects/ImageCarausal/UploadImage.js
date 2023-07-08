import React, { useState } from "react"
import {
  FormWrapper,
  ImageSelector,
  SelectedImageContainer,
  UploadButton,
  UploadImageContainer,
  UploadInput,
} from "./style"
import { useCollection, useStorage } from "../../firebase"
// import useStorage from "../../firebase/useStorage"

function UploadImage() {
  const [data, setData] = useState({
    url: "",
    description: "",
    fromLink: true,
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

  const onUploadClick = async () => {
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
          </SelectedImageContainer>
        )}
        <div className="form">
          <ImageSelector>
            <input onChange={onFileUpload} type="file" accept="image/*" />
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
            name="description"
            placeholder="Add description"
            onChange={onInputChange}
          />
          <UploadInput
            type="password"
            placeholder="Type password to upload"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <UploadButton
            disabled={
              password !== process.env.REACT_APP_password || !(data.url && data.description) || uploadState.isUploading
            }
            onClick={onUploadClick}
          >
            {uploadState.isUploading ? `Uploading: ${uploadState.progress}%` : "Upload"}
          </UploadButton>
        </div>
      </FormWrapper>
    </UploadImageContainer>
  )
}

export default UploadImage
