import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useScale } from '~/hooks';
import { ForecastData, getForecast } from '~/services/weather';

import { Day, Main } from './styles';
import { groupByDay } from './groupByDay';

export type DailyForecastProps = {
  data: ForecastData;
};

const DailyForecast: NextPage<DailyForecastProps> = ({ data }) => {
  const router = useRouter();

  const { t } = useTranslation('forecast');

  const { format } = useScale();

  const days = groupByDay(data, router.locale);

  return (
    <Main>
      <h1>{router.query.city}</h1>
      <p className="description">{t('text')}</p>
      <div className="days">
        {days.map(item => (
          <Day key={item.id}>
            <b className="date">{item.day}</b>
            <Image
              className="icon"
              src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`}
              alt={item.description}
              width={40}
              height={40}
            />
            <span className="temp-min">{format(item.tempMin)}</span>
            <div className="gradient"></div>
            <span className="temp-max">{format(item.tempMax)}</span>
            <span className="description">{item.description}</span>
          </Day>
        ))}
      </div>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps<
  DailyForecastProps
> = async ({ query, locale }) => {
  if (!query.lat || !query.lng || !query.city) {
    return {
      redirect: {
        destination: `/${locale === 'pt-BR' ? '' : locale}`,
        permanent: false,
      },
    };
  }

  try {
    const data = await getForecast(
      query.lat as string,
      query.lng as string,
      locale
    );

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'forecast'])),
        data,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: `/${locale === 'pt-BR' ? '' : locale}?error`,
        permanent: false,
      },
    };
  }
};

export default DailyForecast;
