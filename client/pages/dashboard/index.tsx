import { memo } from 'react';
import { Layout } from '../../components/layout';
import { DashBoard } from '../../components/templates';

const Dashboard = memo(() => {
  return (
    <Layout>
      <DashBoard />
    </Layout>
  );
});

export default Dashboard;
