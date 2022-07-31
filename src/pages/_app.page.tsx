import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import { Footer, Header } from '~/components';
import { ContextProvider } from '~/contexts';
import { StylesProvider } from '~/styles';

const Layout = appWithTranslation(({ Component, pageProps }) => (
  <div className="app">
    <Header />
    <Component {...pageProps} />
    <Footer />
  </div>
));

const App = (props: AppProps) => {
  return (
    <StylesProvider>
      <ContextProvider>
        <Layout {...props} />
      </ContextProvider>
    </StylesProvider>
  );
};

export default App;
