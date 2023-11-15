import React from "react"
import styled from "styled-components"
import withWeather from "../withWeather"
import {getIcon, humidityIcon, rainChanceIcon, visibilityIcon, windDirectionIcon} from "../api"

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var mL = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
var dS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function WeatherV2({weatherData, location}) {
  const date = new Date(weatherData?.current?.dt * 1000)

  console.log({weatherData})
  console.log({location})
  return (
    <Container>
      <Square>
        <Header>
          <h1>{location?.city}</h1>
        </Header>
        <MidSection>
          <ImageWrapper>
            {weatherData?.current?.weather[0].icon && (
              <img src={getIcon(weatherData?.current?.weather[0].icon, 3)} alt="Icon" />
            )}
          </ImageWrapper>
          <Content>
            <p className="date">
              {days[date.getDay()]} | {mL[date.getMonth()]} {date.getDate()}
            </p>
            <h2 className="temp">{weatherData?.current?.temp}&#176;</h2>
            <p>{weatherData?.current?.weather[0]?.description}</p>
          </Content>
        </MidSection>
        <BottomSection>
          <Section1 weather={weatherData?.current} />
          <Section2 weatherData={weatherData} />
        </BottomSection>
      </Square>
    </Container>
  )
}

const Section1 = ({weather}) => {
  return (
    <Section1Wrapper>
      <div className="box">
        <div>
          <img className="icon" src={windDirectionIcon} alt="Wind" />
        </div>
        <div>
          <p>{weather?.wind_speed} km/h</p>
          <p className="label">Wind</p>
        </div>
      </div>
      <div className="box">
        <div>
          <img className="icon" src={rainChanceIcon} alt="Wind" />
        </div>
        <div>
          <p>{weather?.clouds} %</p>
          <p className="label">Cloudiness</p>
        </div>
      </div>
      <div className="box">
        <div>
          <img className="icon" src={visibilityIcon} alt="Wind" />
        </div>
        <div>
          <p>{weather?.visibility / 1000} km</p>
          <p className="label">Visibility</p>
        </div>
      </div>
      <div className="box">
        <div>
          <img className="icon" src={humidityIcon} alt="Wind" />
        </div>
        <div>
          <p>{weather?.humidity} %</p>
          <p className="label">Humidity</p>
        </div>
      </div>
    </Section1Wrapper>
  )
}

const Section2 = ({weatherData}) => {
  return (
    <Section2Wrapper>
      <div className="section2Con">
        {weatherData?.daily?.slice(1, 6).map((data, idx) => (
          <ShowDayForcast key={idx} idx={idx} dayData={data} />
        ))}
      </div>
    </Section2Wrapper>
  )
}

const ShowDayForcast = ({idx, dayData}) => {
  let date = new Date(dayData?.dt * 1000)

  return (
    <DayWrapper key={idx}>
      <p>
        {dS[date.getDay()]} ({date.getDate()})
      </p>
      <SmallIcon src={getIcon(dayData?.weather[0].icon)} />
      <div className="tempWrapper">
        {Object.entries(dayData?.temp).map(([day, temp]) => (
          <div>
            <p className="temp">{temp}&#176;</p>
            <span className="day">{day}</span>
          </div>
        ))}
      </div>
    </DayWrapper>
  )
}

// http://192.168.29.107:3000/weather?type=v2&l=30.4886998,79.2144462&city=Bengaluru

export default withWeather(WeatherV2)

const Container = styled.div`
  /* background-color: white; */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  overflow: hidden;
`
const Square = styled.div`
  height: 350px;
  width: 350px;
  border-radius: 10px;
  background: rgb(98, 184, 246);
  background: linear-gradient(90deg, rgba(98, 184, 246, 1) 0%, rgba(44, 121, 193, 1) 100%);
  flex-flow: column;
  overflow: hidden;
  display: flex;
  @media (max-width: 350px) {
    width: 100vw;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  h1 {
    font-size: 22px;
    color: white;
    font-weight: 500;
  }
`

const MidSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
  border-bottom: 1px solid white;
  padding: 0 10px;
  padding-bottom: 10px;
`

const ImageWrapper = styled.div`
  flex: 1 1 auto;
  img {
    height: 80%;
    width: 80%;
  }
`
const Content = styled.div`
  flex: 1 1 0;
  margin-top: 10px;
  p {
    color: white;
    font-size: clamp(18px, 22px, 6vw);
    flex-wrap: nowrap;
    white-space: nowrap;
  }
  .temp {
    margin: 6px 0;
    color: white;
    font-size: clamp(3vw, 18vw, 60px);
    font-weight: 600;
  }
`

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1 1 auto;
  overflow: scroll;
  scroll-snap-type: y mandatory;

  section {
    padding: 10px;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    min-height: 100%;
  }
`

const Section1Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  border-bottom: 1px dashed #fff7;
  .box {
    display: flex;
    align-items: center;
    .icon {
      width: 30px;
      height: 30px;
      margin: 0 0.3rem;
    }
    p {
      color: white;
    }
    .label {
      font-size: 0.8rem;
    }
  }
`

const Section2Wrapper = styled.section`
  .section2Con {
    flex: 1 1 auto;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
  }
`

const DayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.2rem;
  /* margin: 0 0.5rem; */
  flex: 1 1 0px;
  overflow: hidden;
  p,
  h2 {
    margin: 0;
    font-size: 0.8rem;
    color: white;
  }

  .tempWrapper {
    max-width: 100%;
    padding: 4px;
    display: flex;
    align-items: center;
    gap: 10px;
    scroll-snap-type: x mandatory;
    overflow: scroll;
    div {
      min-width: 100%;
      scroll-snap-align: center;
      scroll-snap-stop: always;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`

const SmallIcon = styled.img`
  height: 30px;
  width: 30px;
  margin: 4px 0;
`
