import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;
export const BottomView = styled.div`
  background-color: black;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

export const InnerCircle = styled.div`
  height: 92%;
  width: 92%;
  border-radius: 50%;
  border: 2px solid white;
  position: relative;
`;

export const OuterCircle = styled.div`
  background: grey;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 70%;
`;

export const Dot = styled.div`
  height: 10px;
  width: 10px;
  /* background-color: white; */
  border-radius: 50%;
  border: 1px solid white;
  /* position: absolute; */
  /* top: 0; */
  /* left: 0; */
  /* right: 0; */
  transform: translate(886px);
`;
