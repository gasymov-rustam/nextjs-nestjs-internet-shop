import Head from 'next/head';
import styles from '@/styles/Home.module.css';

const Auth = () => {
  console.log('🚀 => 👍 ==>> index ==>> Line #5 ==>> ');
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
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.tsx</code>
          </p>
        </div>
      </main>
    </>
  );
};

export default Auth;
