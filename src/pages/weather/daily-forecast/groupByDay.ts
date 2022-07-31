import { fromUnixTime, format } from 'date-fns';
import { ptBR, es, enUS } from 'date-fns/locale';

import { ForecastData } from '~/services/weather';

export const groupByDay = (data: ForecastData, lang: string) => {
  const items: (ForecastData[number] & {
    day: string;
  })[] = [];

  const weathersPerDays: {
    description: string;
    icon: string;
  }[][] = [];

  const locales = {
    'pt-BR': ptBR,
    es,
    en: enUS,
  };

  data.forEach(item => {
    const date = fromUnixTime(item.timestamp);

    const day = format(date, 'EEEEEE, d LLL', {
      locale: locales[lang],
    });

    const last = items.length - 1;

    if (items.length === 0 || day !== items[last].day) {
      items.push({ ...item, day });

      weathersPerDays.push([
        {
          description: item.description,
          icon: item.icon,
        },
      ]);
    } else {
      items[last].tempMin = Math.min(items[last].tempMin, item.tempMin);
      items[last].tempMax = Math.max(items[last].tempMax, item.tempMax);

      weathersPerDays[last].push({
        description: item.description,
        icon: item.icon,
      });
    }
  });

  items.forEach((item, index) => {
    const middle = Math.floor(weathersPerDays[index].length / 2);

    items[index].description = weathersPerDays[index][middle].description;
    items[index].icon = weathersPerDays[index][middle].icon;
  });

  if (items.length > 5) {
    return items.slice(items.length - 5);
  }

  return items;
};
