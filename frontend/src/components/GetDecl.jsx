/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from "react";
import axios from "axios";

function GetDecl() {
  const [declarationList, setDeclarationList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/upload_images`, {
        withCredentials: true,
      })
      .then((response) => {
        setDeclarationList(response.data);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      <h3>Mes déclarations de sinistre en cours</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>Numéro</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {declarationList.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>
                  {new Date(data.date_sinister).toLocaleDateString("fr-FR")}
                </td>
                <td>{data.description_sinister}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GetDecl;
