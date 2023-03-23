/* eslint-disable no-shadow */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import Logout from "./Logout";
import { UserContext } from "../context/UserContext";

function UserDatas() {
  const { isOnline } = useContext(UserContext);
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const { id } = isOnline;

  function updateUser() {
    // console.log("en attente");
  }

  // Get user details
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/compteuser/${id}`)
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
    <div className="userForm-div">
      <form className="userForm" onSubmit={updateUser}>
        <label className="label-size">
          Nom
          <input
            className="imput-size"
            type="text"
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
          />
        </label>
        <br />
        <label className="label-size">
          Prénom:
          <input
            className="imput-size"
            type="text"
            value={firstname}
            onChange={(event) => setFirstname(event.target.value)}
          />
        </label>
        <br />
        <label className="label-size">
          Email
          <input
            className="imput-size"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <label className="label-size">
          Adresse
          <input
            className="imput-size"
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </label>
        <br />
        <label className="label-size">
          Téléphone
          <input
            className="imput-size"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </label>
        <br />
        <button className="btn-userdatas" type="submit">
          Modifier
        </button>
        <Logout />
      </form>
    </div>
  );
}

export default UserDatas;
