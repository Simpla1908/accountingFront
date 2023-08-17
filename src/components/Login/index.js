import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import API_ROUTES from '../../apiConfig'; 

const Login = () => {
  const navigate=useNavigate();

  const initialFormData = {
    email: '',
    password: '',
  };

  const [formData, setFormData] =useState(initialFormData);

  const [errors,setErrors]=useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const UtilisateurLogin = await axios.post(
        API_ROUTES.LOGIN,
        JSON.stringify(formData),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (UtilisateurLogin.status === 200) {

        console.log('Success :', UtilisateurLogin.data);
        //Stocker les datas 
        // Convertir l'objet JSON en chaîne JSON

        const userDataJSON = JSON.stringify(UtilisateurLogin.data);

        // Stocker la chaîne JSON dans le localStorage sous la clé "userData"
        localStorage.setItem("userData", userDataJSON);

        // Gérer l'inscription réussie (par exemple, rediriger vers la page de connexion)
        navigate('/dashboard',{replace:true});
        setFormData(initialFormData); // Réinitialiser le formulaire avec les valeurs vides
        setErrors({}); // Réinitialiser l'état des erreurs
      } else {
        setErrors({ detail: "Une erreur s'est produite lors de la Connexion." });
      }
 
    } catch (error) {
      console.log(error);
      if(error.code=='ERR_NETWORK'){
        setErrors({ detail: error.message});
      }else{
        setErrors({ detail: error.response.data.message});

    }
    }
  };




  return (
    <div className="error-1">

    <div className="page main-signin-wrapper">
      {/* Row */}
      <div className="row signpages text-center">
        <div className="col-md-12">
          <div className="card">
            <div className="row row-sm">
              <div className="col-lg-6 col-xl-5 d-none d-lg-block text-center bg-primary details">
                <div className="mt-5 pt-4 p-2 pos-absolute">
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
                  <img
                    src="../assets/img/svgs/user.svg"
                    className="ht-100 mb-0"
                    alt="user"
                  />
                  <h5 className="mt-4 text-white">Signin to Your Account</h5>
                  <span className="tx-white-6 tx-13 mb-5 mt-xl-0">
                    Signin to create, discover and connect with the global community
                  </span>
                </div>
              </div>
              <div className="col-lg-6 col-xl-7 col-xs-12 col-sm-12 login_form ">
                <div className="main-container container-fluid">
                  <div className="row row-sm">
                    <div className="card-body mt-2 mb-2">
                      <img
                        src="../assets/img/brand/logo.png"
                        className="d-lg-none header-brand-img text-start float-start mb-4"
                        alt="logo"
                      />
                      <div className="clearfix"></div>
                      {errors.detail && 
                        <div className="btn btn-danger" style={{ width: '400px', opacity: 1, left: '97px', top: '10px' }}>
                          <p><b>{errors.detail}</b></p>
                        </div>
                        }

                      <form onSubmit={handleSubmit}>
                        <h5 className="text-start mb-2">Signin to Your Account</h5>
                        <p className="mb-4 text-muted tx-13 ms-0 text-start">
                          Signin to create, discover and connect with the global community
                        </p>
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
                       

                        <button className="btn ripple btn-main-primary btn-block">
                          Sign In
                        </button>
                      </form>
                      <div className="text-start mt-5 ms-0">
                        <div className="mb-1">
                          <a href="">Forgot password?</a>
                        </div>
                        <div>
                          Don't have an account? <Link to="/signup">Register Here</Link>
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

      {/* End Row */}
    </div>
  );
};

export default Login;
