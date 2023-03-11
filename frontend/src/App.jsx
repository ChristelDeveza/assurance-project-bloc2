import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import "./App.css";
import UserContextIsOnline from "./context/UserContext";
import Onglets from "./components/Onglets";

function App() {
  return (
    <div className="App">
      <UserContextIsOnline>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="moncompte" element={<Onglets />} />
          </Routes>
        </Router>
      </UserContextIsOnline>
    </div>
  );
}

export default App;
