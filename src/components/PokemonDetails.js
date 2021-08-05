import React from "react";
import Loader from './Loader';

const PokemonDetails = ({
  genera,
  flavorText,
  // isAboutTextEnglish,
  modalData,
  // englishAboutTextIndex,
  // englishSpeciesTextIndex,
  // isSpeciesTextEnglish,
  height,
  weight,
  abilities,
}) => {
  console.log(`genera`, genera)
  console.log(`flavor text`, flavorText)
  return (
    <div className="aboutWrapper">
      <div className="aboutLeftContainer">
        {/* {isAboutTextEnglish
          ? modalData["flavor_text_entries"]?.[englishAboutTextIndex]?.[
              "flavor_text"
            ]
          : "Information not found"} */}
          {!flavorText ? "Info not found." : flavorText}
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
            {!genera ? "Info not found." : genera}
            {/* {isSpeciesTextEnglish
              ? modalData["genera"]?.[englishSpeciesTextIndex]?.["genus"]
              : "Information not found"} */}
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
