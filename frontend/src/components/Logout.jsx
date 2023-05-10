import React, { useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
// ${import.meta.env.VITE_BACKEND_URL}
function Logout() {
  const { setIsOnline } = useContext(UserContext);
  const navigate = useNavigate();
  // Function logout
  function logoutButton() {
    axios
      .get(`https://assurrance-project-bloc2-versionb.onrender.com/logout`)
      .then(() => {
        navigate("/", { replace: true });
        setIsOnline(null);
        localStorage.setItem("user", null);
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Confirmation",
          text: "Déconnexion réussie.",
        });
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
