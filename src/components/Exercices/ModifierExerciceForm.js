import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import API_ROUTES from "../../apiConfig";
// Récupérer la chaîne JSON du localStorage sous la clé "userData"
const storedUserDataJSON = localStorage.getItem("userData");
// Convertir la chaîne JSON en objet JavaScript
const storedUserData = JSON.parse(storedUserDataJSON);

const ModifierExerciceForm = () => {
  const { userId } = useParams(); // Récupérer l'ID de l'utilisateur depuis les paramètres d'URL

  const [errors,setErrors]=useState('');
  const [success,setSuccess]=useState('');


  const initialFormData = {
    lib: '',
    debut: '',
    fin: '',
  };

  const [formData, setFormData] =useState(initialFormData);

  const handleInputChange = (event) => {


    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  

  const handleFormSubmit = async (event) => {

    const userData = {
      lib: formData.lib,
      debut: formData.debut,
      fin: formData.fin,
      annee: new Date(formData.debut).getFullYear()
    };

    console.log(userData);

    try {
      const token = storedUserData.access; // Replace with your actual token
      const response = await axios.patch(
        `${API_ROUTES.MODIFIER_EXERCICE}${userId}/`,
        JSON.stringify({
          ...userData
        }),
        {
          headers: {
            'Content-Type': 'application/json',
             Authorization:token, 

          },
        }
      );

      // Handle success response here (e.g., show success message)
      console.log(response);

      if (response.status === 200) {
        console.log("Exercice data saved successfully:", response.data);
        setErrors({}); // Réinitialiser l'état des erreurs
        setSuccess({ detail: "La modification de l'exercice s'est fait avec succes." });

      } else {
        setErrors({ detail: "Une erreur s'est produite lors de la création de l'exercice." });
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


  const handleSaveButtonClick = async (event) => {
    event.preventDefault(); // Prevent the default behavior of the button click
    
    try {
      await handleFormSubmit(); // Call the form submission function
    } catch (error) {
      // Handle error here (e.g., show error message)
      console.error("Error saving user data:", error);
    }
  };

//RECUPERATION DATAS BY ID


useEffect(() => {
  const fetchUserData = async () => {
    try {
      // Faites une requête pour récupérer les informations de l'utilisateur à l'aide de userId
      const token = storedUserData.access;
      const config = {
        headers: {
          Authorization: token,
        },
      };

      const response = await axios.get(
        `${API_ROUTES.DETAILS_EXERCICE}${userId}`,
        config
      );

      // Mettez à jour le state formData avec les informations récupérées
      setFormData({
        lib: response.data.lib,
        debut: response.data.debut,
        fin:response.data.fin,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des données de l'exercice :", error);
    }
  };

  fetchUserData(); // Appelez la fonction pour récupérer les données de l'utilisateur lorsque le composant se monte
}, [userId]);




  return (
    <div className="main-content side-content pt-0">
      <div className="main-container container-fluid">
        <div className="inner-body">
          <div className="page-header">
            <div>
              <h2
                className="main-content-title tx-24 mg-b-5"
                style={{ marginTop: "100px" }}
              >
                Modifier exercice
              </h2>
            </div>
            <div className="d-flex">
              <div className="justify-content-center">
                <button
                  type="button"
                  className="btn btn-primary btn-icon-text my-2 me-2"
                  onClick={handleSaveButtonClick}
                >
                  <i className="fe fe-save me-2"></i> Enregistrer
                </button>
                <Link
                  type="button"
                  className="btn btn-white btn-icon-text my-2 me-2"
                  to="/exercices"
                >
                  <i className="fe fe-list me-2"></i> Liste des exercices
                </Link>

                {/* 
                <button type="button" className="btn btn-primary my-2 btn-icon-text">
                  <i className="fe fe-download-cloud me-2"></i> Download Report
                </button> */}
              </div>
            </div>
          </div>

          <div className="row row-sm">
            <div className="col-lg-12 col-md-12">
              <div className="card custom-card">
                <div className="card-body">
                <form onSubmit={handleFormSubmit}>

                <div className="row row-sm">
                       {success.detail && 
                        <div className="btn btn-success" style={{opacity: 1, left: '97px', top: '10px',marginBottom:'20px' }}>
                          <p><b>{success.detail}</b></p>
                       </div>
                       }
                </div>   

                <div className="row row-sm">
                       {errors.detail && 
                        <div className="btn btn-danger" style={{opacity: 1, left: '97px', top: '10px',marginBottom:'20px' }}>
                          <p><b>{errors.detail}</b></p>
                       </div>
                       }
                </div>     
               
                <div className="row row-sm">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <p className="mg-b-10">Libellé</p>
                        <input
                          type="text"
                          className="form-control"
                          name="lib"
                          placeholder="Libellé"
                          value={formData.lib}
                          onChange={handleInputChange}
                          autoComplete='off'
                        />
                      </div>
                      {errors.lib && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.lib[0]}</b></p>
                      </div>
                        }
                        
                    </div>
                   
                  </div>


                    

                  <div className="row row-sm">
                    <div className="col-sm-6">
                    <div className="form-group">
                        <p className="mg-b-10">Date de début</p>
                        <input
                          type="date"
                          className="form-control"
                          name="debut"
                          placeholder="Date de début"
                          disabled=""
                          value={formData.debut}
                          onChange={handleInputChange}
                          autoComplete='off'
                        />
                      </div>

                      {errors.debut && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.debut[0]}</b></p>
                      </div>
                        }
                    </div>
                    <div className="col-sm-6">
                    <div className="form-group">
                        <p className="mg-b-10">Date de fin</p>
                        <input
                          type="date"
                          className="form-control"
                          name="fin"
                          placeholder="Date de début"
                          disabled=""
                          value={formData.fin}
                          onChange={handleInputChange}
                          autoComplete='off'
                        />
                      </div>

                      {errors.fin && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.fin[0]}</b></p>
                      </div>
                        }
                    </div>
                  </div>
    
                  </form>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifierExerciceForm;
