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
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [moveSet, setMoveSet] = useState([]);

  Modal.setAppElement("#root");

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
    const moves = pokemon.moves;
    const someMoves = await getMoveset(moves, 4);
    setMoveSet(someMoves);
  };

  // get modal content: pokemon species info and moveset
  const triggerModalData = () => {
    getMovesByPokemon(dexNo);
    getPokemonModalAboutContent(dexNo);
  };

  useEffect(() => {
    // pokemon modal content
    triggerModalData();
  }, []);

  return (
    <div className="card">
      <ul>
        <li>
          <img src={sprite} alt={`${name} sprite`} className="sprite" />
        </li>
        <li className="card-name">
          <span>{name.toUpperCase()}</span>
          <span> #{dexNo}</span>
        </li>
        <li>{typeTags}</li>
        <li>
          <button
            onClick={() => {
              setModalIsOpen(true);
              triggerModalData();
            }}>
            Open
          </button>
        </li>
      </ul>
      <Modal
        className="modalWindow"
        isOpen={modalIsOpen}
        // moveSet={moveSet}
        onRequestClose={() => {
          return setModalIsOpen(false);
        }}>
        <CustomModal
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
          moveSet={moveSet}
        />
      </Modal>
    </div>
  );
};

export default PokeCard;
