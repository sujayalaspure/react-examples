import styled, { keyframes } from "styled-components"

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

export const ImageCarausalContainer = styled.div`
  width: 100%;
  max-height: 700px;
  height: 100vh;
  position: relative;
  background: linear-gradient(
    252deg,
    #25221e,
    #8c1105,
    #f90c71,
    #f292ed,
    #f7c0ec,
    #caefd7,
    #a8e6cf,
    #dcedc1,
    #f9efd7,
    #f7d6bf,
    #f9b1ac,
    #f98ca7
  );
  background-size: 500% 500%;
  animation: ${gradientAnimation} 30s ease infinite;
`

export const ImagesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`

export const ImageContainer = styled.div`
  border-radius: 10px;
  margin: 6px;
`

export const Image = styled.img`
  ${(props) => !props.isSelected && "width: 100px;"}
  transition: width 0.5s ease-in-out;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`

export const UploadImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`
export const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  .form {
    display: flex;
    gap: 20px;
    flex-direction: column;
  }
  border: 1px solid black;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
`

export const ImageSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media screen and (max-width: 768px) {
    width: 80vw;
  }

  span {
    font-size: 0.8rem;
    align-self: center;
    display: flex;
    align-items: center;
    &::before,
    &::after {
      content: "";
      display: block;
      background-color: #f7d6bf;
      margin: 5px;
      width: 10vw;
      height: 1px;
    }
  }
  input[type="file"] {
    border: 1px solid #555;
    border-radius: 10px;
    padding-right: 10px;
    overflow: hidden;
  }
  input[type="file"]::file-selector-button {
    margin-right: 20px;
    border: none;
    background: #f9efd7;
    padding: 10px 20px;
    color: #000;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
  }

  input[type="file"]::file-selector-button:hover {
    background: #f9efd7;
  }
`
export const UploadButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: none;
  background-color: #f9efd7;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
  &:hover {
    background-color: #f7d6bf;
  }
`
export const UploadInput = styled.input`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: #fff;
  cursor: pointer;
  font-size: 1.2rem;
`

export const SelectedImageContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
  /* width: 80vh; */
  /* aspect-ratio: 16/9; */
  img {
    height: 40vh;
    width: 100%;
    object-fit: contain;
  }
`

export const UploadLink = styled.div`
  position: absolute;
  bottom: 50%;
  top: 50%;
  right: 0;
  transform: translateX(80%);
  height: 50px;
  background-color: #f9efd7;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border-radius: 10px; */
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  padding: 20px;
  cursor: pointer;
  transition: transform 0.5s ease-in-out;
  &:hover {
    background-color: #f7d6bf;
    right: 0;
    transform: translateX(0);
  }
`
