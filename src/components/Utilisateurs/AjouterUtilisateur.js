import React from 'react';
import Header from '../Header';
import SideBar from '../SideBar';
import AjouterUtilisateurForm from '../Utilisateurs/AjouterUtilisateurForm';
import Footer from '../Footer';



const AjouterUtilisateur = () => {
  return (
    <div className="page">
          <Header/>
          <SideBar/>
          <AjouterUtilisateurForm/>
          <Footer/>
    </div>

);
};

export default AjouterUtilisateur;
