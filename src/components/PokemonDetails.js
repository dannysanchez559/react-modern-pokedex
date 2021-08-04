import React from "react";

const PokemonDetails = ({
  isAboutTextEnglish,
  modalData,
  englishAboutTextIndex,
  englishSpeciesTextIndex,
  isSpeciesTextEnglish,
  height,
  weight,
  abilities,
}) => {
  return (
    <div className="aboutWrapper">
      <div className="aboutLeftContainer">
        {isAboutTextEnglish
          ? modalData["flavor_text_entries"][englishAboutTextIndex][
              "flavor_text"
            ]
          : "Information not found"}
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
            {isSpeciesTextEnglish
              ? modalData["genera"][englishSpeciesTextIndex]["genus"]
              : "Information not found"}
          </p>
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
