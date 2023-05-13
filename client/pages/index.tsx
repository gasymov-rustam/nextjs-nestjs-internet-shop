import Head from 'next/head';
import { Auth as AuthPage } from '../components/templates';

const Auth = () => {
  return (
    <>
      <Head>
        <title>
          Aqua Termiks {/* | {shouldLoadContent ? 'Authorization' : ''} */}
        </title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      <AuthPage />
    </>
  );
};

export default Auth;
