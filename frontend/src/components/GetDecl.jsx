/* eslint-disable no-shadow */
import React, { useState, useEffect } from "react";
import axios from "axios";

function GetDecl() {
  const [numDecl, setNumDecl] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/upload_image`, {
        withCredentials: true,
      })
      .then((response) => {
        const { id: numDecl, date, description } = response.data;
        setNumDecl(numDecl);
        setDate(date);
        setDescription(description);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      <h3>Mes déclarations de sinistre en cours</h3>
      <div>
        {numDecl} {date} {description}
      </div>
    </div>
  );
}

export default GetDecl;
