import axios from 'axios';

const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appId: process.env.OPEN_WEATHER_API_KEY,
  },
});

export type WeatherData = {
  id: number;
  description: string;
  icon: string;
  temp: number;
  tempMin: number;
  tempMax: number;
};

export const getWeather = async (
  lat: number | string,
  lon: number | string,
  lang: string
) => {
  if (lang === 'pt-BR') {
    lang = 'pt_br';
  }

  const { data } = await weatherApi.get('/weather', {
    params: {
      lat,
      lon,
      lang,
    },
  });

  return {
    id: data.id,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    temp: data.main.temp,
    tempMin: data.main.temp_min,
    tempMax: data.main.temp_max,
  } as WeatherData;
};

export type ForecastData = (WeatherData & {
  timestamp: number;
})[];

export const getForecast = async (
  lat: number | string,
  lon: number | string,
  lang: string
) => {
  if (lang === 'pt-BR') {
    lang = 'pt_br';
  }

  const { data } = await weatherApi.get('/forecast', {
    params: {
      lat,
      lon,
      lang,
    },
  });

  return data.list.map(
    item =>
      ({
        id: item.dt,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        temp: item.main.temp,
        tempMin: item.main.temp_min,
        tempMax: item.main.temp_max,
        timestamp: item.dt,
      } as ForecastData[number])
  ) as ForecastData;
};
