import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/footer";
import Menu from "../Components/menu";
import { paths } from "./path";
import { Container, HeaderWrapper, LeftSide, MainContent, RightSide } from "./Style";

function Home() {
  let navigate = useNavigate();

  const onClick = (path) => {
    console.log(path);
    navigate(path);
  };
  return (
    <Container>
      <HeaderWrapper>
        <h1>Welcome to the Home</h1>
      </HeaderWrapper>

      <MainContent>
        <LeftSide>
          {paths.map((path, index) => (
            <Menu.Item label={path.Label} onClick={() => onClick(path.path)} />
          ))}
        </LeftSide>
        <RightSide>
          <h2>MainContent</h2>
        </RightSide>
      </MainContent>
      <Footer />
    </Container>
  );
}

export default Home;
