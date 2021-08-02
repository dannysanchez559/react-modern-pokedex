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
    <div>
      <div className="aboutLeftContainer">
        {isAboutTextEnglish
          ? modalData["flavor_text_entries"][englishAboutTextIndex][
              "flavor_text"
            ]
          : "Information not found"}
      </div>

      <div className="aboutRightContainer">
        <div className="speciesRowContainer">
          <p className="aboutSpecsLabel">Species</p>
          <p className="speciesValue">
            {isSpeciesTextEnglish
              ? modalData["genera"][englishSpeciesTextIndex]["genus"]
              : "Information not found"}
          </p>
        </div>

        <div className="heightRowContainer">
          <p className="aboutSpecsLabel">Height</p>
          <p className="heightValue">{height}</p>
        </div>

        <div className="weightRowContainer">
          <p className="aboutSpecsLabel">Weight</p>
          <p className="weightValue">{weight}</p>
        </div>

        <div className="abilitiesRowContainer">
          <p className="aboutSpecsLabel">Abilities</p>
          <p className="abilitiesValue">
            {abilities.map((index) => index["ability"].name + " ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
