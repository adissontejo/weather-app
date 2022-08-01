import { ForecastData, WeatherData } from '~/services/weather';

export const weatherData = {
  id: 0,
  icon: '01d',
  description: 'description',
  temp: 10,
  tempMin: 0,
  tempMax: 20,
} as WeatherData;

export const getWeather = jest.fn(() => weatherData);

export const forecastData = [
  {
    id: 0,
    icon: '01d',
    description: 'description',
    temp: 10,
    tempMin: 0,
    tempMax: 20,
    timestamp: 0,
  },
  {
    id: 0,
    icon: '01d',
    description: 'description',
    temp: 10,
    tempMin: 0,
    tempMax: 20,
    timestamp: 24 * 60 * 60,
  },
  {
    id: 0,
    icon: '01d',
    description: 'description',
    temp: 10,
    tempMin: 0,
    tempMax: 20,
    timestamp: 24 * 60 * 60 * 2,
  },
  {
    id: 0,
    icon: '01d',
    description: 'description',
    temp: 10,
    tempMin: 0,
    tempMax: 20,
    timestamp: 24 * 60 * 60 * 3,
  },
  {
    id: 0,
    icon: '01d',
    description: 'description',
    temp: 10,
    tempMin: 0,
    tempMax: 20,
    timestamp: 24 * 60 * 60 * 4,
  },
] as ForecastData;

export const getForecast = jest.fn(() => forecastData);
