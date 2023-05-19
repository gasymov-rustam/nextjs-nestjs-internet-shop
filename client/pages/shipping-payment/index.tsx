import { useCallback } from 'react';
import { Layout } from '../../components/layout';
import { Breadcrumbs } from '../../components/modules';
import { ShippingPayment } from '../../components/templates';

const ShippingPaymentPage = () => {
  const getDefaultTextGenerator = useCallback(() => 'Shipping and Payment', []);
  const getTextGenerator = useCallback((param: string) => ({}[param]), []);

  return (
    <Layout title="Shipping and Payment" shouldBeOverlay>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      <ShippingPayment />
    </Layout>
  );
};

export default ShippingPaymentPage;
