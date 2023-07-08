import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storageDB } from "./firebase"
import { useState } from "react"

export function useStorage() {
  const [uploadState, setUploadState] = useState({
    isUploading: false,
    progress: 0,
    error: "",
    downloadUrl: "",
  })

  const uploadError = (err) => {
    console.log(err)
    setUploadState({
      ...uploadState,
      isUploading: false,
      error: err,
      percent: 0,
    })
  }
  const uploadSuccess = (uploadTask, callback) => {
    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
      console.log(url)
      if (callback) callback(url)
      setUploadState({
        ...uploadState,
        isUploading: false,
        downloadUrl: url,
        percent: 0,
        error: "",
      })
    })
  }
  const uploadInProgress = (snapshot) => {
    const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)

    console.log(percent)
    setUploadState({
      ...uploadState,
      isUploading: true,
      progress: percent,
    })
  }

  const handleUpload = async (file, callback) => {
    // console.log("handleUpload", file)
    if (!file) return
    const storageRef = ref(storageDB, `/${process.env.REACT_APP_BUCKET_ID}/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on("state_changed", uploadInProgress, uploadError, () => uploadSuccess(uploadTask, callback))
  }
  return {
    handleUpload,
    uploadState,
  }
}

export default useStorage
