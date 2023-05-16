import { memo } from 'react';
import { Layout } from '../../components/layout';
import { CatalogContent } from '../../components/templates';
import { useRedirectByUserCheck } from '../../hooks';
import { IQueryParams } from '../../types';

const Catalog = memo(({ query }: { query: IQueryParams }) => {
  const shouldLoadContent = useRedirectByUserCheck();

  return (
    <>
      {shouldLoadContent && (
        <Layout title="Catalog" shouldBeOverlay>
          <CatalogContent query={query} />
        </Layout>
      )}
    </>
  );
});

export const getServerSideProps = (context: { query: IQueryParams }) => {
  return {
    props: { query: { ...context.query } },
  };
};

export default Catalog;
