import { useStore } from 'effector-react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { getBoilerPartsFx } from '../../app';
import { Layout } from '../../components/layout';
import { Breadcrumbs } from '../../components/modules';
import { PartPage } from '../../components/templates';
import { RequestsPath } from '../../constants';
import { $boilerPart, setBoilerPart } from '../../context/boilerPart';
import { useRedirectByUserCheck } from '../../hooks';
import { IQueryParams } from '../../types';
import Custom404 from '../404';

const CatalogPartPage = ({ query }: { query: IQueryParams }) => {
  const shouldLoadContent = useRedirectByUserCheck();
  const boilerPart = useStore($boilerPart);
  const [error, setError] = useState(false);
  const router = useRouter();

  const getDefaultTextGenerator = useCallback(
    (subpath: string) => subpath.replace('catalog', 'Catalog'),
    []
  );
  const getTextGenerator = useCallback((param: string) => ({}[param]), []);
  const lastCrumb = document.querySelector('.last-crumb') as HTMLElement;

  useEffect(() => {
    loadBoilerPart();
  }, [router.asPath]);

  useEffect(() => {
    if (lastCrumb) {
      lastCrumb.textContent = boilerPart.name;
    }
  }, [lastCrumb, boilerPart]);

  const loadBoilerPart = async () => {
    try {
      const data = await getBoilerPartsFx(
        `${RequestsPath.BOILER_PARTS_FIND}/${query.partId}`
      );

      if (!data) {
        setError(true);
        return;
      }

      setBoilerPart(data);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      {error ? (
        <Custom404 />
      ) : (
        shouldLoadContent && (
          <Layout
            title={shouldLoadContent ? boilerPart.name : ''}
            shouldBeOverlay
          >
            <Breadcrumbs
              getDefaultTextGenerator={getDefaultTextGenerator}
              getTextGenerator={getTextGenerator}
            />
            <PartPage />
          </Layout>
        )
      )}
    </>
  );
};

export async function getServerSideProps(context: { query: IQueryParams }) {
  return {
    props: { query: { ...context.query } },
  };
}

export default CatalogPartPage;
