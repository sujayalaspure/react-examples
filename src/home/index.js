import React from "react";
import { useNavigate } from "react-router-dom";

import Menu from "../Components/menu";
import { paths } from "./path";
import { Container, HeaderWrapper, LeftSide, MainContent } from "./Style";

function Home() {
  let navigate = useNavigate();

  const onClick = (path) => {
    console.log(path);
    navigate(path);
  };
  return (
    <Container>
      <LeftSide>
        {paths.map((path, index) => (
          <Menu.Item label={path.Label} onClick={() => onClick(path.path)} />
        ))}
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
