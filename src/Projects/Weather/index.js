import React, { useEffect, useState } from "react"
import { getIcon, getOneCallUrl } from "./api"
import {
  BoxWrapper,
  BottomWrapper,
  Display,
  LocationWrapper,
  ImageWrapper,
  Wrapper,
  TempWrapper,
  DayWrapper,
  SmallIcon,
  InfoWrapper,
} from "./style"
import { useSearchParams } from "react-router-dom"
import { isEmpty } from "lodash"

var days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]

function Weather() {
  let [searchParams, setSearchParams] = useSearchParams()
  const [location, setLocation] = useState()
  const [weatherData, setWeatherData] = useState()
  const [showInfo, setShowInfo] = useState(false)

  // lat=30.7352&lon=79.0669&loc=Kedarnath
  // ?lat=25.31764&lon=82.97391&loc=Banaras
  const getSearchParams = () => {
    console.log([...searchParams].length, isEmpty(searchParams))
    let loc = { lat: "19.0760", lon: "72.8777", loc: "Mumbai" }
    if ([...searchParams].length === 0) {
      setSearchParams({ lat: "19.0760", lon: "72.8777", loc: "Mumbai" })
    }
    try {
      searchParams.forEach((value, key) => {
        loc[key] = value
        console.log(key, value)
      })

      setLocation(loc)
      fetch(getOneCallUrl(loc))
        .then((res) => res.json())
        .then((data) => {
          setWeatherData(data)
        })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getSearchParams()
  }, [])

  const date = new Date(weatherData?.current?.dt * 1000)

  return (
    <Wrapper>
      <BoxWrapper>
        <InfoWrapper>
          <img
            onClick={() => setShowInfo((prev) => !prev)}
            src="https://img.icons8.com/material-outlined/24/000000/info--v1.png"
            alt="Show Info"
          />
          {showInfo && Info()}
        </InfoWrapper>
        <Display>
          <LocationWrapper>
            <h1>{location?.loc}</h1>
            <p>{date.toDateString()}</p>
          </LocationWrapper>
          <ImageWrapper>
            <img src={getIcon(weatherData?.current?.weather[0].icon)} alt="Icon" />
          </ImageWrapper>
          <TempWrapper>
            <span>{weatherData?.current?.temp}&#176;C</span>
            <p>{weatherData?.current?.weather[0]?.description}</p>
          </TempWrapper>
        </Display>
        <BottomWrapper>{weatherData?.daily?.slice(0, 5).map((data, idx) => ShowDayForcast(idx, data))}</BottomWrapper>
      </BoxWrapper>
    </Wrapper>
  )
}

export default Weather

const ShowDayForcast = (idx, dayData) => {
  let date = new Date(dayData?.dt * 1000)
  // date = date.getDate();
  return (
    <DayWrapper key={idx}>
      <p>
        {days[date.getDay()]} ({date.getDate()})
      </p>
      <SmallIcon src={getIcon(dayData?.weather[0].icon)} />
      <h2>{dayData?.temp?.day}&#176;C</h2>
      <p>{dayData?.weather[0].description}</p>
    </DayWrapper>
  )
}

const Info = () => {
  return (
    <div>
      <span>
        Please enter the <b>lattitude</b> and <b>longitude</b> of the city you want to get the weather in the url param.
      </span>
      <p>
        ex: <span>weather?lat=19.0760&lon=72.8777&loc=mumbai</span>
      </p>
    </div>
  )
}
