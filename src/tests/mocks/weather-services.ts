import { ForecastData, WeatherData } from '~/services/weather';

export const weatherData = {
  id: 0,
  icon: '01d',
  description: 'description',
  temp: 10,
  tempMin: 0,
  tempMax: 20,
} as WeatherData;

export const getWeather = jest.fn(async () => weatherData);

export const forecastData = [
  {
    id: 0,
    icon: '01d',
    description: 'description 1',
    temp: 10,
    tempMin: 0,
    tempMax: 20,
    timestamp: 0,
  },
  {
    id: 1,
    icon: '01d',
    description: 'description 2',
    temp: 10,
    tempMin: 0,
    tempMax: 20,
    timestamp: 24 * 60 * 60,
  },
  {
    id: 2,
    icon: '01d',
    description: 'description 3',
    temp: 10,
    tempMin: 0,
    tempMax: 20,
    timestamp: 24 * 60 * 60 * 2,
  },
  {
    id: 3,
    icon: '01d',
    description: 'description 4',
    temp: 10,
    tempMin: 0,
    tempMax: 20,
    timestamp: 24 * 60 * 60 * 3,
  },
  {
    id: 4,
    icon: '01d',
    description: 'description 5',
    temp: 10,
    tempMin: 0,
    tempMax: 20,
    timestamp: 24 * 60 * 60 * 4,
  },
] as ForecastData;

export const getForecast = jest.fn(async () => forecastData);
