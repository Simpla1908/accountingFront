import { BrowserRouter as Router,Route,Routes  } from 'react-router-dom';
import Signup from '../Signup';
import Login from '../Login';
import Dashboard from '../Dashboard';
import Utilisateurs from '../Utilisateurs';
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
    <Route path="*" element={<ErrorPage/>}/>

    </Routes>

 </Router>
  );
}

export default App;
