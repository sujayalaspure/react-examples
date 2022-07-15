import styled from "styled-components";

export const Container = styled.div`
  /* width: 100vw; */
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: aqua; */
`;

export const Heading = styled.div`
  margin-bottom: 20px;
  text-align: center;
  h1 {
    font-size: 2rem;
  }
  a {
    color: hsl(216, 65%, 11%);
    text-decoration: underline;
  }
`;

export const Wrapper = styled.div`
  /* border: 1px solid rgba(0, 0, 0, 0.5); */
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Square = styled.div`
  height: 70px;
  width: 70px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(_) => (!_.index ? "#fff" : "#000")};
  background-color: ${(_) => (_.canKill ? "#0000a1aa" : _.index ? "#fff" : "#000d")};
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: cyan;
    color: #000;
  }
`;

export const Row = styled.div``;
