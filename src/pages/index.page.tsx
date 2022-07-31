import { useMemo } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import usePlacesAutocomplete, { getGeocode } from 'use-places-autocomplete';

import { SearchInput } from '~/components';

import { Main } from './styles';

const Home = () => {
  const router = useRouter();

  const { t } = useTranslation('home');

  const lang = router.locale;

  const { value, setValue, suggestions } = usePlacesAutocomplete({
    requestOptions: {
      types: ['(cities)'],
      language: lang,
    },
  });

  const options = useMemo(() => {
    return suggestions.data.slice(0, 3).map(item => {
      let value = item.terms[0].value;

      const count = suggestions.data.filter(place => {
        return place.terms[0].value === value;
      }).length;

      if (count > 1) {
        value += `, ${item.terms[1].value}`;
      }

      return {
        key: item.place_id,
        value,
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
