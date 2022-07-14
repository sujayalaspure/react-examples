export const baseUrl = "https://api.openweathermap.org/data/2.5/";

const apiKey = "1f8aa342a64303d5d0c546cc54bf9e9a";

export const getLocationUrl = ({ lat, lon }) => {
  return `lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
};

export const getCurrentWeatherUrl = ({ lat, lon }) => {
  return `${baseUrl}weather?${getLocationUrl({ lat, lon })}`;
};
export const getForcastUrl = ({ lat, lon }) => {
  return `${baseUrl}forecast?${getLocationUrl({ lat, lon })}`;
};
export const getOneCallUrl = ({ lat, lon }) => {
  return `${baseUrl}onecall?${getLocationUrl({ lat, lon })}`;
};

export const getIcon = (icon) => {
  return `http://openweathermap.org/img/w/${icon}.png`;
};
