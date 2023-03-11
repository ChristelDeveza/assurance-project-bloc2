import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Login() {
  const { setIsOnline } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  // Function login
  function handleSubmit(e) {
    e.preventDefault();
    // if user and password exist in database
    if (user && password) {
      axios
        .post(
          `http://localhost:5000/login`,
          {
            email: user,
            password,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          // console.log(res.data);

          setIsOnline(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .then(() => {
          navigate("/moncompte", { replace: true });
        })
        // If error
        .catch((err) => {
          console.error(err);
        });
    } else {
      // If fields are empty
      // alert("remplir les champs");
    }
  }
  return (
    <div className="login">
      <section>
        <h1 className="title-login">SE CONNECTER</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-box">
            <label htmlFor="email">E-mail :</label>

            <input
              className="login-input"
              type="text"
              id="email"
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <label htmlFor="password">Mot de passe :</label>
            <input
              className="login-input"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button className="login-button" type="button" onClick={handleSubmit}>
            SE CONNECTER
          </button>
        </form>
      </section>
    </div>
  );
}

export default Login;
