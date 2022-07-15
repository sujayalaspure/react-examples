import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: max-content auto;
`;

export const LeftSide = styled.div`
  height: 100%;
  padding-top: 8px;
  min-width: 25vw;
  border-right: 1px solid var(--accent-tint);
`;

export const MainContent = styled.div`
  display: grid;
  grid-template-columns: max-content auto;
  /* height: 100%; */
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  background-color: var(--white);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

export const RightSide = styled.div`
  height: 100%;
  .main-content {
    flex: 1;
    margin: 16px;
  }
`;

export const LabelHeader = styled.div`
  background-color: aquamarine;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  h1 {
    margin: 0;
  }
  .external {
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    margin-left: 0.5rem;
    img {
      height: 40px;
      width: 40px;
    }
  }
`;
