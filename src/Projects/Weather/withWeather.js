import React, {useCallback, useEffect, useState} from "react"
import {useSearchParams} from "react-router-dom"
import {getLocationByIP, getWeatherData} from "./api"

function withWeather(WrappedComponent) {
  const WithWeather = (props) => {
    let [searchParams, setSearchParams] = useSearchParams()
    const [location, setLocation] = useState(null)
    const [weatherData, setWeatherData] = useState()

    const getSearchParams = async () => {
      let loc = {}
      console.log(searchParams.toString(), decodeURIComponent(searchParams.toString()))
      if (searchParams.get("l")) {
        const [lat, lon] = searchParams.get("l").split(",")
        const city = searchParams.get("city")
        loc = {lat, lon}
        setLocation((prev) => ({...prev, ...loc, city}))
      } else if (searchParams.get("lat") && searchParams.get("lon")) {
        searchParams.forEach((value, key) => {
          loc[key] = value
        })
        setLocation(loc)
      } else {
        const {latitude: lat, longitude: lon, city} = await getLocationByIP()
        const l = `${lat},${lon}`
        console.log("location", {lat, lon, city, l})
        searchParams.set("l", l)
        searchParams.set("city", city)
        setSearchParams(searchParams)
        setLocation({lat, lon, city})
      }
    }

    const getWeatherDataFromAPI = useCallback(async () => {
      const {lat, lon} = location
      const data = await getWeatherData(lat, lon)
      setWeatherData(data)
    }, [location])

    useEffect(() => {
      if (location) getWeatherDataFromAPI()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    useEffect(() => {
      getSearchParams()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <WrappedComponent {...props} weatherData={weatherData} location={location} />
  }

  WithWeather.displayName = `WithWeather(${WrappedComponent.displayName || WrappedComponent.name})`
  return WithWeather
}

export default withWeather
