import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";

function Logout() {
  const { setIsOnline } = useContext(UserContext);
  const navigate = useNavigate();
  // Function logout
  function logoutButton() {
    axios
      .get(`http://localhost:5000/logout`, {
        withCredentials: true,
      })
      .then(() => {
        navigate("/", { replace: true });
        setIsOnline(null);
        localStorage.setItem("user", null);
      })
      .then(() => {
        // console.log("hey");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.error(err);
        }
      });
  }

  return (
    <div>
      <button
        className="disconnect-button"
        type="button"
        onClick={logoutButton}
      >
        SE DECONNECTER
      </button>
    </div>
  );
}

export default Logout;
