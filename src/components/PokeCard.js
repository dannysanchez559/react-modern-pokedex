import React from "react";
import getTypeColors from "../util/getTypeColor";

const PokeCard = ({ name, dexNo, typeTags, sprite }) => {
  return (
    <div className="card">
      <ul>
        <img src={sprite} alt={`${name} sprite`} className="sprite" />
        <li>{name}</li>
        <li>{dexNo}</li>
        <li>{typeTags}</li>
      </ul>
    </div>
  );
};

export default PokeCard;
