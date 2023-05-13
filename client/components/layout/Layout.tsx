import Head from 'next/head';
import { Footer, Header } from '../templates';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
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
    <Header />
    {children}
    <Footer />
  </>
);
