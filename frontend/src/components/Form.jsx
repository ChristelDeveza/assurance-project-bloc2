import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UploadImage from "./UploadImage";
import Logout from "./Logout";

function Form() {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    photo: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const itemData = new FormData();
    itemData.append("date", formData.date);
    itemData.append("description", formData.description);
    itemData.append("photo", formData.photo);
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
    }).then(() => {
      axios
        .post("http://localhost:5000/upload_images", itemData, {
          withCredentials: true,
        })
        .then((response) => {
          // console.log(response.data);
          setFormData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      Swal.fire(
        "Votre déclaration a été envoyé avec sucès !",
        "Pour suivre l'avancement de votre demande, rendez-vous dans votre espace personnel",
        "success"
      ).then(() => window.location.reload());
    });
  };

  return (
    <div className="decl-div-form">
      <h1 className="header-decl">Formulaire de déclaration de sinistre</h1>
      <form className="decl-form" onSubmit={handleSubmit}>
        <div>
          <label className="decl-label" htmlFor="date">
            Date :
          </label>
          <input
            className="decl-input"
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </div>
        <div className="div-decl">
          <label className="decl-label" htmlFor="description">
            Description :
          </label>
          <textarea
            className="decl-descr"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <UploadImage formData={formData} setFormData={setFormData} />
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
