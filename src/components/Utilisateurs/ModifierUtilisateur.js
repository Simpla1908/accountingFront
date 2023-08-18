import React from 'react';
import Header from '../Header';
import SideBar from '../SideBar';
import ModifierUtilisateurForm from '../Utilisateurs/ModifierUtilisateurForm';
import Footer from '../Footer';



const ModifierUtilisateur = () => {
  return (
    <div className="page">
          <Header/>
          <SideBar/>
          <ModifierUtilisateurForm/>
          <Footer/>
    </div>

);
};

export default ModifierUtilisateur;
