import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Pagination, Form, Button } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs"; // Import de l'icône
import { Link } from "react-router-dom";

import API_ROUTES from "../../apiConfig";
// Récupérer la chaîne JSON du localStorage sous la clé "userData"
const storedUserDataJSON = localStorage.getItem("userData");
// Convertir la chaîne JSON en objet JavaScript
const storedUserData = JSON.parse(storedUserDataJSON);

const AjouterUtilisateurForm = () => {
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
                Ajouter utilisateur
              </h2>
            </div>
            <div className="d-flex">
              <div className="justify-content-center">
                <button
                  type="button"
                  className="btn btn-primary btn-icon-text my-2 me-2"
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

          <div class="row row-sm">
            <div class="col-lg-12 col-md-12">
              <div class="card custom-card">
                <div class="card-body">
                  <div class="row row-sm">
                    <div class="col-md-6">
                      <div class="form-group">
                        <p class="mg-b-10">Nom</p>
                        <input
                          type="text"
                          class="form-control"
                          name="example-text-input"
                          placeholder="Name"
                        />
                      </div>
                      <div class="form-group">
                        <p class="mg-b-10">Mot de passe</p>
                        <input
                          type="text"
                          class="form-control"
                          name="example-disabled-input"
                          placeholder="Mot de passe"
                          value=""
                          disabled=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <p className="mg-b-10">Email</p>
                        <input
                          type="text"
                          className="form-control"
                          name="example-text-input-valid"
                          placeholder="Email"
                        />
                      </div>

                      <div className="form-group">
                        <label className="ckbox">
                          <input type="checkbox" />
                          <span>Administrateur</span>
                        </label>
                      </div>
                    </div>

                    <div class="col-md-12 ">
                      <div class="form-group mb-0">
                        <p class="mg-b-10">Groupes</p>
                        <textarea
                          class="form-control"
                          name="example-textarea-input"
                          rows="4"
                          placeholder="text here.."
                        ></textarea>
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

export default AjouterUtilisateurForm;
