import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Pagination, Form ,Button} from "react-bootstrap";
import { BsPencilSquare,BsTrash } from 'react-icons/bs'; // Import de l'icône
import { Link } from 'react-router-dom';


import API_ROUTES from "../../apiConfig";
// Récupérer la chaîne JSON du localStorage sous la clé "userData"
const storedUserDataJSON = localStorage.getItem("userData");
// Convertir la chaîne JSON en objet JavaScript
const storedUserData = JSON.parse(storedUserDataJSON);

const ListeUtilisateurs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [userList, setUserList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Valeur par défaut

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
        `${API_ROUTES.LISTE_UTILISATEURS}${storedUserData.entreprise_id}`,
        config
      );
      console.log(response.data);
      setUserList(response.data);
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
      const filtered = userList.filter((user) =>
        user.username.toLowerCase().includes(query.toLowerCase())
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
                Liste des utilisateurs
              </h2>
            </div>
            <div className="d-flex">
              <div className="justify-content-center">
                < Link
                  type="button"
                  className="btn btn-primary btn-icon-text my-2 me-2"
                  to="/ajouter-utilisateur"
                >
                  <i className="fe fe-plus-circle me-2"></i>Ajouter
                </Link>
                {/* <button type="button" className="btn btn-white btn-icon-text my-2 me-2">
                  <i className="fe fe-filter me-2"></i> Filtrer
                </button> 
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
                            <th className="wd-25p">Nom </th>
                            <th className="wd-25p">Email </th>
                            <th className="wd-20p">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {itemsToShow.map((user, index) => (
                            <tr key={index}>
                              <td>{index + 1 + indexOfFirstItem}</td>
                              <td>{user.username}</td>
                              <td>{user.email}</td>
                              <td>
                              <Button variant="primary" size="sm" className="my-2 me-2">
                                <BsPencilSquare className="me-2" /> Modifier
                              </Button>
                              <Button variant="danger" size="sm">
                                 <BsTrash className="me-2" /> Supprimer
                              </Button>
                              </td>
                            </tr>
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

export default ListeUtilisateurs;
