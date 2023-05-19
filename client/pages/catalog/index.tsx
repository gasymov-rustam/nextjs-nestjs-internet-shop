import { memo, useCallback } from 'react';
import { Layout } from '../../components/layout';
import { Breadcrumbs } from '../../components/modules';
import { CatalogContent } from '../../components/templates';
import { useRedirectByUserCheck } from '../../hooks';
import { IQueryParams } from '../../types';

const Catalog = memo(({ query }: { query: IQueryParams }) => {
  const shouldLoadContent = useRedirectByUserCheck();
  const getDefaultTextGenerator = useCallback(() => 'Catalog', []);
  const getTextGenerator = useCallback((param: string) => ({}[param]), []);

  return (
    <>
      {shouldLoadContent && (
        <Layout title="Catalog" shouldBeOverlay>
          <Breadcrumbs
            getDefaultTextGenerator={getDefaultTextGenerator}
            getTextGenerator={getTextGenerator}
          />

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
