import { useCallback } from 'react';
import { Layout } from '../../components/layout';
import { Breadcrumbs } from '../../components/modules';
import { ContactsPage } from '../../components/templates';

const WholesaleBuyers = () => {
  const getDefaultTextGenerator = useCallback(() => 'Wholesale customers', []);
  const getTextGenerator = useCallback((param: string) => ({}[param]), []);

  return (
    <Layout title="Wholesale customers" shouldBeOverlay>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      <ContactsPage isWholesaleBuyersPage={true} />
    </Layout>
  );
};

export default WholesaleBuyers;
