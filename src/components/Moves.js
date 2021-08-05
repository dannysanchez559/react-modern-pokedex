import React, {useState, useEffect} from "react";
import {fetchMove, fetchPokemon} from '../util/fetchPokemonData';

const Moves = ({ dexNo }) => {
  const [moveSet, setMoveSet] = useState([]);

  const getMoveset = async (movesArray, n) => {
    const nMoves = [];
    for (let i = 0; i < n; i += 1) {
      const moveUrl = movesArray[i].move.url;
      try {
        const moveData = await fetchMove(moveUrl);
        if (moveData) nMoves.push(moveData);
      } catch (error) {
        console.error(error);
      }
    }
    return nMoves;
  };

  const getMovesByPokemon = async (id) => {
    const pokemon = await fetchPokemon(id);
    try {
      const moves = pokemon.moves;
      const someMoves = await getMoveset(moves, 4);

      setMoveSet(someMoves);
    } catch (error) {
      console.error(error);
    }
  };

  // function for finding English flavor text; returns a string
  const getEngFlavorText = (texts) => {
    for (let i = 0; i < texts.length; i += 1) {
      const textObj = texts[i];
      if (textObj.language.name === "en") {
        return textObj.flavor_text;
      }
    }
  };

  useEffect(()=>{
    getMovesByPokemon(dexNo);
  },[])

  const moveInfo = () => {
     return moveSet.map((moveObj) => {
      const { accuracy, name, power, pp, flavor_text_entries, type } = moveObj;
      // call function to loop through flavor_text_entries and find "en"
      return (
        <ul key={name}>
          <li>{name.toUpperCase()}</li>
          <li>{type.name}</li>
          <li>{getEngFlavorText(flavor_text_entries)}</li>
          <li>Accuracy: {accuracy}</li>
          <li>Power: {power}</li>
          <li>PP: {pp}</li>
        </ul>
      );
    });
  };
  return <div className="moves-panel">{moveSet && moveInfo()}</div>;
};

export default Moves;
