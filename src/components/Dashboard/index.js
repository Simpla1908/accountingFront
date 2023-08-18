import React from "react";
import Layout from "../Layout";
import DashboardContent from "../Dashboard/DashboardContent";

const Dashboard = () => {
  return (
    <Layout>
      <div className="page">
        <DashboardContent />
      </div>
    </Layout>
  );
};

export default Dashboard;
