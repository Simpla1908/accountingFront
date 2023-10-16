import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Pagination, Form ,Button, Modal} from "react-bootstrap";
import { BsPencilSquare,BsTrash } from 'react-icons/bs'; // Import de l'icône
import { Link } from 'react-router-dom';


import API_ROUTES from "../../apiConfig";
// Récupérer la chaîne JSON du localStorage sous la clé "userData"
const storedUserDataJSON = localStorage.getItem("userData");
// Convertir la chaîne JSON en objet JavaScript
const storedUserData = JSON.parse(storedUserDataJSON);

function formatDate(dateString) {
  const dateObject = new Date(dateString);
  const day = dateObject.getDate().toString().padStart(2, '0');
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObject.getFullYear();
  return `${day}/${month}/${year}`;
}

const ListeExercices = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [userList, setUserList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Valeur par défaut
  const [success,setSuccess]=useState('');


  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = storedUserData.access; // Remplacez par votre vrai token
      const config = {
        headers: {
          Authorization: token,
        },
      };

      const response = await axios.get(
        `${API_ROUTES.LISTE_EXERCICES}${storedUserData.entreprise_id}`,
        config
      );
      setUserList(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données :",
        error
      );
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      // If the search query is empty, fetch the initial user data again
      fetchUserData();
    } else {
      // If there's a search query, filter the user list accordingly
      const filtered = userList.filter((exercice) =>
      exercice.lib.toLowerCase().includes(query.toLowerCase())
      );
      setUserList(filtered);
    }

    setCurrentPage(1); // Reset to first page after search
  };

  const totalItems = userList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const itemsToShow = userList.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  //DELETE 

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const openDeleteModal = (user) => {

    setUserToDelete(user.id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
  };


  const deleteUser = async () => {
    console.log(userToDelete);
    // Mettez ici votre logique pour supprimer l'utilisateur
    // Après la suppression, vous pouvez appeler fetchUserData() pour mettre à jour la liste

    try {
     
      const token = storedUserData.access;
      const config = {
        headers: {
          'Content-Type': 'application/json',
           Authorization: token,
        },
      };

      const response = await axios.delete(
        `${API_ROUTES.SUPPRIMER_EXERCICE}${userToDelete}/`,
        config
      );

      // Handle success response here (e.g., show success message)
       console.log(response);
       closeDeleteModal();
       fetchUserData();
       setSuccess({ detail: "La suppression de l'exercice s'est fait avec succes." });
       //Pour gerer la disparution
       setTimeout(() => {
        setSuccess({});
      }, 5000);

  
    } catch (error) {
      console.log(error);
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
                Liste des écritures
              </h2>
            </div>
            <div className="d-flex">
              <div className="justify-content-center">
                < Link
                  type="button"
                  className="btn btn-primary btn-icon-text my-2 me-2"
                  to="/ajouter-ecriture"
                >
                  <i className="fe fe-plus-circle me-2"></i>Journaliser
                </Link>
               <button type="button" className="btn btn-white btn-icon-text my-2 me-2">
                  <i className="fe fe-filter me-2"></i> Filtrer
                </button> 

                  {/*
                <button type="button" className="btn btn-primary my-2 btn-icon-text">
                  <i className="fe fe-download-cloud me-2"></i> Download Report
                </button> */}
              </div>
            </div>
          </div>

          <div className="row row-sm">
            <div className="col-lg-12">
              <div className="card custom-card">
                <div className="card-body">
                <div className="row row-sm">
                       {success.detail && 
                        <div className="btn btn-success" style={{opacity: 1, left: '97px', top: '10px',marginBottom:'20px' }}>
                          <p><b>{success.detail}</b></p>
                       </div>
                       }
                </div>  
                  <div className="table-responsive">
                    <div class="main-header-center">
                      <Form>
                        <Form.Group
                          controlId="itemsPerPageSelect"
                          className="mb-3 d-flex align-items-center"
                        >
                          <Form.Label className="me-2" style={{ color: 'black' }}>
                            Nombre de lignes par page:
                          </Form.Label>
                          <Form
                            as="select"
                            value={itemsPerPage}
                            onChange={(e) =>
                              setItemsPerPage(parseInt(e.target.value))
                            }
                            style={{ width: "50px" }}
                          >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                          </Form>
                          <div className="ms-3 flex-grow-1">
                            {" "}
                            {/* Ajout d'une div pour la marge gauche */}
                           
                          </div>
                          <input
                              type="search"
                              className="form-control rounded-0"
                              placeholder="Effectuer la recherche ici..."
                              value={searchQuery}
                              onChange={(e) => handleSearch(e.target.value)}
                            />
                          <button className="btn search-btn">
                            <i className="fe fe-search"></i>
                          </button>
                        </Form.Group>
                      </Form>

                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th className="wd-5p">N°</th>
                            <th className="wd-25p">Date </th>
                            <th className="wd-25p">Type de journal </th>
                            <th className="wd-25p">Réference </th>
                            <th className="wd-25p">Description </th>
                            <th className="wd-20p">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* {itemsToShow.map((exercice, index) => (
                            <tr key={index}>
                              <td>{index + 1 + indexOfFirstItem}</td>
                              <td>{exercice.lib}</td>
                              <td>{formatDate(exercice.debut)}-{formatDate(exercice.fin)}</td>
                              <td>
                              <Link 
                              className="btn ripple btn-primary btn-sm my-2 me-2"
                              to={`/modifier-exercice/${exercice.id}`}

                               >
                                <BsPencilSquare className="me-2" /> Modifier
                              </Link>
                              <button 
                               className="btn ripple btn-danger btn-sm my-2 me-2"
                               onClick={() => openDeleteModal(exercice)} // Ouvrir le pop-up de confirmation

                               >
                                 <BsTrash className="me-2" /> Supprimer
                              </button >
                              </td>
                            </tr>
                          ))} */}
                        </tbody>
                      </Table>
                      <Pagination className="justify-content-end">
                        <Pagination.Prev
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        />
                        {Array.from({ length: totalPages }, (_, index) => (
                          <Pagination.Item
                            key={index}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </Pagination.Item>
                        ))}
                        <Pagination.Next
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        />
                      </Pagination>
                       {/* Pop-up de confirmation de suppression */}
                      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
                        <Modal.Header closeButton>
                          <Modal.Title>Confirmation de suppression</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          Êtes-vous sûr de vouloir supprimer l'exercice ?
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={closeDeleteModal}>
                            Annuler
                          </Button>
                          <Button variant="danger" onClick={deleteUser}>
                            Confirmer
                          </Button>
                        </Modal.Footer>
                      </Modal>
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

export default ListeExercices;
