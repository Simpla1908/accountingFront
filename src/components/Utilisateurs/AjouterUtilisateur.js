import React from 'react';
import Layout from "../Layout";
import AjouterUtilisateurForm from '../Utilisateurs/AjouterUtilisateurForm';



const AjouterUtilisateur = () => {
  return (
  
        <Layout>
        <div className="page">
          <AjouterUtilisateurForm />
        </div>
        </Layout>

);
};

export default AjouterUtilisateur;
