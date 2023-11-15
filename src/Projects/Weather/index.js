/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import {Wrapper} from "./style"
import WeatherV1 from "./component/WeatherV1"
import WeatherV2 from "./component/WeatherV2"
import {useSearchParams} from "react-router-dom"

function Weather() {
  // print the url
  // let widgetType = /.*\/([^?]+)/.exec(window.location.href)[1]
  let [searchParams] = useSearchParams()

  const widgetType = searchParams.get("type")

  const getWeatherWidget = () => {
    switch (widgetType) {
      case "v1":
        return <WeatherV1 />
      case "v2":
        return <WeatherV2 />
      default:
        return <WeatherV1 />
    }
  }
  return <Wrapper>{getWeatherWidget()}</Wrapper>
}

export default Weather
