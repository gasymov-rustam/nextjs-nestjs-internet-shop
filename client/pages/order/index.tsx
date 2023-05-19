import { useCallback } from 'react';
import { Layout } from '../../components/layout';
import { Breadcrumbs } from '../../components/modules';
import { OrderPage } from '../../components/templates';
import { useRedirectByUserCheck } from '../../hooks';

const Order = () => {
  const shouldLoadContent = useRedirectByUserCheck();
  const getDefaultTextGenerator = useCallback(() => 'Ordering', []);
  const getTextGenerator = useCallback((param: string) => ({}[param]), []);

  return (
    <>
      {' '}
      {shouldLoadContent && (
        <Layout title="Ordering" shouldBeOverlay>
          <Breadcrumbs
            getDefaultTextGenerator={getDefaultTextGenerator}
            getTextGenerator={getTextGenerator}
          />
          <OrderPage />
        </Layout>
      )}
    </>
  );
};

export default Order;
