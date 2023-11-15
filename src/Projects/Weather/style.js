import styled from "styled-components"

export const colors = {
  background: "#023047",
  secondary: "#8ecae6",
  text: "#bde0fe",
}

export const Wrapper = styled.div`
  /* background-color: #fff; */
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  overflow: scroll;
  gap: 1rem;
  /* min-width: 300px; */
  width: 100vw;
`

export const BoxWrapper = styled.div`
  background-color: #fff;
  border: 1px dashed ${colors.background};
  min-height: 100px;
  min-width: calc(600px - 2rem);
  /* width: 100%; */
  width: 600px;
  border-radius: 0.5rem;
  overflow: hidden;
  padding: 0.5rem;
  position: relative;
`
