import styled from "styled-components"
import { theme } from "./theme"

export const Container = styled.div`
  height: 100vh;
  padding: 0 20px;
`
export const Header = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  color: ${theme.COLOR.syntaxBlue};
  h1 {
    font-size: 2rem;
    color: inherit;
  }
  p {
    color: inherit;
    opacity: 0.5;
  }
`
export const Body = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  max-height: inherit;
`

export const FileContentContainer = styled.div`
  max-width: 70%;
  display: flex;
  flex-direction: column;
  .main {
    display: flex;
    gap: 20px;
    flex-direction: row;
    @media screen and (max-width: 1000px) {
      flex-direction: column;
    }
  }
  .fileViewColumn {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: calc(50% - 10px);
    @media screen and (max-width: 1000px) {
      width: 100%;
    }
  }
`

export const RightSideBar = styled.div`
  flex: 0 1 max(28%, 300px);
  height: 85vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: flex 0.5s ease-in-out;
  @media screen and (max-width: 1000px) {
    flex: 1 1 auto;
    height: auto;
  }
`

export const DIFFKeysCardsContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: 100%;
  border: 1px solid black;
  border-radius: 10px;
`

export const FileKeysDiffContainer = styled.div`
  .fileTitle {
    position: sticky;
    top: 0;
    background-color: ${theme.COLOR.background};
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .icon {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      aspect-ratio: 1/1;
      font-size: 1.5rem;
      height: 20px;
      width: 20px;
    }
  }
  .loadMore {
    display: block;
    width: 100%;
    border: none;
    background-color: ${theme.COLOR.green};
    color: ${theme.COLOR.white};
    padding: 8px 28px;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
  }
  .contentList {
    display: ${(props) => (props.isVisible ? "block" : "none")};
    transition: display 0.5s ease-in-out;
  }
`

export const FooterButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex: 0 1 auto;
  justify-content: flex-end;
  margin-bottom: 20px;
`

export const FileSelectorInput = styled.input`
  background-color: ${theme.COLOR.white};
  border-radius: 5px;
  border: 1px solid black;
  padding: 10px;
  overflow: scroll;
  &::file-selector-button {
    margin-right: 20px;
    border: none;
    padding: 10px 20px;
    color: ${theme.COLOR.black};
    cursor: pointer;
  }
`

export const FileNamePreview = styled.div`
  background-color: ${theme.COLOR.diffBackground};
  border-radius: 5px;
  border: 1px solid ${theme.COLOR.black};
  padding: 10px 20px;
  min-width: 300px;
  overflow: scroll;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    cursor: pointer;
    color: ${theme.COLOR.syntaxRed};
    background-color: ${theme.COLOR.syntaxBackgroundRed};
    padding: 10px;
    aspect-ratio: 1/1;
    border-radius: 6px;
  }
`

export const FilePreviewContainer = styled.div`
  border-radius: 5px;
  border: 1px solid black;
  overflow: hidden;
  height: ${(props) => (props.show ? "100%" : "50px")};
  transition: height 0.5s ease-in-out;
  .fileTitle {
    position: sticky;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    background-color: ${theme.COLOR.diffBackground}22;
    padding: 10px;
    height: 50px;
    backdrop-filter: blur(5px);
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
  }
  .hideButton {
    cursor: pointer;
    margin-top: 5px;
    margin-right: 20px;
  }
  .clearButton {
    cursor: pointer;
    color: ${theme.COLOR.syntaxRed};
    background-color: ${theme.COLOR.syntaxBackgroundRed};
    padding: 10px;
    aspect-ratio: 1/1;
    border-radius: 6px;
    margin-left: auto;
  }
`

export const FileContentPreview = styled.div`
  background-color: ${theme.COLOR.diffBackground};
  overflow: ${(props) => (props.show ? "scroll" : "hidden")};
  padding: 50px 10px 0;
  min-height: 60px;
  max-height: 70vh;
  margin-top: -50px;
`

export const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: ${theme.COLOR.white};
  cursor: pointer;
  height: 3rem;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${theme.COLOR.syntaxCodeBackground};
  }
`

export const KeyWrapper = styled.li`
  list-style: none;
  background-color: ${theme.COLOR.white};
  padding: 10px;
  word-wrap: break-word;
  border-bottom: 0.5px solid ${theme.COLOR.borderColor};
  &:hover {
    background-color: ${theme.COLOR.diffBackground};
  }
`

export const Code = styled.code`
  background-color: ${theme.COLOR.syntaxCodeBackground};
  line-height: 1.5;
  padding: 0 4px;
  border-radius: 4px;
`
export const ToastWrapper = styled.div`
  position: fixed;
  bottom: 10%;
  left: 50%;
  z-index: 100;
  background-color: #242124;
  padding: 10px;
  border-radius: 10px;
  transform: translateY(${(props) => (props.showToast ? "0" : "100vh")});
  transition: transform 0.5s ease-in-out;
  p {
    color: ${theme.COLOR.white};
  }
`

export const MetaDataContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  background-color: ${theme.COLOR.diffBackground};
  hr {
    margin: 10px 0;
  }
`
