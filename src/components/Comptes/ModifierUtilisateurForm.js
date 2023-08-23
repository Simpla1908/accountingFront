import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Pagination, Form, Button } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs"; // Import de l'icône
import { Link } from "react-router-dom";
import Select from "react-select";
import { useLocation ,useParams } from "react-router-dom";
import API_ROUTES from "../../apiConfig";
// Récupérer la chaîne JSON du localStorage sous la clé "userData"
const storedUserDataJSON = localStorage.getItem("userData");
// Convertir la chaîne JSON en objet JavaScript
const storedUserData = JSON.parse(storedUserDataJSON);

const ModifierUtilisateurForm = () => {
  const { userId } = useParams(); // Récupérer l'ID de l'utilisateur depuis les paramètres d'URL

  const [selectedGroups, setSelectedGroups] = useState([]); // State to hold selected groups
  const [groupOptions, setGroupOptions] = useState([]);
  const [errors,setErrors]=useState('');
  const [success,setSuccess]=useState('');


  const initialFormData = {
    username: '',
    email: '',
    password: '',
    is_superuser: false,
  };

  const [formData, setFormData] =useState(initialFormData);

  const handleGroupChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedGroups(selectedValues);
  };

  const handleInputChange = (event) => {


    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = storedUserData.access; // Replace with your actual token
        const config = {
          headers: {
            Authorization:token, // Make sure to include 'Bearer' before the token
          },
        };
  
        const response = await axios.get(
          `${API_ROUTES.LISTE_GROUPES}${storedUserData.entreprise_id}/`,
          config
        );
  
        const fetchedGroupOptions = response.data.map((group) => ({
          label: group.name,
          value: group.id,
        }));
        setGroupOptions(fetchedGroupOptions);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
  
    fetchData(); // Call the function to fetch data when the component mounts
  }, []);
  

  const handleFormSubmit = async (event) => {

    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      is_superuser: formData.is_superuser,
      groups: selectedGroups,
    };



    try {
     
      const token = storedUserData.access;
      const config = {
        headers: {
          'Content-Type': 'application/json',
           Authorization: token,
        },
      };

      const response = await axios.patch(
        `${API_ROUTES.MODIFIER_UTILISATEUR}${userId}/`,
        JSON.stringify({
          ...userData
        }),
        config
      );

      // Handle success response here (e.g., show success message)
       console.log(response);

      if (response.status === 200) {
        console.log("User data saved successfully:", response.data);
        setSuccess({ detail: "La modification de l'utilisateur s'est fait avec succes." });

      } else {
        setErrors({ detail: "Une erreur s'est produite lors de la création de l'utilisateur." });
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
        `${API_ROUTES.DETAILS_UTILISATEUR}${userId}`,
        config
      );

      // Mettez à jour le state formData avec les informations récupérées
      setFormData({
        username: response.data.username,
        email: response.data.email,
        password:response.data.password,
        is_superuser: response.data.is_superuser,
      });
      setSelectedGroups(response.data.groups.map(group => group.id));
    } catch (error) {
      console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
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
                Modifier utilisateur
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
                  to="/utilisateurs"
                >
                  <i className="fe fe-list me-2"></i> Liste des utilisateurs
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
                    <div className="col-sm-6">
                      <div className="form-group">
                        <p className="mg-b-10">Nom</p>
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          placeholder="Nom"
                          value={formData.username}
                          onChange={handleInputChange}
                          autoComplete='off'
                        />
                      </div>
                      {errors.username && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.username[0]}</b></p>
                      </div>
                        }
                        
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <p className="mg-b-10">Email</p>
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          placeholder="Email"
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
                    <div className="col-sm-6">
                    <div className="form-group">
                        <p className="mg-b-10">Mot de passe</p>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          placeholder="Mot de passe"
                          disabled=""
                          value={formData.password}
                          onChange={handleInputChange}
                          autoComplete='off'
                        />
                      </div>

                      {errors.password && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.password[0]}</b></p>
                      </div>
                        }
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="ckbox" style={{ marginTop: '40px' }}>
                          <input 
                          type="checkbox" 
                          name="is_superuser"
                          checked={formData.is_superuser} // Utilisez la valeur de formData.is_superuser pour cocher ou décocher le champ
                          onChange={handleInputChange}

                          />
                          <span>Administrateur</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row row-sm">
                    <div className="col-sm-12">
                    <div className="form-group">
                        <p className="mg-b-10">Groupes</p>
                        <select name="groups" id="id_groups" multiple={true} value={selectedGroups} onChange={handleGroupChange} className="form-control">
                          {groupOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </div>
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

export default ModifierUtilisateurForm;
