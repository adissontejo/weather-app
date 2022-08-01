import { GeocodeResult, HookReturn } from 'use-places-autocomplete';

export const placesAutocomplete = {
  value: '',
  setValue: jest.fn(),
  suggestions: {
    data: [
      {
        place_id: 0,
        terms: [
          {
            value: 'a',
          },
          {
            value: 'b',
          },
          {
            value: 'c',
          },
        ],
      },
      {
        place_id: 1,
        terms: [
          {
            value: 'd',
          },
          {
            value: 'e',
          },
          {
            value: 'f',
          },
        ],
      },
    ],
  },
} as unknown as HookReturn;

export const usePlacesAutocomplete = jest.fn(() => ({
  ...placesAutocomplete,
}));

export const getGeocode = jest.fn(() => [
  {
    geometry: {
      location: {
        lat: () => 0,
        lng: () => 0,
      },
    },
  } as GeocodeResult,
]);
