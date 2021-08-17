import React from "react";

const PokemonDetails = ({ genera, flavorText, height, weight, abilities }) => {
  return (
    <div className="aboutWrapper">
      <div className="aboutLeftContainer">
        {!flavorText ? (
          <h3
            style={{
              margin: "50px auto",
            }}>
            Loading...
          </h3>
        ) : (
          flavorText
        )}
      </div>

      <div className="aboutRightContainer">
        <div className="categoryContainer">
          <p className="aboutSpecsLabel">Species</p>
          <p className="aboutSpecsLabel">Height</p>
          <p className="aboutSpecsLabel">Weight</p>
          <p className="aboutSpecsLabel">Abilities</p>
        </div>
        <div className="valueContainer">
          <div className="aboutTabValue">
            {!genera ? (
              <h3
                style={{
                  margin: "50px auto",
                }}>
                Loading...
              </h3>
            ) : (
              genera
            )}
          </div>
          <p className="aboutTabValue">{height} dm</p>
          <p className="aboutTabValue">{weight} hg</p>
          <p className="aboutTabValue">
            {abilities.map((index) => index["ability"].name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
