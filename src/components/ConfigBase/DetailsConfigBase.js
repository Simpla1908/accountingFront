import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Select from "react-select";
import {useParams } from "react-router-dom";
import API_ROUTES from "../../apiConfig";

// Récupérer la chaîne JSON du localStorage sous la clé "userData"
const storedUserDataJSON = localStorage.getItem("userData");
// Convertir la chaîne JSON en objet JavaScript
const storedUserData = JSON.parse(storedUserDataJSON);

const DetailsConfigBase = () => {

  const [selectedGroups, setSelectedGroups] = useState([]); // State to hold selected groups
  const [groupOptions, setGroupOptions] = useState([]);
  const [errors,setErrors]=useState('');
  const [success,setSuccess]=useState('');


  const initialFormData = {
    nom: '',
    logo: '',
    adresse: '',
    ville: '',
    code_postal: '',
    telephone: '',
    email: '',
    site_web: '',
    description: '',
    idnat: '',
    rccm: '',
    taux: ''
  };

  const [formData, setFormData] =useState(initialFormData);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0]; // Récupérer le premier fichier sélectionné
    setFormData({
      ...formData,
      logo: file, // Stocker le fichier dans l'état du formulaire
    });
  };
  
  const handleInputChange = (event) => {


    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };


  const handleFormSubmit = async (event) => {

    const entrepriseData = {
      nom: formData.nom,
      logo: formData.logo,
      adresse: formData.adresse,
      ville: formData.ville,
      code_postal: formData.code_postal,
      telephone:formData.telephone,
      email: formData.email,
      site_web: formData.site_web,
      description: formData.description,
      idnat: formData.idnat,
      rccm: formData.rccm,
      taux:formData.taux,
    };


    try {
     
      const token = storedUserData.access;
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      console.log(entrepriseData);
      const response = await axios.patch(
        `${API_ROUTES.DETAILS_ENTREPRISE}${storedUserData.entreprise_id}/`,
        JSON.stringify({
          ...entrepriseData
        }),
        config
      );

      // Handle success response here (e.g., show success message)
       console.log(response);

      if (response.status === 200) {
        console.log("Datas saved successfully:", response.data);
        setSuccess({ detail: "L'enrestrement s'est fait avec succes." });
        //Pour gerer la disparution
        setTimeout(() => {
          setSuccess({});
        }, 5000);
        setErrors({}); // Réinitialiser l'état des erreurs


      } else {
        setErrors({ detail: "Une erreur s'est produite lors de l'enregistrement." });
      }
      


    } catch (error) {
      if(error.code==='ERR_NETWORK'){
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

//RECUPERATION CONFIG DE BASE


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
        `${API_ROUTES.DETAILS_ENTREPRISE}${storedUserData.entreprise_id}`
      );

      console.log(response);
      // Mettez à jour le state formData avec les informations récupérées
      setFormData({
        nom: response.data.nom,
        logo: response.data.logo,
        adresse: response.data.adresse,
        ville: response.data.ville,
        code_postal: response.data.code_postal,
        telephone: response.data.telephone,
        email: response.data.email,
        site_web:response.data.site_web,
        description:response.data.description,
        idnat: response.data.idnat,
        rccm: response.data.rccm,
        taux:response.data.taux,
      });

    } catch (error) {
      console.error("Erreur lors de la récupération des données  :", error);
    }
  };

  fetchUserData(); // Appelez la fonction pour récupérer les données de l'utilisateur lorsque le composant se monte
}, []);




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
                Configurations de base
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
                        <p className="mg-b-10">Entreprise</p>
                        <input
                          type="text"
                          className="form-control"
                          name="nom"
                          placeholder="entreprise"
                          value={formData.nom}
                          onChange={handleInputChange}
                          autoComplete='off'
                        />
                      </div>
                      {errors.nom && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.nom[0]}</b></p>
                      </div>
                        }
                        
                    </div>
                  
                  </div>

                  <div className="row row-sm">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <p className="mg-b-10">Logo</p>
                      {formData.logo && typeof formData.logo === "string" ? (
                        <img src={formData.logo} alt="Logo" width="100" height="100" />
                      ) : null}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange} // Appeler la fonction lorsque l'utilisateur sélectionne un fichier
                      />
                    </div>
                    {errors.logo && (
                      <div className="btn btn-danger" style={{ width: "100%", opacity: 1, left: "97px", top: "10px" }}>
                        <p>
                          <b>{errors.logo[0]}</b>
                        </p>
                      </div>
                    )}
                  </div>
                </div>


                    
                  <div className="row row-sm">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <p className="mg-b-10">Adresse</p>
                        <input
                          type="text"
                          className="form-control"
                          name="adresse"
                          placeholder="adresse"
                          value={formData.adresse}
                          onChange={handleInputChange}
                          autoComplete='off'
                        />
                      </div>
                      {errors.adresse && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.adresse[0]}</b></p>
                      </div>
                        }
                        
                    </div>
                  
                  </div>

                  <div className="row row-sm">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <p className="mg-b-10">Ville</p>
                        <input
                          type="text"
                          className="form-control"
                          name="ville"
                          placeholder="ville"
                          value={formData.ville}
                          onChange={handleInputChange}
                          autoComplete='off'
                        />
                      </div>
                      {errors.ville && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.ville[0]}</b></p>
                      </div>
                        }
                        
                    </div>
                  
                  </div>

                  <div className="row row-sm">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <p className="mg-b-10">Code postal</p>
                        <input
                          type="text"
                          className="form-control"
                          name="code_postal"
                          placeholder="Code postal"
                          value={formData.code_postal}
                          onChange={handleInputChange}
                          autoComplete='off'
                        />
                      </div>
                      {errors.code_postal && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.code_postal[0]}</b></p>
                      </div>
                        }
                        
                    </div>
                  
                  </div>

                  <div className="row row-sm">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <p className="mg-b-10">Telephone</p>
                        <input
                          type="text"
                          className="form-control"
                          name="telephone"
                          placeholder="telephone"
                          value={formData.telephone}
                          onChange={handleInputChange}
                          autoComplete='off'
                        />
                      </div>
                      {errors.telephone && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.telephone[0]}</b></p>
                      </div>
                        }
                        
                    </div>
                  
                  </div>

                  <div className="row row-sm">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <p className="mg-b-10">email</p>
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          placeholder="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          autoComplete='off'
                        />
                      </div>
                      {errors.email && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.email[0]}</b></p>
                      </div>
                        }
                        
                    </div>
                  
                  </div>


                  <div className="row row-sm">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <p className="mg-b-10">Site web</p>
                        <input
                          type="text"
                          className="form-control"
                          name="site_web"
                          placeholder="Site web"
                          value={formData.site_web}
                          onChange={handleInputChange}
                          autoComplete='off'
                        />
                      </div>
                      {errors.site_web && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.site_web[0]}</b></p>
                      </div>
                        }
                        
                    </div>
                  
                  </div>


                  <div className="row row-sm">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <p className="mg-b-10">Description</p>
                        <input
                          type="text"
                          className="form-control"
                          name="description"
                          placeholder="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          autoComplete='off'
                        />
                      </div>
                      {errors.description && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.description[0]}</b></p>
                      </div>
                        }
                        
                    </div>
                  
                  </div>

                  <div className="row row-sm">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <p className="mg-b-10">IDNAT</p>
                        <input
                          type="text"
                          className="form-control"
                          name="idnat"
                          placeholder="idnat"
                          value={formData.idnat}
                          onChange={handleInputChange}
                          autoComplete='off'
                        />
                      </div>
                      {errors.idnat && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.idnat[0]}</b></p>
                      </div>
                        }
                        
                    </div>
                  
                  </div>


                  <div className="row row-sm">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <p className="mg-b-10">RCCM</p>
                        <input
                          type="text"
                          className="form-control"
                          name="rccm"
                          placeholder="rccm"
                          value={formData.rccm}
                          onChange={handleInputChange}
                          autoComplete='off'
                        />
                      </div>
                      {errors.rccm && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.rccm[0]}</b></p>
                      </div>
                        }
                        
                    </div>
                  
                  </div>


                  <div className="row row-sm">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <p className="mg-b-10">Taux</p>
                        <input
                          type="text"
                          className="form-control"
                          name="taux"
                          placeholder="taux"
                          value={formData.taux}
                          onChange={handleInputChange}
                          autoComplete='off'
                        />
                      </div>
                      {errors.taux && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.taux[0]}</b></p>
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

export default DetailsConfigBase;
