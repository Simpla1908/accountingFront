import React from 'react';
import Header from '../Header';
import SideBar from '../SideBar';
import Footer from '../Footer';

const Layout = ({ children }) => {
  return (
    <div className="page">
      <Header />
      <SideBar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
