import { useCallback } from 'react';
import { Layout } from '../../components/layout';
import { Breadcrumbs } from '../../components/modules';
import { AboutPage } from '../../components/templates';

const About = () => {
  const getDefaultTextGenerator = useCallback(() => 'About Company', []);
  const getTextGenerator = useCallback((param: string) => ({}[param]), []);

  return (
    <Layout shouldBeOverlay title="About Company">
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      <AboutPage />
    </Layout>
  );
};

export default About;
