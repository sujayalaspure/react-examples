/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getIcon, getOneCallUrl } from "./api";
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
} from "./style";
import data from "./data.json";
import { useSearchParams } from "react-router-dom";

var days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

function Weather() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [location, setLocation] = useState({ lat: "19.0760", lon: "72.8777", loc: "Mumbai" });
  const [weatherData, setWeatherData] = useState(data);
  const [showInfo, setShowInfo] = useState(true);
  // setSearchParams({ lat: "19.0760", lon: "72.8777", loc: "Mumbai" });

  // lat=30.7352&lon=79.0669&loc=Kedarnath
  useEffect(() => {
    let loc = { lat: "19.0760", lon: "72.8777", loc: "Mumbai" };
    setSearchParams({ lat: "19.0760", lon: "72.8777", loc: "Mumbai" });
    searchParams.forEach((value, key) => {
      loc[key] = value;
    });
    if (loc.lat !== "19.0760" && loc.lon !== "72.8777") {
      setShowInfo(false);
      // setSearchParams(loc);
    }
    setLocation(loc);
    try {
      fetch(getOneCallUrl(loc))
        .then((res) => res.json())
        .then((data) => {
          setWeatherData(data);
        });
    } catch (error) {
      console.log(error);
    }

    return () => {};
  }, []);

  const date = new Date(weatherData.current.dt * 1000);

  return (
    <Wrapper>
      <BoxWrapper>
        <InfoWrapper onClick={() => setShowInfo((prev) => !prev)}>
          <img src="https://img.icons8.com/material-outlined/24/undefined/info--v1.png" alt="Info" />
          {showInfo && Info()}
        </InfoWrapper>
        <Display>
          <LocationWrapper>
            <h1>{location.loc}</h1>
            <p>{date.toDateString()}</p>
          </LocationWrapper>
          <ImageWrapper>
            <img src={getIcon(weatherData.current.weather[0].icon)} alt="Icon" />
          </ImageWrapper>
          <TempWrapper>
            <span>{weatherData.current.temp}&#176;C</span>
            <p>{weatherData.current.weather[0].description}</p>
          </TempWrapper>
        </Display>
        <BottomWrapper>{weatherData.daily.slice(0, 5).map((data, idx) => ShowDayForcast(idx, data))}</BottomWrapper>
      </BoxWrapper>
    </Wrapper>
  );
}

export default Weather;

const ShowDayForcast = (idx, dayData) => {
  return (
    <DayWrapper key={idx}>
      <p>{days[new Date(dayData.dt * 1000).getDay()]}</p>
      <SmallIcon src={getIcon(dayData.weather[0].icon)} />
      <h2>{dayData.temp.day}&#176;C</h2>
      <p>{dayData.weather[0].description}</p>
    </DayWrapper>
  );
};

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
  );
};
