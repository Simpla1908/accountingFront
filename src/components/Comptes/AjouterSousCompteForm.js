import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_ROUTES from "../../apiConfig";
import Select from 'react-select';


// Récupérer la chaîne JSON du localStorage sous la clé "userData"
const storedUserDataJSON = localStorage.getItem("userData");
// Convertir la chaîne JSON en objet JavaScript
const storedUserData = JSON.parse(storedUserDataJSON);

const AjouterSousCompteForm = () => {

  const [errors,setErrors]=useState('');
  const [success,setSuccess]=useState('');
  const [selectedOption, setSelectedOption] = useState(null);


  const [compteOptions, setCompteOptions] = useState([]);

  const initialFormData = {
    classe: '',
    categorie: '',
    compteId: '',
    numsouscompte:'',
    libsouscompte:''

  };



  const [formData, setFormData] =useState(initialFormData);






  const parseJSONDataToFormData = (jsonData) => {
    const formData = {
      classe: jsonData.classe || '', // Assurez-vous que chaque clé JSON correspond à une propriété formData
      categorie: jsonData.category || '', // Vous pouvez utiliser des valeurs par défaut vides si nécessaire
      compteId: jsonData.id || '',
      numsouscompte: '',
      libsouscompte: '',
    };
    return formData;
  };
  

  

  const handleCompteChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  
    if (selectedOption) {
      const parsedFormData = parseJSONDataToFormData(JSON.parse(selectedOption.value));
      setFormData(parsedFormData);
    } else {
      // Gérer le cas où aucune option n'est sélectionnée
      setFormData(initialFormData); // Réinitialiser le formulaire si aucune option n'est sélectionnée
    }
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
          API_ROUTES.PLAN_COMPTABLE,
          config
        );
  
        const fetchedCompteOptions = response.data
        .filter((compte) => String(compte.numero).length > 2) // Filtrez les comptes avec des numéros de plus de 2 caractères
        .map((compte) => ({
          label: compte.numero + ' ' + compte.compte,
          value: JSON.stringify(compte), // Stockez le JSON complet comme valeur
        }));

        setCompteOptions(fetchedCompteOptions);
      } catch (error) {
        console.error("Error fetching comptes:", error);
      }
    };
  
    fetchData(); // Call the function to fetch data when the component mounts
  }, []);

  const handleFormSubmit = async (event) => {
    console.log(formData);

    // const userData = {
    //   username: formData.username,
    //   email: formData.email,
    //   password: formData.password,
    //   is_superuser: formData.is_superuser,
    //   groups: selectedGroups,
    // };



    // try {
     
    //   const response = await axios.post(
    //     API_ROUTES.SIGNUP,
    //     JSON.stringify({
    //       ...userData,
    //       entreprise: storedUserData.entreprise_id,  // Assurez-vous que le champ "entreprise" correspond à l'ID de l'entreprise enregistrée
    //     }),
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     }
    //   );

    //   // Handle success response here (e.g., show success message)
    //    console.log("User data saved successfully:", response.data);

    //   if (response.status === 201) {
    //     console.log("User data saved successfully:", response.data);
    //     setFormData(initialFormData); // Réinitialiser le formulaire avec les valeurs vides
    //     setErrors({}); // Réinitialiser l'état des erreurs
    //     setSuccess({ detail: "L'enregistrement de l'utilisateur s'est fait avec succes." });

    //   } else {
    //     setErrors({ detail: "Une erreur s'est produite lors de la création de l'utilisateur." });
    //   }
      


    // } catch (error) {
    //   console.log(error);
    //   if(error.code=='ERR_NETWORK'){
    //     setErrors({ detail: error.message});
    //   }else{
    //   console.log(error.response.data);
    //   const errorResponse = error.response.data;
    //   setErrors(errorResponse);
    // }
    // }
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
                Ajouter sous-compte
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
                  to="/comptes"
                >
                  <i className="fe fe-list me-2"></i> Liste des comptes
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
                        <p className="mg-b-10">Classe</p>
                        <input
                          type="text"
                          className="form-control"
                          name="classe"
                          value={formData.classe}
                          autoComplete='off'
                          disabled
                        />
                      </div>
                    
                        
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <p className="mg-b-10">Catégorie</p>
                        <input
                          type="text"
                          className="form-control"
                          name="categorie"
                          value={formData.categorie}
                          autoComplete='off'
                          disabled
                        />
                      </div>
                    
                    </div>
                  </div>


                    

                  <div className="row row-sm">
                    <div className="col-sm-6">
                    <div className="form-group">
                        <p className="mg-b-10">Compte</p>
                       

                       {/* <select name="compte" onChange={handleCompteChange} className="form-control">
                          <option value="0">Sélectionnez un compte</option>
                          {compteOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select> */}

                        <Select
                          name="compte"
                          value={selectedOption}
                          onChange={handleCompteChange}
                          options={compteOptions}
                          placeholder="Sélectionnez un compte"
                        />

                      </div>

                      {errors.compte && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.compte[0]}</b></p>
                      </div>
                        }
                    </div>
                    <div className="col-sm-6">
                    <div className="form-group">
                        <p className="mg-b-10">Numéro sous - compte</p>
                      <div class="input-group">
													<div class="input-group-text  border-end-0">
														906
													</div>
													<input 
                           class="form-control"
                           value={formData.numsouscompte} 
                           onChange={(e) => setFormData({ ...formData, numsouscompte: e.target.value })}
                           placeholder="Numéro sous - compte"
                           type="text" name="numsouscompte"
                           autoComplete='off'
                          />
											</div>

                      </div>

                         

                      {errors.numsouscompte && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.numsouscompte[0]}</b></p>
                      </div>
                        }
                    </div>
                  </div>



                  <div className="row row-sm">
                    <div className="col-sm-6">
                    <div className="form-group">
                        <p className="mg-b-10">Libellé sous - compte</p>
                        <input
                          type="text"
                          className="form-control"
                          name="libsouscompte"
                          placeholder="Libellé sous - compte"
                          disabled=""
                          value={formData.libsouscompte}
                          onChange={(e) => setFormData({ ...formData, libsouscompte: e.target.value })}
                          autoComplete='off'
                        />

                       






                      </div>

                      {errors.libsouscompte && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.libsouscompte[0]}</b></p>
                      </div>
                        }
                    </div>
                    <div className="col-sm-6">
                    
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

export default AjouterSousCompteForm;
