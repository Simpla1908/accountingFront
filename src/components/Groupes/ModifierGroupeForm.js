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

const ModifierGroupeForm = () => {
  const { userId } = useParams(); // Récupérer l'ID de l'utilisateur depuis les paramètres d'URL

  const [selectedGroups, setSelectedGroups] = useState([]); // State to hold selected groups
  const [groupOptions, setGroupOptions] = useState([]);
  const [errors,setErrors]=useState('');
  const [success,setSuccess]=useState('');


  const initialFormData = {
    name: '',
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
          API_ROUTES.ALL_PERMISSIONS,
          config
        );
  
        const fetchedGroupOptions = response.data.map((group) => ({
          label: group.name,
          value: group.id,
        }));
        setGroupOptions(fetchedGroupOptions);
      } catch (error) {
        console.error("Error fetching perms:", error);
      }
    };
  
    fetchData(); // Call the function to fetch data when the component mounts
  }, []);
  

  const handleFormSubmit = async (event) => {

    const userData = {
      name: formData.name,
      permissions: selectedGroups
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
        `${API_ROUTES.MODIFIER_GROUPE}${userId}/`,
        JSON.stringify({
          ...userData
        }),
        config
      );

      // Handle success response here (e.g., show success message)
       console.log(response);

      if (response.status === 200) {
        console.log("User data saved successfully:", response.data);
        setSuccess({ detail: "La modification du groupe s'est fait avec succes." });

      } else {
        setErrors({ detail: "Une erreur s'est produite lors de la modification." });
      }
      


    } catch (error) {
      console.log(error);
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
        `${API_ROUTES.DETAILS_GROUPE}${userId}`,
        config
      );
      // Mettez à jour le state formData avec les informations récupérées
      setFormData({
        name: response.data.name,
      });
     // console.log(response.data.permissions);
      setSelectedGroups(response.data.permissions);

    } catch (error) {
      console.error("Erreur lors de la récupération des données  :", error);
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
                Modifier Groupe
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
                  to="/groupes"
                >
                  <i className="fe fe-list me-2"></i> Liste des groupres
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
                        <p className="mg-b-10">Nom</p>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="Nom"
                          value={formData.name}
                          onChange={handleInputChange}
                          autoComplete='off'
                        />
                      </div>
                      {errors.name && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.name[0]}</b></p>
                      </div>
                        }
                        
                    </div>
                  
                  </div>


                    

                  <div className="row row-sm">
                    <div className="col-sm-12">
                    <div className="form-group">
                        <p className="mg-b-10">Permissions</p>
                        <select name="groups" id="id_groups" multiple={true} value={selectedGroups} onChange={handleGroupChange} className="form-control" style={{ height: '300px'}}>
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

export default ModifierGroupeForm;
