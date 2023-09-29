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
  ALL_PERMISSIONS: `${API_BASE_URL}/all-permissions/`,
  AJOUTER_GROUPE: `${API_BASE_URL}/groups/`,
  SUPPRIMER_GROUPE: `${API_BASE_URL}/groups/`,
  DETAILS_GROUPE: `${API_BASE_URL}/groups/`,
  MODIFIER_GROUPE: `${API_BASE_URL}/groups/`,
  LISTE_EXERCICES: `${API_BASE_URL}/exercices_entreprise/`,
  AJOUTER_EXERCICE: `${API_BASE_URL}/exercices/`,
  SUPPRIMER_EXERCICE: `${API_BASE_URL}/exercices/`,
  MODIFIER_EXERCICE: `${API_BASE_URL}/exercices/`,
  DETAILS_EXERCICE: `${API_BASE_URL}/exercices/`,
  PLAN_COMPTABLE: `${API_BASE_URL}/plancomptable/`,
  SOUS_COMPTE: `${API_BASE_URL}/souscomptes/`,
  DETAILS_ENTREPRISE: `${API_BASE_URL}/entreprises/`,






 
  // Autres routes d'API
};



export default API_ROUTES;
