import React from "react";
import Loader from './Loader';

const PokemonDetails = ({
  genera,
  flavorText,
  height,
  weight,
  abilities,
}) => {

  return (
    <div className="aboutWrapper">
      <div className="aboutLeftContainer">
          {!flavorText ? <Loader/> : flavorText}
      </div>

      <div className="aboutRightContainer">
        <div className="categoryContainer">
          <p className="aboutSpecsLabel">Species</p>
          <p className="aboutSpecsLabel">Height</p>
          <p className="aboutSpecsLabel">Weight</p>
          <p className="aboutSpecsLabel">Abilities</p>
        </div>
        <div className="valueContainer">
          <p className="aboutTabValue">
            {!genera ? <Loader/> : genera}
          </p>
          <p className="aboutTabValue">{height}</p>
          <p className="aboutTabValue">{weight}</p>
          <p className="aboutTabValue">
            {abilities.map((index) => index["ability"].name).join(", ")}
          </p>
        </div>
      </div>
    </div>)
};

export default PokemonDetails;
