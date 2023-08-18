// apiConfig.js
const API_BASE_URL = 'http://127.0.0.1:8000/accountingapi';

const API_ROUTES = {
  SIGNUP: `${API_BASE_URL}/utilisateurs/`,
  CREER_ENTREPRISE: `${API_BASE_URL}/entreprises/`,
  LOGIN: `${API_BASE_URL}/utilisateur/login/`,
  LISTE_UTILISATEURS: `${API_BASE_URL}/utilisateurs_entreprise/`,
  LISTE_GROUPES: `${API_BASE_URL}/groups_entreprise/`,
  DETAILS_UTILISATEUR: `${API_BASE_URL}/utilisateurs/`,
  MODIFIER_UTILISATEUR: `${API_BASE_URL}/utilisateurs/`,
  SUPPRIMER_UTILISATEUR: `${API_BASE_URL}/utilisateurs/`,






 
  // Autres routes d'API
};

export default API_ROUTES;
