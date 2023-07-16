import styled from "styled-components"

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
  h1 {
    font-size: 2rem;
  }
  p {
    color: gray;
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
    background-color: whitesmoke;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .icon {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      /* background-color: #04aa6d33; */
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
    background-color: #04aa6d;
    color: white;
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
  background-color: white;
  border-radius: 5px;
  border: 1px solid black;
  padding: 10px;
  overflow: scroll;
  &::file-selector-button {
    margin-right: 20px;
    border: none;
    padding: 10px 20px;
    color: #000;
    cursor: pointer;
  }
`

export const FileNamePreview = styled.div`
  background-color: white;
  border-radius: 5px;
  border: 1px solid black;
  padding: 10px 20px;
  min-width: 300px;
  overflow: scroll;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    cursor: pointer;
    color: red;
    background-color: #d4394322;
    padding: 10px;
    aspect-ratio: 1/1;
    border-radius: 6px;
  }
`

export const FileContentPreview = styled.div`
  border: 1px solid black;
  overflow: ${(props) => (props.show ? "scroll" : "hidden")};
  background-color: white;
  border-radius: 5px;
  border: 1px solid black;
  padding: 10px;
  min-height: 60px;
  max-height: 70vh;
  position: relative;
  height: ${(props) => (props.show ? "100%" : "50px")};
  transition: height 0.5s ease-in-out;
  p {
    position: sticky;
    display: inline-block;
    font-size: 3rem;
    text-align: center;
    top: 0;
    cursor: pointer;
    height: 40px;
    width: 40px;
    transform: ${(props) => (props.show ? "rotate(180deg)" : "rotate(0deg)")};
    transform-origin: center;
    transition: transform 0.5s ease-in-out;
    background-color: #f5f5f5;
    border-radius: 6px;
  }
  pre {
    /* display: inline-block; */
  }
`

export const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
  height: 3rem;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #f0f8ff;
  }
`

export const KeyWrapper = styled.li`
  list-style: none;
  background-color: white;
  padding: 10px;
  word-wrap: break-word;
  margin: 8px 0;
  border-bottom: 0.5px solid gray;
  margin: 0 10px;
`

export const Code = styled.code`
  background-color: #f0f8ff;
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
    color: white;
  }
`

export const MetaDataContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  hr {
    margin: 10px 0;
  }
`
