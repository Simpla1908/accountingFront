import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Pagination, Form, Button, Modal } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs"; // Import de l'icône
import { Link } from "react-router-dom";

import API_ROUTES from "../../apiConfig";
// Récupérer la chaîne JSON du localStorage sous la clé "userData"
const storedUserDataJSON = localStorage.getItem("userData");
// Convertir la chaîne JSON en objet JavaScript
const storedUserData = JSON.parse(storedUserDataJSON);

const ListeComptes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [planComptable, setplanComptable] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Valeur par défaut
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = storedUserData.access; 
      const config = {
        headers: {
          Authorization: token,
        },
      };

      const response = await axios.get(API_ROUTES.PLAN_COMPTABLE, config);
      console.log(response.data);
      setplanComptable(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données des utilisateurs :",
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
      const filtered = planComptable.filter((pl) =>
      pl.libelle.toLowerCase().includes(query.toLowerCase())
      );
      setplanComptable(filtered);
    }

    setCurrentPage(1); // Reset to first page after search
  };


// Calculate totalItems by flattening the nested structure and counting souscomptes_set

function countElements(obj) {
  let count = 1; // Compte l'objet lui-même

  if (Array.isArray(obj)) {
    for (const item of obj) {
      count += countElements(item); // Compte les éléments du tableau
    }
  } else if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      count += countElements(obj[key]); // Compte les propriétés de l'objet
    }
  }

  return count;
}

const totalItems =countElements(planComptable);

const totalPages = Math.ceil(totalItems / itemsPerPage);
console.log('itemsPerPage '+itemsPerPage);


  console.log('totalItems '+totalItems);


  console.log('totalPages '+totalPages);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const itemsToShow = planComptable.slice(indexOfFirstItem, indexOfLastItem);

  console.log('indexOfFirstItem '+indexOfFirstItem);

  console.log('indexOfLastItem '+indexOfLastItem);


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
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const response = await axios.delete(
        `${API_ROUTES.SUPPRIMER_UTILISATEUR}${userToDelete}/`,
        config
      );

      // Handle success response here (e.g., show success message)
      console.log(response);
      closeDeleteModal();
      fetchUserData();
      setSuccess({
        detail: "La suppression de l'utilisateur s'est fait avec succes.",
      });
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
                Plan des comptes
              </h2>
            </div>
            <div className="d-flex">
              <div className="justify-content-center">
                <Link
                  type="button"
                  className="btn btn-primary btn-icon-text my-2 me-2"
                  to="/ajouter-sous-compte"
                >
                  <i className="fe fe-plus-circle me-2"></i>Ajouter sous-compte
                </Link>
                <button
                  type="button"
                  className="btn btn-white btn-icon-text my-2 me-2"
                >
                  <i className="fe fe-printer me-2"></i> Imprimer
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
                    {success.detail && (
                      <div
                        className="btn btn-success"
                        style={{
                          opacity: 1,
                          left: "97px",
                          top: "10px",
                          marginBottom: "20px",
                        }}
                      >
                        <p>
                          <b>{success.detail}</b>
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="table-responsive">
                    <div class="main-header-center">
                      <Form>
                        <Form.Group
                          controlId="itemsPerPageSelect"
                          className="mb-3 d-flex align-items-center"
                        >
                          <Form.Label
                            className="me-2"
                            style={{ color: "black" }}
                          >
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
                            <th className="wd-5p">Numéro</th>
                            <th className="wd-25p">Compte </th>
                            <th className="wd-25p">Classe </th>
                            <th className="wd-20p">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                        {itemsToShow.map((classe) => (
                            <React.Fragment key={classe.id}>
                              {/* Rendu pour la classe */}
                              {/* <tr>
                                <td>{classe.numero}</td>
                                <td>{classe.libelle}</td>
                                <td>{classe.libelle}</td>
                                <td></td>
                              </tr> */}

                              {/* Rendu pour les catégories de la classe */}
                              {classe.categories_set.map((categorie) => (
                                <React.Fragment key={categorie.id}>
                                  <tr>
                                    <td>{categorie.numero}</td>
                                    <td>{categorie.libelle}</td>
                                    <td>{classe.libelle}</td>
                                    <td></td>
                                  </tr>

                                {/* Partie code */}
                                 {/* Rendu pour les comptes de la catégorie */}
                                 {categorie.comptes_set.map((compte) => (
                                    <React.Fragment key={compte.id}>
                                      <tr>
                                        <td>{compte.numero}</td>
                                        <td>{compte.libelle}</td>
                                        <td>{classe.libelle}</td>
                                        <td>
                                        </td>
                                      </tr>

                                      {/* ... Rendu pour les sous-comptes de ce compte */}
                                      {compte.souscomptes_set.map(
                                        (souscompte) => (
                                          <tr key={souscompte.id}>
                                            <td>{souscompte.numero}</td>
                                            <td>{souscompte.libelle}</td>
                                            <td>{classe.libelle}</td>
                                            <td>
                                              {/* Boutons d'action (modifier, supprimer, etc.) */}
                                            </td>
                                          </tr>
                                        )
                                      )}
                                    </React.Fragment>
                                  ))}




                                  {/* Partie code */} 
                                </React.Fragment>
                              ))}
                            </React.Fragment>
                          ))}
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
                          Êtes-vous sûr de vouloir supprimer le sous-compte ?
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={closeDeleteModal}
                          >
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

export default ListeComptes;
