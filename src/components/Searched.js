import React from 'react';
import getTypeColors from "../util/getTypeColor";
import PokeCard from "./PokeCard";

const Searched = ({fetchedData, getPokemonModalAboutContent, capitalizeType, modalData})=>{
  const { id, name, sprites, types, height, weight, abilities, stats } =
    fetchedData[0];


    // generate tags, check for tags and types
  let typeTags, sprite;
  if (types && sprites) {
    sprite = sprites["other"]["official-artwork"]["front_default"];
    typeTags = types.map((obj, i) => {
      const typeName = obj["type"]["name"];
      const capitalizedTypeName = capitalizeType(typeName);
      return (
        <span
          className="type-tag"
          style={{
            backgroundColor: getTypeColors[typeName],
          }}
          key={i}>
          {capitalizedTypeName}
        </span>
      );
    });
  }
  return (<div>{!fetchedData.length ? (
        <h1>Please search pokemon.</h1>
      ) : (
        <PokeCard
          dexNo={id}
          name={name}
          sprite={sprite}
          typeTags={typeTags}
          modalData={modalData}
          getPokemonModalAboutContent={getPokemonModalAboutContent}
          height={height}
          weight={weight}
          abilities={abilities}
          stats={stats}
          types={types}
        />
      )}
      </div>)
}

export default Searched;