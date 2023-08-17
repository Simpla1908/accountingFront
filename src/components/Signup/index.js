import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import API_ROUTES from '../../apiConfig'; 


const Signup = () => {

  const navigate=useNavigate();

  const [entrepriseData, setEntrepriseData] = useState({
    nom : 'None',
    adresse : 'None',
    ville : 'None',
    code_postal : 'None',
    telephone : 'None',
    email : 'none@gmail.com',
    idnat : 'None',
    rccm : 'None',
    taux : 1
  });

  const initialFormData = {
    username: '',
    email: '',
    password: '',
  };

  const [formData, setFormData] =useState(initialFormData);

  const [errors,setErrors]=useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
          // Enregistrer l'entreprise
          const entrepriseResponse = await axios.post(
            API_ROUTES.CREER_ENTREPRISE,
            JSON.stringify(entrepriseData),  
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

    if (entrepriseResponse.status === 201) {
      console.log('Entreprise enregistrée :', entrepriseResponse.data);

      // Utiliser les informations de l'entreprise pour créer l'utilisateur
      const utilisateurResponse = await axios.post(
        API_ROUTES.SIGNUP,
        JSON.stringify({
          ...formData,
          entreprise: entrepriseResponse.data.id,  // Assurez-vous que le champ "entreprise" correspond à l'ID de l'entreprise enregistrée
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (utilisateurResponse.status === 201) {
        console.log('Utilisateur créé :', utilisateurResponse.data);

        // Gérer l'inscription réussie (par exemple, rediriger vers la page de connexion)
        navigate('/login',{replace:true});
        setFormData(initialFormData); // Réinitialiser le formulaire avec les valeurs vides
        setErrors({}); // Réinitialiser l'état des erreurs
      } else {
        setErrors({ detail: "Une erreur s'est produite lors de la création de l'utilisateur." });
      }
    } else {
      setErrors({ detail: "Une erreur s'est produite lors de l'enregistrement de l'entreprise." });
    }

    } catch (error) {
      console.log(error);
      if(error.code=='ERR_NETWORK'){
        setErrors({ detail: error.message});
      }else{
      console.log(error.response.data);
      const errorResponse = error.response.data;
      setErrors(errorResponse);
    }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="error-1">
    <div className="page main-signin-wrapper">
      <div className="row signpages text-center">
        <div className="col-md-12">
          <div className="card">
            <div className="row row-sm">
              <div className="col-lg-6 col-xl-5 d-none d-lg-block text-center bg-primary details">
                <div className="mt-5 pt-5 p-2 pos-absolute">
                  <img
                    src="../assets/img/brand/logo-light.png"
                    className="header-brand-img mb-4"
                    alt="logo"
                  />
                  <div className="clearfix"></div>
                  <img
                    src="../assets/img/svgs/user.svg"
                    className="ht-100 mb-0"
                    alt="user"
                  />
                  <h5 className="mt-4 text-white">Create Your Account</h5>
                  <span className="tx-white-6 tx-13 mb-5 mt-xl-0">
                    Signup to create, discover and connect with the global community
                  </span>
                </div>
              </div>
              <div className="col-lg-6 col-xl-7 col-xs-12 col-sm-12 login_form ">
                <div className="main-container container-fluid">
                  <div className="row row-sm">
                    <div className="card-body mt-2 mb-2">
                      <img
                        src="../assets/img/brand/logo-light.png"
                        className="d-lg-none header-brand-img text-start float-start mb-4 error-logo-light"
                        alt="logo"
                      />
                      <img
                        src="../assets/img/brand/logo.png"
                        className=" d-lg-none header-brand-img text-start float-start mb-4 error-logo"
                        alt="logo"
                      />
                      <div className="clearfix"></div>
                      <h5 className="text-start mb-2">Signup for Free</h5>
                      <p className="mb-4 text-muted tx-13 ms-0 text-start">
                        It's free to signup and only takes a minute.
                      </p>
                      {errors.detail && 
                        <div className="btn btn-danger" style={{ width: '400px', opacity: 1, left: '97px', top: '10px' }}>
                          <p><b>{errors.detail}</b></p>
                        </div>
                        }

                      <form onSubmit={handleSubmit}>
                        <div className="form-group text-start">
                          <label>Name</label>
                          <input
                            className="form-control"
                            placeholder="Enter your Name"
                            type="text"
                            value={formData.username}
                            onChange={handleInputChange}
                            name='username'
                            autoComplete='off'

                          />
                        </div>
                        {errors.username && 
                        <div className="btn btn-danger" style={{ width: '400px', opacity: 1, left: '97px', top: '10px' }}>
                          <p><b>{errors.username[0]}</b></p>
                        </div>
                        }
                        <div className="form-group text-start">
                          <label>Email</label>
                          <input
                            className="form-control"
                            placeholder="Enter your email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            name='email'
                            autoComplete='off'
                          />
                        </div>
                        {errors.email && 
                        <div className="btn btn-danger" style={{ width: '400px', opacity: 1, left: '97px', top: '10px' }}>
                          <p><b>{errors.email[0]}</b></p>
                        </div>
                        }
                        <div className="form-group text-start">
                          <label>Password</label>
                          <input
                            className="form-control"
                            placeholder="Enter your password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            name='password'
                            autoComplete='off'
                          />
                        </div>
                        {errors.password && 
                        <div className="btn btn-danger" style={{ width: '400px', opacity: 1, left: '97px', top: '10px',marginBottom:'10px' }}>
                          <p><b>{errors.password[0]}</b></p>
                        </div>
                        }
                        <button className="btn ripple btn-main-primary btn-block">
                          Create Account
                        </button>
                      </form>
                      <div className="text-start mt-5 ms-0">
                        <p className="mb-0">
                          Already have an account? <Link to="/login">Sign In</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default Signup;
