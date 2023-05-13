import Head from 'next/head';
import { Footer, Header } from '../templates';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const Layout = ({ title, children }: LayoutProps) => (
  <>
    <Head>
      <title>Aqua Termiks {title}</title>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
    </Head>
    <Header />
    <main>
      <div className="overlay" />
      {children}
    </main>
    <Footer />
  </>
);
