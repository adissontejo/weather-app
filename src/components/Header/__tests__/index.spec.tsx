import { screen } from '@testing-library/react';

import { router, useRouter } from '~/tests/mocks';
import { render } from '~/tests/utils';

import { Header } from '..';

describe('components#Header', () => {
  afterEach(() => {
    useRouter.mockClear();
  });

  describe('#rendering', () => {
    it('should render switch properly', () => {
      render(<Header />);

      screen.getByTestId('switch-component');
    });

    it('should render back button only when route is not initial route', () => {
      useRouter.mockReturnValueOnce({
        ...router,
        pathname: '/',
      });

      const header = render(<Header />);

      const back = screen.queryByTestId('header-component-back');

      expect(back).toBe(null);

      header.unmount();

      useRouter.mockReturnValueOnce({
        ...router,
        pathname: '/weather',
      });

      render(<Header />);

      screen.getByTestId('header-component-back');
    });
  });
});
