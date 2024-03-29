import { useEffect, useMemo } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import usePlacesAutocomplete, { getGeocode } from 'use-places-autocomplete';
import { toast } from 'react-toastify';

import { SearchInput } from '~/components';

import { Main } from './styles';

const Home = () => {
  const router = useRouter();

  const { t } = useTranslation('home');

  useEffect(() => {
    if (router.query.error !== undefined) {
      toast.error(t('error'));

      router.replace('/');
    }
  }, [router.query]);

  const { value, setValue, suggestions } = usePlacesAutocomplete({
    requestOptions: {
      types: ['(cities)'],
      language: router.locale,
    },
  });

  const options = useMemo(() => {
    const list = suggestions.data.slice(0, 3);

    return list.map(item => {
      let label = item.terms[0].value;

      const count = list.filter(place => place.terms[0].value === label).length;

      if (count > 1) {
        label += `, ${item.terms[1].value}`;
      }

      return {
        key: item.place_id,
        value: item.terms[0].value,
        label,
      };
    });
  }, [suggestions]);

  const handleSelectItem = async (item: { key: string; value: string }) => {
    const data = await getGeocode({
      placeId: item.key,
    });

    router.push(
      {
        pathname: '/weather',
        query: {
          lat: data[0].geometry.location.lat(),
          lng: data[0].geometry.location.lng(),
          city: item.value,
        },
      },
      '/weather'
    );
  };

  return (
    <Main>
      <Head>
        <title>Weather App</title>
      </Head>
      <h1>{t('title')}</h1>
      <SearchInput
        value={value}
        placeholder={t('search')}
        items={options}
        onChange={setValue}
        onSelectItem={handleSelectItem}
      />
    </Main>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
    },
  };
};

export default Home;
