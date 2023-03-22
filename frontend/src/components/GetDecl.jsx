/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from "react";
import axios from "axios";

function GetDecl() {
  const [declarationList, setDeclarationList] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/getdeclaration`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      })
      .then((response) => {
        setDeclarationList(response.data);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="div-table">
      <h3 className="title">Mes déclarations de sinistre en cours</h3>
      <div className="width-table">
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
