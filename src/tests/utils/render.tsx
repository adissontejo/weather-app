import { ReactNode } from 'react';
import { render as renderElement, RenderOptions } from '@testing-library/react';

import { ContextProvider } from '~/contexts';
import { StylesProvider } from '~/styles';

export const render = (element: ReactNode, options?: RenderOptions) => {
  return renderElement(
    <StylesProvider>
      <ContextProvider>{element}</ContextProvider>
    </StylesProvider>,
    options
  );
};
