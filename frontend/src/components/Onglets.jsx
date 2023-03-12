/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import Form from "./Form";
import UserDatas from "./UserDatas";

function Onglets() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        <div
          className={`tab ${activeTab === 0 && "active"}`}
          onClick={() => handleTabClick(0)}
        >
          <p>Mes informations personnelles</p>
        </div>
        <div
          className={`tab ${activeTab === 1 && "active"}`}
          onClick={() => handleTabClick(1)}
        >
          <p>Déclarer un sinistre</p>
        </div>
        <div
          className={`tab ${activeTab === 2 && "active"}`}
          onClick={() => handleTabClick(2)}
        >
          <p>Mes contrats</p>
        </div>
      </div>
      <div className="tab-content">
        <div className={`tab-panel ${activeTab === 0 && "active"}`}>
          <UserDatas />
        </div>
        <div className={`tab-panel ${activeTab === 1 && "active"}`}>
          <p>
            <Form />
          </p>
        </div>
        <div className={`tab-panel ${activeTab === 2 && "active"}`}>
          <p>Mes contrats d'assurance</p>
        </div>
      </div>
    </div>
  );
}

export default Onglets;
