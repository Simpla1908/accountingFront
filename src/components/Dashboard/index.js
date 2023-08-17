import React from 'react';
import Header from '../Header';
import SideBar from '../SideBar';
import DashboardContent from '../Dashboard/DashboardContent';
import Footer from '../Footer';


const Dashboard = () => {
  return (
      		<div className="page">
                <Header/>
                <SideBar/>
                <DashboardContent/>
                <Footer/>
          </div>

  );
};

export default Dashboard;
