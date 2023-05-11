/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import Form from "./Form";
import UserDatas from "./UserDatas";
import GetDecl from "./GetDecl";

function Onglets() {
  const [activeTab, setActiveTab] = useState(0);
  const [declarationList, setDeclarationList] = useState([]);

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
            <Form
              declarationList={declarationList}
              setDeclarationList={setDeclarationList}
            />
          </p>
        </div>
        <div className={`tab-panel ${activeTab === 2 && "active"}`}>
          <h3 className="title">Mes contrats d'assurance</h3>
          <p>* Contrat N°123654 du 14/03/2023</p>
          <GetDecl
            declarationList={declarationList}
            setDeclarationList={setDeclarationList}
          />
        </div>
      </div>
    </div>
  );
}

export default Onglets;
