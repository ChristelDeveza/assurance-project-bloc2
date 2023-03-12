/* eslint-disable no-shadow */
import React, { useState, useEffect } from "react";
import axios from "axios";

function UserDatas() {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  function updateUser() {
    // console.log("en attente");
  }

  // Get user details
  useEffect(() => {
    axios
      .get(`http://localhost:5000/compteuser`, {
        withCredentials: true,
      })
      .then((response) => {
        const { lastname, firstname, address, email, phone } = response.data;
        setLastname(lastname);
        setFirstname(firstname);
        setAddress(address);
        setEmail(email);
        setPhone(phone);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <form onSubmit={updateUser}>
        <label>
          Nom
          <input
            type="text"
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
          />
        </label>
        <br />
        <label>
          Prénom:
          <input
            type="text"
            value={firstname}
            onChange={(event) => setFirstname(event.target.value)}
          />
        </label>
        <br />
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <label>
          Adresse
          <input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </label>
        <br />
        <label>
          Téléphone
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
}

export default UserDatas;
