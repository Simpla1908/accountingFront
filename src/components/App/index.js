import { BrowserRouter as Router,Route,Routes  } from 'react-router-dom';
import Signup from '../Signup';
import Login from '../Login';
import Dashboard from '../Dashboard';
import Utilisateurs from '../Utilisateurs';
import AjouterUtilisateur from '../Utilisateurs/AjouterUtilisateur';
import ModifierUtilisateur from '../Utilisateurs/ModifierUtilisateur';
import Groupes from '../Groupes';
import AjouterGroupe from '../Groupes/AjouterGroupe';
import ModifierGroupe from '../Groupes/ModifierGroupe';
import Exercices from '../Exercices';
import AjouterExercice from '../Exercices/AjouterExercice';
import ModifierExercice from '../Exercices/ModifierExercice';
import Comptes from '../Comptes';
import AjouterSousCompte from '../Comptes/AjouterSousCompte';
import ModifierSousCompte from '../Comptes/ModifierSousCompte';
import ConfigBase from '../ConfigBase/';
import Journalisation from '../Journalisation';
import AjouterEcriture from '../Journalisation/AjouterEcriture';

import ErrorPage from '../ErrorPage';


function App() {
  return (
    <Router>

    <Routes>

    <Route exact path='/' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/utilisateurs' element={<Utilisateurs/>}/>
    <Route path='/ajouter-utilisateur' element={<AjouterUtilisateur/>}/>
    <Route path='/modifier-utilisateur/:userId' element={<ModifierUtilisateur/>}/>
    <Route path='/groupes' element={<Groupes/>}/>
    <Route path='/ajouter-groupe' element={<AjouterGroupe/>}/>
    <Route exact path='/modifier-groupe/:userId' element={<ModifierGroupe/>}/>
    <Route path='/exercices' element={<Exercices/>}/>
    <Route path='/ajouter-exercice' element={<AjouterExercice/>}/>
    <Route path='/modifier-exercice/:userId' element={<ModifierExercice/>}/>
    <Route path='/comptes' element={<Comptes/>}/>
    <Route path='/ajouter-sous-compte' element={<AjouterSousCompte/>}/>
    <Route path='/modifier-sous-compte/:compteId' element={<ModifierSousCompte/>}/>
    <Route path='/ConfigBase' element={<ConfigBase/>}/>
    <Route path='/journalisation' element={<Journalisation/>}/>
    <Route path='/ajouter-ecriture' element={<AjouterEcriture/>}/>
    <Route path="*" element={<ErrorPage/>}/>

    </Routes>

 </Router>
  );
}

export default App;
