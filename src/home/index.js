import React from "react";
import Menu from "../Components/menu";
import { Container, HeaderWrapper, LeftSide, MainContent } from "./Style";

function Home() {
  return (
    <Container>
      <LeftSide>
        <h2>LeftSide</h2>
        <Menu.Item label="Item no 1" />
        <Menu.Item label="Item no 1" />
        <Menu.Item label="Item no 1" />
      </LeftSide>

      <MainContent>
        <HeaderWrapper>
          <h1>Welcome to the Home</h1>
        </HeaderWrapper>
        <h2>MainContent</h2>
      </MainContent>
    </Container>
  );
}

export default Home;
