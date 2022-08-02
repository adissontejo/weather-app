import { screen } from '@testing-library/react';

import { t } from '~/tests/mocks';
import { render } from '~/tests/utils';

import { Footer } from '..';

describe('components#Footer', () => {
  describe('#rendering', () => {
    it('should render translated texts', () => {
      render(<Footer />);

      screen.getByText(t('lang'));
    });
  });
});
