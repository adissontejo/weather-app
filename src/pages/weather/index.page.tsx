import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useScale } from '~/hooks';
import { getWeather, WeatherData } from '~/services/weather';

import { Display, Main, More } from './styles';

type WeatherProps = {
  data: WeatherData;
};

const Weather: NextPage<WeatherProps> = ({ data }) => {
  const router = useRouter();
  const { format } = useScale();

  const { t } = useTranslation('weather');

  return (
    <Main>
      <h1>{router.query.city}</h1>
      <p className="description">{data.description}</p>
      <Display>
        <span className="temperature">{format(data.temp)}</span>
        <Image
          className="icon"
          src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt={data.description}
          width={100}
          height={100}
        />
      </Display>
      <p className="limits">
        <b>MAX:</b> <span>{format(data.tempMax, 'max')}</span> <b>MIN:</b>{' '}
        <span>{format(data.tempMin, 'min')}</span>
      </p>
      <Link
        href={{ pathname: '/weather/daily-forecast', query: router.query }}
        as="/weather/daily-forecast"
      >
        <More>{t('forecast')}</More>
      </Link>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps<WeatherProps> = async ({
  query,
  locale,
}) => {
  if (!query.lat || !query.lng || !query.city) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  const data = await getWeather(
    query.lat as string,
    query.lng as string,
    locale
  );

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'weather'])),
      data,
    },
  };
};

export default Weather;
