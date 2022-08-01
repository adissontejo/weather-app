import { GetStaticPropsContext } from 'next';
import { screen, waitFor } from '@testing-library/react';
import { getGeocode, Suggestions } from 'use-places-autocomplete';

import { SearchInput, SearchInputProps } from '~/components';
import { render } from '~/tests/utils';
import {
  placesAutocomplete,
  router,
  t,
  usePlacesAutocomplete,
} from '~/tests/mocks';

import Home, { getStaticProps } from '../index.page';

jest.mock('~/components', () => ({
  SearchInput: jest.fn(() => 'SearchInput'),
}));

describe('pages#Home', () => {
  const getSearchInputProps = (): SearchInputProps => {
    const props = jest.mocked(SearchInput).mock.calls[0][0];

    jest.mocked(SearchInput).mockClear();

    return props;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#logics', () => {
    it('should generate options from suggestions properly', () => {
      render(<Home />);

      const { items } = getSearchInputProps();

      items.forEach((item, index) => {
        const suggestion = placesAutocomplete.suggestions.data[index];

        expect(item.key).toBe(suggestion.place_id);
        expect(item.value).toBe(suggestion.terms[0].value);
        expect(item.label).toBe(item.value);
      });
    });

    it('should render second term if the first is duplicated', () => {
      const suggestions = {
        data: [
          placesAutocomplete.suggestions.data[0],
          {
            place_id: 1,
            terms: [
              placesAutocomplete.suggestions.data[0].terms[0],
              {
                value: placesAutocomplete.suggestions.data[1].terms[1],
              },
              {
                value: placesAutocomplete.suggestions.data[1].terms[2],
              },
            ],
          },
        ],
      } as Suggestions;

      usePlacesAutocomplete.mockReturnValueOnce({
        ...placesAutocomplete,
        suggestions,
      });

      render(<Home />);

      const { items } = getSearchInputProps();

      items.forEach((item, index) => {
        const suggestion = suggestions.data[index];

        expect(item.key).toBe(suggestion.place_id);
        expect(item.value).toBe(suggestion.terms[0].value);
        expect(item.label).toBe(
          `${suggestion.terms[0].value}, ${suggestion.terms[1].value}`
        );
      });
    });

    it('should get geocode and go to next page when select item', async () => {
      render(<Home />);

      const { items, onSelectItem } = getSearchInputProps();

      onSelectItem(items[0]);

      expect(getGeocode).toHaveBeenCalledWith({
        placeId: items[0].key,
      });

      await waitFor(() => {
        expect(router.push).toHaveBeenCalledWith(
          expect.objectContaining({
            pathname: '/weather',
          }),
          '/weather'
        );
      });
    });
  });

  describe('#rendering', () => {
    it('should render translated texts', () => {
      render(<Home />);

      screen.getByText(t('title'));
    });
  });

  describe('#getStaticProps', () => {
    it('should return translation properly', async () => {
      const locales = ['pt-BR', 'en', 'es'];

      for (const locale of locales) {
        const ctx = {
          locale,
        } as GetStaticPropsContext;

        const data = await getStaticProps(ctx);

        const path = 'props._nextI18Next';

        expect(data).toHaveProperty(path);
        expect(data).toHaveProperty(`${path}.initialLocale`, locale);
        expect(data).toHaveProperty(`${path}.ns`, ['common', 'home']);
      }
    });
  });
});
