import { GetServerSidePropsContext } from 'next';
import { screen } from '@testing-library/react';

import { router, t, useRouter, weatherData } from '~/tests/mocks';
import { render } from '~/tests/utils';

import Weather, { getServerSideProps } from '../index.page';

describe('pages#Weather', () => {
  describe('#rendering', () => {
    it('should render weather data and city name', () => {
      useRouter.mockReturnValueOnce({
        ...router,
        query: {
          city: 'city',
        },
      });

      render(<Weather data={weatherData} />);

      screen.getByText(weatherData.description);
      screen.getByText('city');
    });

    it('should render translated texts', () => {
      render(<Weather data={weatherData} />);

      screen.getByText(t('forecast'));
    });
  });

  describe('#getServerSideProps', () => {
    it('should return translations properly', async () => {
      const locales = ['pt-BR', 'en', 'es'];

      for (const locale of locales) {
        const ctx = {
          locale,
          query: {
            lat: '0',
            lng: '0',
            city: 'city',
          },
        } as unknown as GetServerSidePropsContext;

        const data = await getServerSideProps(ctx);

        const path = 'props._nextI18Next';

        expect(data).toHaveProperty(path);
        expect(data).toHaveProperty(`${path}.initialLocale`, locale);
        expect(data).toHaveProperty(`${path}.ns`, ['common', 'weather']);
      }
    });

    it('should return weather API data properly', async () => {
      const ctx = {
        locale: 'pt-BR',
        query: {
          lat: '0',
          lng: '0',
          city: 'city',
        },
      } as unknown as GetServerSidePropsContext;

      const data = await getServerSideProps(ctx);

      expect(data).toHaveProperty('props.data', weatherData);
    });

    it('should return redirect when params are not provided', async () => {
      const data = await getServerSideProps({
        query: {},
      } as GetServerSidePropsContext);

      expect(data).toHaveProperty('redirect.destination', '/');
    });
  });
});
