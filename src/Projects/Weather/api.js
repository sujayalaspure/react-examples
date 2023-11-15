export const baseUrl = "https://api.openweathermap.org/data/2.5/"

const apiKey = "1f8aa342a64303d5d0c546cc54bf9e9a"

export const getLocationUrl = ({lat, lon}) => {
  return `lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${apiKey}`
}

export const getCurrentWeatherUrl = ({lat, lon}) => {
  return `${baseUrl}weather?${getLocationUrl({lat, lon})}`
}
export const getForcastUrl = ({lat, lon}) => {
  return `${baseUrl}forecast?${getLocationUrl({lat, lon})}`
}
export const getOneCallUrl = ({lat, lon}) => {
  return `${baseUrl}onecall?${getLocationUrl({lat, lon})}`
}

export const getIcon = (icon, size = 1) => {
  return weatherIcons(size)[icon]
  // return `http://openweathermap.org/img/wn/${icon}${size}.png`
}

export const getLocationByIP = async () => {
  const res = await fetch("https://ipapi.co/json/")
  const data = await res.json()
  return data
}

export const getWeatherData = async (lat, lon) => {
  const res = await fetch(getOneCallUrl({lat, lon}))
  const data = await res.json()
  return data
}

const weatherIcons = (size = 1) => {
  return {
    "01d": `https://img.icons8.com/ultraviolet/${40 * size}/sun--v1.png`,
    "01n": `https://img.icons8.com/ultraviolet/${40 * size}/bright-moon.png`,
    "02d": `https://img.icons8.com/ultraviolet/${40 * size}/partly-cloudy-day--v1.png`,
    "02n": `https://img.icons8.com/ultraviolet/${40 * size}/partly-cloudy-night--v1.png`,
    "03d": `https://img.icons8.com/arcade/${64 * size}/clouds.png`,
    "03n": `https://img.icons8.com/arcade/${64 * size}/clouds.png`,
    "04d": `https://img.icons8.com/external-flat-adri-ansyah/${
      32 * size
    }/external-weather-weather-flat-adri-ansyah-12.png`,
    "04n": `https://img.icons8.com/external-flat-adri-ansyah/${
      32 * size
    }/external-weather-weather-flat-adri-ansyah-12.png`,
    "09d": `https://img.icons8.com/ultraviolet/${40 * size}/light-rain.png`,
    "09n": `https://img.icons8.com/ultraviolet/${40 * size}/light-rain.png`,
    "10d": `https://img.icons8.com/ultraviolet/${40 * size}/partly-cloudy-rain.png`,
    "10n": `https://img.icons8.com/ultraviolet/${40 * size}/rain.png`,
    "11d": `https://img.icons8.com/ultraviolet/${40 * size}/chance-of-storm.png`,
    "11n": `https://img.icons8.com/ultraviolet/${40 * size}/storm.png`,
    "13n": `https://img.icons8.com/ultraviolet/${40 * size}/winter.png`,
    "13d": `https://img.icons8.com/ultraviolet/${40 * size}/winter.png`,
    "50d": `https://img.icons8.com/external-rabit-jes-outline-color-rabit-jes/${
      62 * size
    }/external-fog-weather-rabit-jes-outline-color-rabit-jes.png`,
    "50n": `https://img.icons8.com/external-rabit-jes-outline-color-rabit-jes/${
      62 * size
    }/external-fog-weather-rabit-jes-outline-color-rabit-jes.png`,
  }
}

export const thermometerIcon = `https://img.icons8.com/ultraviolet/40/thermometer.png`
export const windDirectionIcon = `https://img.icons8.com/ultraviolet/40/windsock.png`
export const rainChanceIcon = `https://img.icons8.com/ultraviolet/40/sleet.png`
export const humidityIcon = `https://img.icons8.com/ultraviolet/40/wet.png`
export const visibilityIcon = `https://img.icons8.com/ultraviolet/40/visible.png`
