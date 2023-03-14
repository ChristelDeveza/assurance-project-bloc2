/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React from "react";

function DeclCard(props) {
  const { id, date_sinister, description_sinister } = props;
  // Format date
  const dateSinister = new Date(date_sinister);
  const formatDate = dateSinister.toLocaleDateString("fr-FR");
  return (
    <div>
      {id}
      {formatDate}
      {description_sinister}
    </div>
  );
}

export default DeclCard;
