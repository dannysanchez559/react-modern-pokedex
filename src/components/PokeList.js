import React from "react";
import PokeCard from "./PokeCard";
import Filter from "./Filter";
import getTypeColors from "../util/getTypeColor";
import "../styles/pokeAppStyle.css";

const PokeList = ({
  userDidSearch,
  setUserDidSearch,
  fetchedData,
  allPokemons,
}) => {
  const { id, name, sprites, types } = fetchedData;
  let typeTags, sprite;

  if (types && sprites) {
    sprite = sprites["other"]["official-artwork"]["front_default"];
    typeTags = types.map((obj, i) => {
      return <span key={i}>{obj["type"]["name"]} </span>;
    });
  }
  // <PokeCard dexNo={id} name={name} sprites={sprites} typeTags={typeTags}/>

  const allCards = allPokemons.map((pokeObj) => {
    const { id, name, sprites, types } = pokeObj;

    let typeTags = types.map((obj, i) => {
      const typeName = obj["type"]["name"];

      // console.log(`color numbers`, getTypeColors[typeName]);

      return (
        <span
          style={{ backgroundColor: getTypeColors[typeName] }}
          key={i}
          className="typeTag">
          {obj["type"]["name"]}
        </span>
      );
    });
    let sprite = sprites["other"]["official-artwork"]["front_default"];
    return (
      <PokeCard
        dexNo={id}
        name={name}
        sprite={sprite}
        typeTags={typeTags}
        key={id}
      />
    );
  });

  return (
    <div className="pokeList">
      {!userDidSearch ? (
        <>
          {" "}
          <Filter />
          {allCards}
        </>
      ) : fetchedData.length < 1 ? (
        <h1>Please search pokemon.</h1>
      ) : (
        <PokeCard dexNo={id} name={name} sprite={sprite} typeTags={typeTags} />
      )}
    </div>
  );
};
export default PokeList;