import styled, { keyframes } from "styled-components"

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Box = styled.div`
  height: 80%;
  width: 80%;
  background-color: aliceblue;
  border-radius: 12px;
  padding: 10px;
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  -webkit-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
`

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* align-items: center; */
  justify-content: center;
`

export const InputWrapper = styled.div`
  /* width: 100%; */
  display: flex;
  flex: 1;
  align-items: center;
  padding-right: 12px;
  /* justify-content: center; */
  input {
    background: transparent;
    width: 100%;
    height: 50px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    padding: 0 10px;
    font-size: 1.5rem;
    outline: none;
    &:focus {
      border: 1px solid hsl(216, 65%, 11%);
    }
  }
`

export const FilterWrapper = styled.div`
  select {
    background-color: transparent;
    padding: 12px;
    height: 50px;
    border-radius: 5px;
  }
`

export const StateWrapper = styled.div`
  margin-top: 10px;
  transition: all 1s ease-in-out;
  overflow-y: scroll;
`

const fadeIn = keyframes`
  from {
    opacity: 0;
    visibility: hidden;
  }
  to {
    opacity: 1;
    visibility: visible;
  }
`

export const ListItem = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 0 10px;
  margin: 4px 0;
  display: flex;
  align-items: center;
  visibility: hidden;
  transition: all 1s ease-in-out;
  animation-name: ${fadeIn};
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
  animation-delay: ${(props) => props.delay * 0.05}s;
`
