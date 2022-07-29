import { AppProps } from 'next/app';

import { StylesProvider } from '~/styles';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <StylesProvider>
      <Component {...pageProps} />
    </StylesProvider>
  );
};

export default App;
