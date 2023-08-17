import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import API_ROUTES from '../../apiConfig'; 

const Signup = () => {
   const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_ROUTES.SIGNUP, formData);
      console.log(response);
      if (response.status === 201) {
        // Gérer l'inscription réussie (par exemple, rediriger vers la page de connexion)
      } else {
        // Gérer l'erreur d'inscription (par exemple, afficher un message d'erreur)
      }
    } catch (error) {
      // Gérer l'erreur de requête
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
                      <form onSubmit={handleSubmit}>
                        <div className="form-group text-start">
                          <label>Name</label>
                          <input
                            className="form-control"
                            placeholder="Enter your Name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            autoComplete='off'
                          />
                        </div>
                        <div className="form-group text-start">
                          <label>Email</label>
                          <input
                            className="form-control"
                            placeholder="Enter your email"
                            type="text"
                            value={formData.email}
                            onChange={handleInputChange}
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
                            autoComplete='off'
                          />
                        </div>
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
