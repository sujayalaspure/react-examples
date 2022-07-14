import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
`;

export const LeftSide = styled.div`
  height: 100%;
  padding-top: 8px;
  min-width: 25vw;
  border-right: 1px solid var(--accent-tint);
  /* background-color: #f5f; */
`;

export const MainContent = styled.div`
  display: grid;
  grid-template-columns: max-content auto;
  height: 100%;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  /* background-color: var(--white); */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

export const RightSide = styled.div`
  padding: 16px;
`;
