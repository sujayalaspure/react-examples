import React, { Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { getComponents, paths } from "./Navigation/routes"
import "./styles.css"

const Home = React.lazy(() => import("./home"))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={"Loading ..."}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          {paths.map((path) => (
            <Route key={path.path} path={path.path} element={getComponents[path.path.slice(1)]} />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
