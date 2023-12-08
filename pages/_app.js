// _app.js
import ErrorBoundary from './ErrorBoundary';
import Layout from './layout';
import { initializeApp } from 'firebase/app';
import firestore from '@/_utils/firebase';



function MyApp({ Component, pageProps }) {
  const app = initializeApp(firestore);
  return (
    <Layout>
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
    </Layout>
  );
}

export default MyApp;
