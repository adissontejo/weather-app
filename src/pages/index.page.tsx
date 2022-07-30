import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import usePlacesAutocomplete from 'use-places-autocomplete';

import { SearchInput, Switch } from '~/components';

import { Container, Main } from './styles';

const Home = () => {
  const router = useRouter();

  const [metrics, setMetrics] = useState<'C' | 'F'>('C');

  const { value, setValue, suggestions } = usePlacesAutocomplete({
    requestOptions: {
      types: ['(cities)'],
    },
  });

  const options = useMemo(() => {
    return suggestions.data.slice(0, 3).map(item => {
      return item.terms[0].value;
    });
  }, [suggestions]);

  return (
    <Container>
      <header>
        <Switch
          value={metrics === 'C'}
          onChange={value => setMetrics(value ? 'C' : 'F')}
          enabledText="°C"
          disabledText="°F"
        />
      </header>
      <Main>
        <h1>Como está o tempo hoje?</h1>
        <SearchInput
          value={value}
          items={options}
          onChange={setValue}
          onSelectItem={value =>
            router.push(`/city?q=${value.replace(' ', '+')}`)
          }
        />
      </Main>
    </Container>
  );
};

export default Home;
