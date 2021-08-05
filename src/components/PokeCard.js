import React, { useState, useEffect } from "react";
import { Modal as CustomModal } from "./Modal";
import Modal from "react-modal";
import { fetchPokemon, fetchMove } from "../util/fetchPokemonData";

const PokeCard = ({
  name,
  dexNo,
  typeTags,
  sprite,
  modalData,
  getPokemonModalAboutContent,
  height,
  weight,
  abilities,
  stats,
  types,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [moveSet, setMoveSet] = useState([]);
  const [generaString, setGeneraString] = useState('');
  const [flavorText, setFlavorText] = useState('');
  Modal.setAppElement("#root");
  // arrays to loop through to get English text
  const { flavor_text_entries, genera} = modalData;

  // get modal moveset
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
    }
    catch(error){
      console.error(error);
    }

  };



  // takes in array, target key to return, and target language
  const findDescriptionByLanguage = (array, targetKey, lang) => {
    if(array && Array.isArray(array)) {
      const englishObject =  array.find(obj => obj["language"].name===lang);
       // returns English text string
       return englishObject[`${targetKey}`];
    }
  }

  // get modal content: pokemon species info and moveset
  const triggerModalData = () => {
    getMovesByPokemon(dexNo);
    getPokemonModalAboutContent(dexNo);
    const generaText = findDescriptionByLanguage(genera, 'genus', 'en');
    const description = findDescriptionByLanguage(flavor_text_entries, 'flavor_text', 'en');
    setGeneraString(generaText);
    setFlavorText(description);
  };

  const prepareModal = ()=> {
     triggerModalData();
     setModalIsOpen(true);
  }


  return (
    <>
      <div
        className="card"
        // Open modal
        onClick={prepareModal}>
        <ul>
          <li>
            <img src={sprite} alt={`${name} sprite`} className="sprite" />
          </li>
          <li className="card-name">
            <span>{name.toUpperCase()}</span>
            <span> #{dexNo}</span>
          </li>
          <li>{typeTags}</li>
        </ul>
      </div>
      {/* material ui modal */}
      <Modal
        onAfterOpen={triggerModalData}
        className="modalWindow"
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
        }}>
        {/* modal content */}
        <CustomModal
          genera={generaString}
          flavorText={flavorText}
          setIsOpen={setModalIsOpen}
          name={name}
          dexNo={dexNo}
          sprite={sprite}
          typeTags={typeTags}
          modalData={modalData}
          getPokemonModalAboutContent={getPokemonModalAboutContent}
          height={height}
          weight={weight}
          abilities={abilities}
          stats={stats}
          types={types}
          moveSet={moveSet}
        />
      </Modal>
    </>
  );
};

export default PokeCard;
