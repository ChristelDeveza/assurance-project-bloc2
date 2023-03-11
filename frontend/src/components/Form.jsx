import React, { useState } from "react";
import axios from "axios";
import UploadImage from "./UploadImage";

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
    axios
      .post("http://localhost:5000/upload_images", itemData)
      .then((response) => {
        // console.log(response.data);
        setFormData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="form">
      <h1>Formulaire de déclaration de sinistre</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date :</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description :</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <UploadImage formData={formData} setFormData={setFormData} />
        <button type="submit">SOUMETTRE MA DECLARATION</button>
      </form>
    </div>
  );
}

export default Form;
