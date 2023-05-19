import { memo } from 'react';
import { Layout } from '../../components/layout';
import { Breadcrumbs } from '../../components/modules';
import { DashBoard } from '../../components/templates';
import { useRedirectByUserCheck } from '../../hooks';

const Dashboard = memo(() => {
  const shouldLoadContent = useRedirectByUserCheck();
  const getDefaultTextGenerator = () => '';
  const getTextGenerator = () => '';

  return (
    <>
      {shouldLoadContent && (
        <Layout title="Main" shouldBeOverlay>
          <Breadcrumbs
            getDefaultTextGenerator={getDefaultTextGenerator}
            getTextGenerator={getTextGenerator}
          />
          <DashBoard />
        </Layout>
      )}
    </>
  );
});

export default Dashboard;
