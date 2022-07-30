import { AppProps } from 'next/app';

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

export default App;
