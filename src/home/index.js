import React, { useState } from "react"
import Footer from "../Components/footer"
import Menu from "../Components/menu"
import { Container, HeaderWrapper, LabelHeader, LeftSide, MainContent, RightSide } from "./Style"

import GithubCornerIcon from "../Components/GithubCornerIcon"
import { getComponents, paths } from "../Navigation/routes"
import { useSearchParams } from "react-router-dom"

function Home() {
  let [searchParams] = useSearchParams()
  const testValue = [...searchParams]?.some((i) => i[0] === "test")
  console.log(testValue)

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
            {paths
              .filter((i) => i.showHome || testValue)
              .map((path, index) => (
                <Menu.Item key={index} path={path.path} label={path.Label} onClick={() => setSelectedProject(path)} />
              ))}
          </LeftSide>
          <RightSide>
            <LabelHeader>
              <h1>{selectedProject.Label}</h1>
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
