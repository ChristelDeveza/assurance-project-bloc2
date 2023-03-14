/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from "react";
import axios from "axios";
import DeclCard from "./DeclCard";

function GetDecl() {
  const [declarationList, setDeclarationList] = useState([]);
  // const [numDecl, setNumDecl] = useState("");
  // const [date, setDate] = useState("");
  // const [description, setDescription] = useState("");

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
          {declarationList.map((data) => (
            <tbody>
              <tr>
                <td>
                  <DeclCard key={data.id} {...data} />
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

export default GetDecl;
