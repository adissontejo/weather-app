import { fireEvent, screen } from '@testing-library/react';

import { SearchInput, SearchInputProps } from '~/components';
import { render } from '~/tests/utils';

const getData = (props: Partial<SearchInputProps> = {}): SearchInputProps => ({
  value: 'value',
  placeholder: 'placeholder',
  items: [
    {
      key: 'item1',
      value: 'item1.value',
      label: 'item1.label',
    },
    {
      key: 'item2',
      value: 'item2.value',
      label: 'item2.label',
    },
    {
      key: 'item3',
      value: 'item3.value',
      label: 'item3.label',
    },
  ],
  onChange: jest.fn(),
  onSelectItem: jest.fn(),
  ...props,
});

describe('component#SearchInput', () => {
  describe('#logics', () => {
    it('should call onChange when input value changes', () => {
      const data = getData();

      render(<SearchInput {...data} />);

      const input = screen.getByTestId('search-input');

      const newValue = 'new-value';

      fireEvent.change(input, {
        target: {
          value: newValue,
        },
      });

      expect(data.onChange).toHaveBeenCalledWith(newValue);
    });

    it('should focus and select items when using keyboard', () => {
      const data = getData();

      render(<SearchInput {...data} />);

      const input = screen.getByTestId('search-input');
      const items = screen.getAllByRole('option');

      for (let i = 0; i < items.length; i++) {
        fireEvent.keyDown(input, { key: 'ArrowDown' });

        items.forEach((item, index) => {
          if (index === i) {
            expect(item).toHaveAttribute('aria-selected', 'true');
          } else {
            expect(item).toHaveAttribute('aria-selected', 'false');
          }
        });
      }

      for (let i = items.length - 1; i >= 0; i--) {
        fireEvent.keyDown(input, { key: 'ArrowUp' });

        items.forEach((item, index) => {
          if (index === i - 1) {
            expect(item).toHaveAttribute('aria-selected', 'true');
          } else {
            expect(item).toHaveAttribute('aria-selected', 'false');
          }
        });
      }

      data.items.forEach(item => {
        fireEvent.keyDown(input, { key: 'ArrowDown' });

        fireEvent.keyDown(input, { key: 'Enter' });

        expect(data.onSelectItem).toHaveBeenCalledWith(item);
      });
    });

    it('should focus and select items when using mouse', () => {
      const data = getData();

      render(<SearchInput {...data} />);

      const options = screen.getByTestId('search-input-options');
      const items = screen.getAllByRole('option');

      items.forEach((currentItem, currentIndex) => {
        fireEvent.mouseEnter(currentItem);

        items.forEach((item, index) => {
          if (index === currentIndex) {
            expect(item).toHaveAttribute('aria-selected', 'true');
          } else {
            expect(item).toHaveAttribute('aria-selected', 'false');
          }
        });

        fireEvent.click(currentItem);

        expect(data.onSelectItem).toHaveBeenCalledWith(
          data.items[currentIndex]
        );

        fireEvent.mouseLeave(options);

        expect(currentItem).toHaveAttribute('aria-selected', 'false');
      });
    });

    it('should close options when click outside', () => {
      const data = getData();

      render(
        <div data-testid="test-simulate-click-outside">
          <SearchInput {...data} />
        </div>
      );

      const wrapper = screen.getByTestId('test-simulate-click-outside');

      const container = screen.getByTestId('search-input-component');

      const input = screen.getByTestId('search-input');

      fireEvent.click(input);

      expect(container).toHaveAttribute('aria-expanded', 'true');

      fireEvent.click(wrapper);

      expect(container).not.toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('#rendering', () => {
    it('should render items properly', () => {
      const data = getData();

      render(<SearchInput {...data} />);

      data.items.forEach(item => {
        screen.getByText(item.label);
      });
    });

    it('should render placeholder properly', () => {
      const data = getData();

      render(<SearchInput {...data} />);

      screen.getByPlaceholderText(data.placeholder);
    });
  });
});
