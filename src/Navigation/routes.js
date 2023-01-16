import React from "react"

const FalconUI = React.lazy(() => import("../Projects/Falcon9UI"))
const FolderStructure = React.lazy(() => import("../Projects/folder-structure"))
const Holidays = React.lazy(() => import("../Projects/Holidays"))
const Calculator = React.lazy(() => import("../Projects/Calculator"))
const CarParking = React.lazy(() => import("../Projects/CarParking"))
const Weather = React.lazy(() => import("../Projects/Weather"))
const Chessboard = React.lazy(() => import("../Projects/chessboard"))
const NestedComments = React.lazy(() => import("../Projects/nested-comments"))
const Typeahead = React.lazy(() => import("../Projects/Typeahead"))

export const getComponents = {
  calculator: <Calculator />,
  parking: <CarParking />,
  weather: <Weather />,
  chessboard: <Chessboard />,
  "nested-comments": <NestedComments />,
  typeahead: <Typeahead />,
  folder: <FolderStructure />,
  falcon: <FalconUI />,
  holidays: <Holidays />,
}
export const paths = [
  {
    path: "/calculator",
    Label: "Calculator",
    showHome: true,
  },
  {
    path: "/parking",
    Label: "Parking System",
    showHome: true,
  },
  {
    path: "/weather",
    Label: "Weather Widget",
    showHome: true,
  },
  {
    path: "/chessboard",
    Label: "Bishop's Chessboard",
    showHome: true,
  },
  {
    path: "/nested-comments",
    Label: "Nested Comments Demo",
    showHome: true,
  },
  {
    path: "/holidays",
    Label: "Current Year Holidays",
    showHome: true,
  },
  {
    path: "/typeahead",
    Label: "Typeahead",
    showHome: false,
  },
]