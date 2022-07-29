import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from './global';
import { theme } from './theme';

export type StylesProviderProps = {
  children: ReactNode;
};

export const StylesProvider = ({ children }: StylesProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export * from './global';
export * from './theme';
