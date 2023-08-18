import React from 'react';
import Layout from "../Layout";
import ListeUtilisateurs from '../Utilisateurs/ListeUtilisateurs';


const Utilisateurs = () => {
  return (
    
      <Layout>
      <div className="page">
        <ListeUtilisateurs />
      </div>
      </Layout>

);
};

export default Utilisateurs;
