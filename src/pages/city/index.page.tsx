import { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Footer, Header } from '~/components';
import { useScale } from '~/hooks';
import { getWeatherByCity, WeatherData } from '~/services/weather';

import { Container, Display, Main, More } from './styles';

type CityProps = {
  weatherData: WeatherData;
};

const City: NextPage<CityProps> = ({ weatherData }) => {
  const weather = weatherData.weather[0];
  const { main } = weatherData;

  const { format } = useScale();

  const { t } = useTranslation('city');

  return (
    <Container>
      <Header />
      <Main>
        <h1>{weatherData.name}</h1>
        <p className="description">{weather.description}</p>
        <Display>
          <span className="temperature">{format(main.temp)}</span>
          <Image
            className="icon"
            src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            width={100}
            height={100}
          />
        </Display>
        <p className="limits">
          <b>MAX:</b> <span>{format(main.temp_max, 'max')}</span> <b>MIN:</b>{' '}
          <span>{format(main.temp_min, 'min')}</span>
        </p>
        <Link href="/">
          <More>{t('prevision')}</More>
        </Link>
      </Main>
      <Footer />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<CityProps> = async ({
  query,
  locale,
}) => {
  const response = await getWeatherByCity(query.q as string, locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'city'])),
      weatherData: response.data,
    },
  };
};

export default City;
