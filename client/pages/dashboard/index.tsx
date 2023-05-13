import { memo } from 'react';
import { Layout } from '../../components/layout';
import { DashBoard } from '../../components/templates';
import { useRedirectByUserCheck } from '../../hooks';

const Dashboard = memo(() => {
  const shouldLoadContent = useRedirectByUserCheck();

  return (
    <>
      {shouldLoadContent && (
        <Layout title="Main">
          <DashBoard />
        </Layout>
      )}
    </>
  );
});

export default Dashboard;
