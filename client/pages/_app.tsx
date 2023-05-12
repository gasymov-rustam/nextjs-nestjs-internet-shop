import { withHydrate } from 'effector-next';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import type { AppProps } from 'next/app';

import '@/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

const enhance = withHydrate();

const App = ({ Component, pageProps }: AppProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <>
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
