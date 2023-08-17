import React from 'react';
import Header from '../Header';
import SideBar from '../SideBar';
import ListeUtilisateurs from '../Utilisateurs/ListeUtilisateurs';
import Footer from '../Footer';



const Utilisateurs = () => {
  return (
    <div className="page">
          <Header/>
          <SideBar/>
          <ListeUtilisateurs/>
          <Footer/>
    </div>

);
};

export default Utilisateurs;
