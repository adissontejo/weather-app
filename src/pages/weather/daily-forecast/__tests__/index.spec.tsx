import { GetServerSidePropsContext } from 'next';
import { screen } from '@testing-library/react';

import { forecastData, getForecast, router, t, useRouter } from '~/tests/mocks';
import { render } from '~/tests/utils';

import DailyForecast, { getServerSideProps } from '../index.page';
import { groupByDay } from '../groupByDay';

describe('pages#DailyForecast', () => {
  describe('#rendering', () => {
    it('should render translated texts', () => {
      render(<DailyForecast data={forecastData} />);

      screen.getByText(t('text'));
    });

    it('should render city name', () => {
      useRouter.mockReturnValueOnce({
        ...router,
        query: {
          city: 'city',
        },
      });

      render(<DailyForecast data={forecastData} />);

      screen.getByText('city');
    });

    it('should render API response data', () => {
      render(<DailyForecast data={forecastData} />);

      const days = groupByDay(forecastData, 'pt-BR');

      days.forEach(item => {
        screen.getByText(item.description);
      });
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
        expect(data).toHaveProperty(`${path}.ns`, ['common', 'forecast']);
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

      expect(data).toHaveProperty('props.data', forecastData);
    });

    it('should return redirect when params are not provided', async () => {
      const data = await getServerSideProps({
        query: {},
      } as GetServerSidePropsContext);

      expect(data).toHaveProperty('redirect');
    });

    it('should return redirect when API returns error', async () => {
      getForecast.mockRejectedValueOnce(new Error('error'));

      const ctx = {
        locale: 'pt-BR',
        query: {
          lat: '0',
          lng: '0',
          city: 'city',
        },
      } as unknown as GetServerSidePropsContext;

      const data = await getServerSideProps(ctx);

      expect(data).toHaveProperty('redirect');
    });
  });
});
