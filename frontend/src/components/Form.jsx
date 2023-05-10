/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
// import UploadImage from "./UploadImage";
import Logout from "./Logout";
import { UserContext } from "../context/UserContext";

function Form() {
  const { isOnline } = useContext(UserContext);
  const { id } = isOnline;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const itemData = new FormData();
    itemData.append("date", data.date);
    itemData.append("description", data.description);
    itemData.append("photo", data.photo[0]); // objet

    Swal.fire({
      title: "Êtes-vous sûr de vouloir envoyer la demande ?",
      text: "Cette action est irréversible, vous ne pourrez plus modifier votre demande !",
      icon: "warning",
      position: "center",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler!",
      confirmButtonText: "Oui, Soumettre !",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `https://assurrance-project-bloc2-versionb.onrender.com/declaration/${id}`,
            itemData
          )
          .then(() => {
            Swal.fire(
              "Votre déclaration a été envoyée avec succès !",
              "Pour suivre l'avancement de votre demande, rendez-vous dans votre espace personnel, onglet Mes contrats",
              "success"
            ).then(() => window.location.reload());
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  return (
    <div className="decl-div-form">
      <h1 className="header-decl">Formulaire de déclaration de sinistre</h1>
      <form className="decl-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="decl-label" htmlFor="date">
            Date :
          </label>
          <input
            className="decl-input"
            type="date"
            id="date"
            {...register("date", { required: true })}
          />
          {errors.date && (
            <span className="error-msg">Ce champ est requis</span>
          )}
        </div>
        <div className="div-decl">
          <label className="decl-label" htmlFor="description">
            Description :
          </label>
          <textarea
            className="decl-descr"
            id="description"
            {...register("description", {
              required: true,
              maxLength: 100,
              pattern: /^[a-zA-ZÀ-ÿ\s\-';,.!?()]+$/u,
            })}
          />
          <div className="error-desc">
            {errors.description && (
              <span className="error-msg">
                Ce champ est requis.
                <br />
                100 caractères maximum autorisés.
                <br />
                Caractères spéciaux non autorisés.
              </span>
            )}
          </div>
        </div>
        <div>
          <h5>Joindre une photo du sinistre</h5>
          <div>
            <label className="decl-label" htmlFor="photo">
              Photo :
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              {...register("photo", { required: true })}
            />
          </div>

          {errors.photo && (
            <span className="error-msg">Une photo est requise</span>
          )}
        </div>
        <div>
          <button type="submit">SOUMETTRE MA DECLARATION</button>
        </div>
        <div>
          <Logout />
        </div>
      </form>
    </div>
  );
}

export default Form;
