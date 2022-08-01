import { fireEvent, screen } from '@testing-library/react';

import { render } from '~/tests/utils';

import { Switch, SwitchProps } from '..';

const getData = (
  props: Partial<SwitchProps<string>> = {}
): SwitchProps<string> => ({
  value: 'disabled',
  onChange: jest.fn(),
  disabledValue: 'disabled',
  disabledText: 'disabledText',
  enabledValue: 'enabled',
  enabledText: 'enabledText',
  ...props,
});

describe('component#Switch', () => {
  describe('#logics', () => {
    it('should toggle values on click', () => {
      const disabledData = getData({ value: 'disabled' });
      const enabledData = getData({ value: 'enabled' });

      render(
        <>
          <Switch {...disabledData} />
          <Switch {...enabledData} />
        </>
      );
      const [disabledLabel, enabledLabel] = screen.getAllByRole('switch');

      fireEvent.click(disabledLabel);
      fireEvent.click(enabledLabel);

      expect(disabledData.onChange).toHaveBeenCalledWith(
        disabledData.enabledValue
      );
      expect(enabledData.onChange).toHaveBeenCalledWith(
        enabledData.disabledValue
      );
    });
  });

  describe('#rendering', () => {
    it('should render all texts properly', () => {
      const data = getData();

      render(<Switch {...data} />);

      screen.getByText(data.disabledText);
      screen.getByText(data.enabledText);
    });
  });
});
