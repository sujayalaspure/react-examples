import React, {Suspense} from "react"
import {Route, Routes} from "react-router-dom"
import {paths} from "./Navigation/routes"
import "./styles.css"
function App() {
  return (
    <Suspense fallback={"Loading ..."}>
      <Routes>
        {paths.map((path, index) => (
          <Route key={index} path={path.path} element={path.element} />
        ))}
      </Routes>
    </Suspense>
  )
}

export default App
