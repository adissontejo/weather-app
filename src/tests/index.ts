import '@testing-library/jest-dom';

import {
  getForecast,
  getGeocode,
  getWeather,
  nextI18Next,
  nextRouter,
  usePlacesAutocomplete,
} from './mocks';

jest.mock('next-i18next', () => ({
  ...jest.requireActual('next-i18next'),
  ...nextI18Next,
}));

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  ...nextRouter,
}));

jest.mock('~/services/weather', () => ({
  getWeather,
  getForecast,
}));

jest.mock('use-places-autocomplete', () => ({
  __esModule: true,
  ...jest.requireActual('use-places-autocomplete'),
  default: usePlacesAutocomplete,
  getGeocode,
}));
