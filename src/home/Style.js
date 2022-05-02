import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: max-content auto;
  height: 100vh;
`;

export const LeftSide = styled.div`
  min-width: 25vw;
  background-color: #f5f;
`;

export const MainContent = styled.div``;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  background-color: var(--white);
`;
