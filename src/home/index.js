import React, { useState } from "react"
import Footer from "../Components/footer"
import Menu from "../Components/menu"
import { Container, HeaderWrapper, LabelHeader, LeftSide, MainContent, RightSide } from "./Style"

import GithubCornerIcon from "../Components/GithubCornerIcon"
import { getComponents, paths } from "../Navigation/routes"

function Home() {
  const [selectedProject, setSelectedProject] = useState({
    path: "/",
    Label: "Home",
  })

  return (
    <>
      <GithubCornerIcon />
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
            <div className="main-content">{getComponents[selectedProject.path.slice(1)]}</div>
          </RightSide>
        </MainContent>
        <Footer />
      </Container>
    </>
  )
}

export default Home
