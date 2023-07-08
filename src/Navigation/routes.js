import React from "react"

const Home = React.lazy(() => import("../home"))
const FalconUI = React.lazy(() => import("../Projects/Falcon9UI"))
const FolderStructure = React.lazy(() => import("../Projects/folder-structure"))
const Holidays = React.lazy(() => import("../Projects/Holidays"))
const Calculator = React.lazy(() => import("../Projects/Calculator"))
const CarParking = React.lazy(() => import("../Projects/CarParking"))
const Weather = React.lazy(() => import("../Projects/Weather"))
const Chessboard = React.lazy(() => import("../Projects/chessboard"))
const NestedComments = React.lazy(() => import("../Projects/nested-comments"))
const Typeahead = React.lazy(() => import("../Projects/Typeahead"))
const MapOfIndia = React.lazy(() => import("../Projects/mapofindia"))
const DependantSearch = React.lazy(() => import("../Projects/DependantSearch"))
const ImageCarausal = React.lazy(() => import("../Projects/ImageCarausal"))
const UploadImage = React.lazy(() => import("../Projects/ImageCarausal/UploadImage"))

export const getComponents = {
  home: <Home />,
  calculator: <Calculator />,
  parking: <CarParking />,
  weather: <Weather />,
  chessboard: <Chessboard />,
  "nested-comments": <NestedComments />,
  typeahead: <Typeahead />,
  folder: <FolderStructure />,
  falcon: <FalconUI />,
  holidays: <Holidays />,
  mapofindia: <MapOfIndia />,
  dependantsearch: <DependantSearch />,
  imagecarausal: <ImageCarausal />,
  uploadimage: <UploadImage />,
}

export const paths = [
  {
    path: "/",
    Label: "Home",
    element: getComponents["home"],
    showHome: false,
  },
  {
    path: "/calculator",
    Label: "Calculator",
    element: getComponents["calculator"],
    showHome: true,
  },
  {
    path: "/parking",
    Label: "Parking System",
    element: getComponents["parking"],
    showHome: true,
  },
  {
    path: "/weather",
    Label: "Weather Widget",
    element: getComponents["weather"],
    showHome: true,
  },
  {
    path: "/chessboard",
    Label: "Bishop's Chessboard",
    element: getComponents["chessboard"],
    showHome: true,
  },
  {
    path: "/nested-comments",
    Label: "Nested Comments Demo",
    element: getComponents["nested-comments"],
    showHome: true,
  },
  {
    path: "/holidays",
    Label: "Current Year Holidays",
    element: getComponents["holidays"],
    showHome: true,
  },
  {
    path: "/typeahead",
    Label: "Typeahead",
    element: getComponents["typeahead"],
    showHome: false,
  },
  {
    path: "/mapofindia",
    Label: "Map Of India",
    element: getComponents["mapofindia"],
    showHome: false,
  },
  {
    path: "/falcon",
    Label: "Falcons UI",
    element: getComponents["falcon"],
    showHome: false,
  },
  {
    path: "/dependantsearch",
    Label: "Dependant Search UI",
    element: getComponents["dependantsearch"],
    showHome: false,
  },
  {
    path: "/imagecarausal",
    Label: "Image Carausal",
    element: getComponents["imagecarausal"],
    showHome: false,
  },
  {
    path: "/imagecarausal/uploadimage",
    Label: "Upload Image",
    element: getComponents["uploadimage"],
    showHome: false,
  },
]
