import { useCallback } from 'react';
import { Layout } from '../../components/layout';
import { Breadcrumbs } from '../../components/modules';
import { ContactsPage } from '../../components/templates';

const Contacts = () => {
  const getDefaultTextGenerator = useCallback(() => 'Contacts', []);
  const getTextGenerator = useCallback((param: string) => ({}[param]), []);

  return (
    <Layout title="Contacts" shouldBeOverlay>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />

      <ContactsPage />
    </Layout>
  );
};

export default Contacts;
