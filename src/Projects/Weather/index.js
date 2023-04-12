/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { getIcon, getLocationByIP, getWeatherData } from "./api"
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

var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function Weather() {
  let [searchParams, setSearchParams] = useSearchParams()
  const [location, setLocation] = useState(null)
  const [weatherData, setWeatherData] = useState()
  const [showInfo, setShowInfo] = useState(false)

  const getSearchParams = async () => {
    console.log(searchParams.toString(), isEmpty(searchParams))
    let loc = {}
    if ([...searchParams].length === 0) {
      const { latitude: lat, longitude: lon, city } = await getLocationByIP()
      setSearchParams({ lat, lon, city })
      setLocation({ lat, lon, city })
    } else {
      searchParams.forEach((value, key) => {
        loc[key] = value
      })
      setLocation(loc)
    }
  }

  const getWeatherDataFromAPI = async () => {
    const { lat, lon } = location
    const data = await getWeatherData(lat, lon)
    setWeatherData(data)
  }

  useEffect(() => {
    if (location) getWeatherDataFromAPI()
  }, [location])

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
            <h1>{location?.city}</h1>
            <p>{date.toDateString()}</p>
          </LocationWrapper>
          <ImageWrapper>
            {weatherData?.current?.weather[0].icon && (
              <img src={getIcon(weatherData?.current?.weather[0].icon)} alt="Icon" />
            )}
          </ImageWrapper>
          <TempWrapper>
            <span>{weatherData?.current?.temp}&#176;C</span>
            <p>{weatherData?.current?.weather[0]?.description}</p>
          </TempWrapper>
        </Display>
        <BottomWrapper>{weatherData?.daily?.slice(1, 6).map((data, idx) => ShowDayForcast(idx, data))}</BottomWrapper>
      </BoxWrapper>
    </Wrapper>
  )
}

export default Weather

const ShowDayForcast = (idx, dayData) => {
  let date = new Date(dayData?.dt * 1000)

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
        ex: <span>weather?lat=19.0760&lon=72.8777&city=mumbai</span>
      </p>
    </div>
  )
}
