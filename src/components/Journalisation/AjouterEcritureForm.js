import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_ROUTES from "../../apiConfig";
import Select from 'react-select';


// Récupérer la chaîne JSON du localStorage sous la clé "userData"
const storedUserDataJSON = localStorage.getItem("userData");
// Convertir la chaîne JSON en objet JavaScript
const storedUserData = JSON.parse(storedUserDataJSON);

const AjouterEcritureForm = () => {

  const initialFormData = {
    exercice_id: '',
    journal_id: '',
    reference: '',
    dte: '',
    devise:'',
    libelle:''
  };

  
  // const initialFormData2 = {
  //   dte : '',
  //   dteaff : '',
  //   dtetime : '',
  //   libelle : '',
  //   devise : '',
  //   taux : '',
  //   journal_id : '',
  //   exercice_id : '',
  //   reference : '',
  //   beneficiaire: '',
  //   entreprise_id: '',
  //   user_id : ''

  // };
  const [formData, setFormData] =useState(initialFormData);
  const [errors,setErrors]=useState('');
  const [success,setSuccess]=useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [compteOptions, setCompteOptions] = useState([]);


  //RECUPERATION COMPTES

  const parseJSONDataToFormData = (jsonData) => {
    const formData = {
      classe: jsonData.classe || '', // Assurez-vous que chaque clé JSON correspond à une propriété formData
      categorie: jsonData.category || '', // Vous pouvez utiliser des valeurs par défaut vides si nécessaire
      compteId: jsonData.id || '',
      compteNum: jsonData.numero || '',
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
        .filter((compte) => String(compte.numero).length === 3) // Filtrez les comptes avec des numéros de plus de 2 caractères
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

  //RECUPERATION COMPTES


  const handleFormSubmit = async (event) => {

    const compteDatas= {
      libelle: formData.libsouscompte,
      numero: formData.numsouscompte,
      compte: formData.compteId,
      entreprise: storedUserData.entreprise_id
    };

    console.log(compteDatas);


    try {
      const token = storedUserData.access; // Replace with your actual token
      const response = await axios.post(
        API_ROUTES.SOUS_COMPTE,
        JSON.stringify({...compteDatas}),
        {
          headers: {
            'Content-Type': 'application/json',
             Authorization:token, 
          },
        }
      );

       console.log(response);

      if (response.status === 201) {
        console.log("Compte data saved successfully:", response.data);
        setFormData(initialFormData); // Réinitialiser le formulaire avec les valeurs vides
        setErrors({}); // Réinitialiser l'état des erreurs
        setSuccess({ detail: "L'enregistrement du compte s'est fait avec succes." });
        setSelectedOption(null);

      } else {
        setErrors({ detail: "Une erreur s'est produite lors de la création du compte." });
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
      console.error("Error saving comptes data:", error);
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
                Journaliser
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
                  <i className="fe fe-list me-2"></i> Liste des écritures
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
                        <p className="mg-b-10">Exercice</p>
                        <Select
                          name="exercice_id"
                          value={selectedOption}
                          onChange={handleCompteChange}
                          options={compteOptions}
                          placeholder="Sélectionnez un exercice"
                        />
                      </div>
                      {errors.exercice_id && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.exercice_id[0]}</b></p>
                      </div>
                        }
                        
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <p className="mg-b-10">Type de journal</p>
                        <Select
                          name="journal_id"
                          value={selectedOption}
                          onChange={handleCompteChange}
                          options={compteOptions}
                          placeholder="Sélectionnez un compte"
                        />
                      </div>
                      {errors.journal_id && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.journal_id[0]}</b></p>
                      </div>
                        }
                    
                    </div>
                  </div>




                  <div className="row row-sm">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <p className="mg-b-10">Réference</p>
                        <input
                          type="text"
                          className="form-control"
                          name="lib"
                          placeholder="Libellé"
                          value={formData.reference}
                          autoComplete='off'
                        />
                      </div>
                      {errors.reference && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.reference[0]}</b></p>
                      </div>
                        }
                    
                        
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <p className="mg-b-10">Date</p>
                        <input
                          type="date"
                          className="form-control"
                          name="debut"
                          placeholder="Date de début"
                          disabled=""
                          autoComplete='off'
                        />
                      </div>
                      {errors.reference && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.dte[0]}</b></p>
                      </div>
                        }
                    
                    </div>
                  </div>

                    

                  <div className="row row-sm">
                    <div className="col-sm-6">
                    <div className="form-group">
                        <p className="mg-b-10">Devise</p>
                       

                      

                        <Select
                          name="devise"
                          value={selectedOption}
                          onChange={handleCompteChange}
                          options={compteOptions}
                          placeholder="Sélectionnez un compte"
                        />

                      </div>

                      {errors.devise && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.devise[0]}</b></p>
                      </div>
                        }
                    </div>
                    <div className="col-sm-6">
                    <div className="form-group">
                        <p className="mg-b-10">Déscription</p>
                        <input
                          type="text"
                          className="form-control"
                          name="lib"
                          placeholder="Libellé"
                          value={formData.libelle}
                          autoComplete='off'
                        />

                      </div>

                         

                      {errors.libelle && 
                      <div className="btn btn-danger" style={{ width: '100%', opacity: 1, left: '97px', top: '10px' }}>
                      <p><b>{errors.libelle[0]}</b></p>
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

export default AjouterEcritureForm;
