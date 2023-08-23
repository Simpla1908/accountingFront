import React from 'react';
import Layout from "../Layout";
import ModifierUtilisateurForm from '../Utilisateurs/ModifierUtilisateurForm';



const ModifierUtilisateur = () => {
  return (    
      <Layout>
      <div className="page">
        <ModifierUtilisateurForm />
      </div>
      </Layout>

);
};

export default ModifierUtilisateur;
