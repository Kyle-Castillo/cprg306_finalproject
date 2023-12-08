// _app.js
import ErrorBoundary from './ErrorBoundary';
import Layout from './layout';
import { initializeApp } from 'firebase/app';
import firestore from '@/_utils/firebase';


const app = initializeApp(firestore);
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
