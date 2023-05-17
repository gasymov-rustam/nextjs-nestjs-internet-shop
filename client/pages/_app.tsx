import { attachReduxDevTools } from '@effector/redux-devtools-adapter';
import { withHydrate } from 'effector-next';
import NextProgress from 'nextjs-progressbar';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import type { AppProps } from 'next/app';

import '@/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

attachReduxDevTools({
  name: 'Boiler Details',
  batch: true,
  stateTab: true,
});

const enhance = withHydrate();

const App = ({ Component, pageProps }: AppProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <>
      <NextProgress />
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-right"
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        limit={1}
        theme="light"
      />
    </>
  );
};

export default enhance(App);
