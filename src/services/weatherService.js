import { DateTime } from "luxon";

const API_KEY = "your_api_key";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url)
    .then((res) => res.json())
    .then((data) => data);
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const formatForcastWeather = (data) => {
  const dataList = data.list;
  const timezone = data.city.timezone;

  const dailyData = dataList.filter((_, index) =>
    [0, 8, 16, 24, 32, 40].includes(index + 1)
  );

  const hourlyData = dataList.filter((_, index) =>
    [0, 1, 2, 3, 4, 5].includes(index + 1)
  );

  let daily = dailyData.map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.main.temp,
      icon: d.weather[0].icon,
    };
  });

  let hourly = hourlyData.map((h) => {
    return {
      title: formatToLocalTime(h.dt, timezone, "hh:mm a"),
      temp: h.main.temp,
      icon: h.weather[0].icon,
    };
  });
  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForcastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then(formatForcastWeather);

  return { ...formattedCurrentWeather, ...formattedForcastWeather };
};
// "cccc, dd, LLL yyyy' Local time: 'hh:mm a"
const formatToLocalTime = (secs, zone, format = "' Local time: 'hh:mm a") =>
  DateTime.fromSeconds(secs - 10800)
    .setZone(zone)
    .toFormat(format);

const forTime = (secs, timezone) => {
  const date = new Date(secs * 1000);
  const options = { timeZone: "JST" };
  const currentDate = date.toLocaleString(undefined, options);
  return currentDate;
};

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, forTime, iconUrlFromCode };
