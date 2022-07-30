import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import { ContextProvider } from '~/contexts';
import { StylesProvider } from '~/styles';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <StylesProvider>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </StylesProvider>
  );
};

export default appWithTranslation(App);
