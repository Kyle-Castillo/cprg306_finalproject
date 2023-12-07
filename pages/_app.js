// _app.js
import ErrorBoundary from './ErrorBoundary';
import Layout from './layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
    </Layout>
  );
}

export default MyApp;
