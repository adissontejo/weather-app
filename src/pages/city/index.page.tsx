import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Header } from '~/components';
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
          <b>MAX:</b> <span>{format(main.temp_max)}</span> <b>MIN:</b>{' '}
          <span>{format(main.temp_min)}</span>
        </p>
        <Link href="/">
          <More>Ver previsão para os próximos 5 dias</More>
        </Link>
      </Main>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<CityProps> = async ctx => {
  const response = await getWeatherByCity(ctx.query.q as string);

  return {
    props: {
      weatherData: response.data,
    },
  };
};

export default City;
