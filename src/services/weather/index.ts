import axios, { AxiosResponse } from 'axios';

const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
});

export type WeatherData = {
  coord: {
    lat: number;
    lon: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export const getWeatherByCity = (city: string, lang: string) => {
  let language = lang;

  if (language === 'pt-BR') {
    language = 'pt_br';
  }

  return weatherApi.get(
    `?appId=${process.env.OPEN_WEATHER_API_KEY}&q=${city}&lang=${language}`
  ) as Promise<AxiosResponse<WeatherData>>;
};
