/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react"
import { Image, ImageCarausalContainer, ImageContainer, ImagesWrapper, UploadLink } from "./style"
import { useCollection } from "../../firebase"
import useWindowDimensions from "../../utils/useWindowDimensions"
import { Link, Outlet, useSearchParams } from "react-router-dom"

function ImageCarausal() {
  const [selectedImage, setSetselectedImage] = useState(0)
  let containerRef = useRef(null)
  const { width } = useWindowDimensions()
  const { data, isLoading, getDocuments, queryDocuments, error } = useCollection(process.env.REACT_APP_BUCKET_ID)
  let [searchParams] = useSearchParams()

  useEffect(() => {
    const searchQ = searchParams.get("q")
    if (searchQ) {
      queryDocuments(searchParams.get("q"), "searchArray")
    } else {
      getDocuments()
    }
  }, [])

  const onImageClick = (e, index) => {
    e.stopPropagation()
    setSetselectedImage(index)
    containerRef.current.scrollTo({
      left: index * e.target.clientWidth,
      behavior: "smooth",
    })
  }

  return (
    <>
      <Outlet />
      <ImageCarausalContainer>
        {isLoading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        <ImagesWrapper ref={containerRef}>
          {data.map((image, index) => (
            <ImageContainer
              onClick={(e) => onImageClick(e, index, image)}
              key={index}
              isSelected={index === selectedImage}
            >
              <Image
                key={index}
                width={width * 0.5}
                isSelected={index === selectedImage}
                src={image.url}
                alt={image.name}
                loading="lazy"
              />
            </ImageContainer>
          ))}
        </ImagesWrapper>
        <UploadLink>
          <Link to="/imagecarausal/uploadimage">Upload image</Link>
        </UploadLink>
      </ImageCarausalContainer>
    </>
  )
}

export default ImageCarausal
