import { ForecastData } from '~/services/weather';
import { forecastData } from '~/tests/mocks';

import { groupByDay } from '../groupByDay';

describe('function#groupByDay', () => {
  it('should group forecasts from the same day', () => {
    const data = forecastData.reduce((acc, curr) => {
      return [...acc, curr, curr, curr];
    }, [] as ForecastData);

    const grouped = groupByDay(data, 'pt-BR');

    expect(grouped).not.toHaveLength(data.length);
    expect(grouped).toHaveLength(forecastData.length);
  });

  it('should trunc days if length is bigger than 5', () => {
    const data = forecastData.reduce((acc, curr) => {
      return [
        ...acc,
        curr,
        {
          ...curr,
          timestamp: curr.timestamp + 24 * 60 * 60 * 7,
        },
      ];
    }, [] as ForecastData);

    const grouped = groupByDay(data, 'pt-BR');

    expect(grouped).not.toHaveLength(10);
    expect(grouped).toHaveLength(5);
  });
});
