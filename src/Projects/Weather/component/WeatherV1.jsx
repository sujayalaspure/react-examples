import React from "react"
import {getIcon} from "../api"
import styled from "styled-components"
import {colors} from "../style"
import withWeather from "../withWeather"
import InfoBtn from "./InfoBtn"
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function WeatherV1({weatherData, location}) {
  const date = new Date(weatherData?.current?.dt * 1000)

  return (
    <Container>
      <InfoBtn />
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
      <BottomWrapper>
        {weatherData?.daily?.slice(1, 6).map((data, idx) => (
          <ShowDayForcast key={idx} idx={idx} dayData={data} />
        ))}
      </BottomWrapper>
    </Container>
  )
}

export default withWeather(WeatherV1)

const ShowDayForcast = ({idx, dayData}) => {
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

const Container = styled.div`
  background-color: #fff;
  border: 1px dashed ${colors.background};
  border-radius: 0.5rem;
  width: 600px;

  @media (max-width: 764px) {
    width: 100%;
  }
`

const Display = styled.div`
  /* background-color: ${colors.secondary}; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${colors.background};
  /* font-size: 2rem; */
  padding: 1rem 0.5rem;
  margin-bottom: 0.5rem;
  padding-right: 3rem;
  /* text-align: right; */
  border-bottom: 1px solid ${colors.secondary};
`

const ImageWrapper = styled.div`
  height: 50px;
  width: 50px;
`

const LocationWrapper = styled.div`
  h1 {
    margin-bottom: 0.25rem;
  }
  p {
    font-size: 0.9rem;
  }
`

const TempWrapper = styled.div`
  span {
    font-size: 1.2rem;
    font-weight: 600;
  }
`

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: scroll;
  /* flex-wrap: wrap; */
  /* background-color: ${colors.secondary}; */
`

const DayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.6rem;
  /* margin: 0 0.5rem; */
  flex: 1 1 0px;
  h2 {
    margin-bottom: 4px;
  }
  p {
    font-size: 0.8rem;
    text-align: center;
  }
  &:hover {
    background-color: ${colors.secondary}22;
  }
`

const SmallIcon = styled.img`
  height: 40px;
  width: 40px;
  margin: 8px 0;
`
