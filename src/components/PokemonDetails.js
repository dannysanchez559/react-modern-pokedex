import React from "react";
import Spinner from "./Spinner";

const PokemonDetails = ({ genera, flavorText, height, weight, abilities }) => {
  return (
    <div className="aboutWrapper">
      <div className="aboutLeftContainer">
        {!flavorText ? <Spinner /> : flavorText}
      </div>

      <div className="aboutRightContainer">
        <div className="categoryContainer">
          <p className="aboutSpecsLabel">Species</p>
          <p className="aboutSpecsLabel">Height</p>
          <p className="aboutSpecsLabel">Weight</p>
          <p className="aboutSpecsLabel">Abilities</p>
        </div>
        <div className="valueContainer">
          <div className="aboutTabValue">{!genera ? <Spinner /> : genera}</div>
          <p className="aboutTabValue">{height}</p>
          <p className="aboutTabValue">{weight}</p>
          <p className="aboutTabValue">
            {abilities.map((index) => index["ability"].name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
