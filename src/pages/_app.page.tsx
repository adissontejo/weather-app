import 'nprogress/nprogress.css';

import Router from 'next/router';
import { AppProps } from 'next/app';
import NProgress from 'nprogress';
import { appWithTranslation } from 'next-i18next';

import { Footer, Header } from '~/components';
import { ContextProvider } from '~/contexts';
import { StylesProvider } from '~/styles';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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
