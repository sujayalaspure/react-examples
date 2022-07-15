import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Footer from "../Components/footer";
import Menu from "../Components/menu";
import { paths } from "./path";
import { Container, HeaderWrapper, LabelHeader, LeftSide, MainContent, RightSide } from "./Style";

import Calculator from "../Projects/Calculator";
import CarParking from "../Projects/CarParking";
import Weather from "../Projects/Weather";
import Chessboard from "../Projects/chessboard";
import NestedComments from "../Projects/nested-comments";

function Home() {
  // let navigate = useNavigate();

  const [selectedProject, setSelectedProject] = useState({
    path: "/",
    Label: "Home",
  });

  // const onClick = (path) => {
  //   navigate(path);
  // };
  return (
    <Container>
      <HeaderWrapper>{/* <h1>Welcome to the Home</h1> */}</HeaderWrapper>

      <MainContent>
        <LeftSide>
          {paths.map((path, index) => (
            <Menu.Item key={index} label={path.Label} onClick={() => setSelectedProject(path)} />
          ))}
        </LeftSide>
        <RightSide>
          <LabelHeader>
            <h1>{selectedProject.Label}</h1>
            {/* <div className="external">
              <img src="https://img.icons8.com/cute-clipart/64/000000/external-link.png" />
            </div> */}
          </LabelHeader>
          <div className="main-content">{getContent(selectedProject.path)}</div>
        </RightSide>
      </MainContent>
      <Footer />
    </Container>
  );
}

const getContent = (path) => {
  switch (path) {
    case "/calculator":
      return <Calculator />;
    case "/parking":
      return <CarParking />;
    case "/weather":
      return <Weather />;
    case "/chessboard":
      return <Chessboard />;
    case "/nested-comments":
      return <NestedComments />;
    default:
      return <div />;
  }
};

export default Home;
