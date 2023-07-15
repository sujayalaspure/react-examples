import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`
export const Header = styled.div`
  font-size: 2rem;
  margin: 20px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  h1 {
    font-size: 2rem;
  }
  p {
    color: gray;
  }
`
export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100vw;
  /* height: 100%; */
  /* background-color: aqua; */
`
export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.colCount - 1}, 1fr) max-content;
  /* grid-template-columns: 1fr 1fr max-content; */
  gap: 20px;
  margin: 0px 20px;
  /* background-color: red; */
`

export const Col = styled.div`
  max-height: 80vh;
  display: grid;
  grid-template-rows: max-content 1fr;
  flex-direction: column;
  gap: 10px;
  overflow: scroll;
  /* background-color: yellow; */
`

export const FileSelector = styled.input`
  background-color: white;
  border-radius: 5px;
  border: 1px solid black;
  padding: 10px;
  /* flex: 1; */
  min-width: 20vw;
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
  min-width: 30vw;
  overflow: scroll;
  display: flex;
  align-items: center;
  display: flex;
  justify-content: space-between;
  span {
    cursor: pointer;
    color: red;
    background-color: #d4394322;
    padding: 10px;
    aspect-ratio: 1/1;
    border-radius: 6px;
  }
  /* justify-content: center; */
`

export const FileContentPreview = styled.div`
  background-color: white;
  border-radius: 5px;
  border: 1px solid black;
  padding: 10px;
  overflow: ${(props) => (props.show ? "scroll" : "hidden")};
  position: relative;
  min-height: 60px;
  height: ${(props) => (props.show ? "100%" : "50px")};
  transition: height 0.5s ease-in-out;
  p {
    position: sticky;
    display: inline-block;
    font-size: 3rem;
    text-align: center;
    top: 0;
    /* bottom: 0; */
    /* left: 96%; */
    cursor: pointer;
    height: 40px;
    width: 40px;
    transform: ${(props) => (props.show ? "rotate(180deg)" : "rotate(0deg)")};
    transform-origin: center;
    transition: transform 0.5s ease-in-out;
    background-color: #d4394322;
    border-radius: 6px;
  }
`

export const Button = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
  min-height: 3rem;
  width: 100%;
`

export const KeyWrapper = styled.div`
  background-color: white;
  border-radius: 5px;
  border: 1px solid black;
  padding: 10px;
  word-wrap: break-word;
  max-width: 18vw;
`

export const Code = styled.code`
  background-color: #f0f8ff;
  line-height: 1.5;
  padding: 0 4px;
  border-radius: 4px;
`
