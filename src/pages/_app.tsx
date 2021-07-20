import { AppProps } from 'next/dist/next-server/lib/router/router';

import { Header } from '../components/Header';
import '../styles/global.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>  
  );
}
