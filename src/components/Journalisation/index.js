import React from 'react';
import Layout from "../Layout";
import ListeEcritures from '../Journalisation/ListeEcritures';


const Journalisation = () => {
  return (
    
      <Layout>
      <div className="page">
        <ListeEcritures />
      </div>
      </Layout>

);
};

export default Journalisation;
