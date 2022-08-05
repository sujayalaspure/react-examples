import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Box = styled.div`
  height: 80%;
  width: 80%;
  background-color: aliceblue;
  display: flex;
  align-items: center;
  flex-direction: column;
  /* border: 1px solid rgba(0, 0, 0, 0.5); */
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    background: transparent;
    width: 70%;
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
`;

export const StateWrapper = styled.div`
  width: 70%;
  margin-top: 10px;
  transition: all 1s ease-in-out;
  overflow-y: scroll;
  /* background-color: aqua; */
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    visibility: visible;
    opacity: 1;
  }
`;

export const State = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 0 10px;
  margin: 4px 0;
  display: flex;
  align-items: center;
  transition: all 1s ease-in-out;
  animation-name: ${fadeIn};
  animation-duration: 0.5s;
`;
