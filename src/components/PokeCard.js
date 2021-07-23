import React, { useState, useEffect } from "react";
import { Modal as CustomModal } from "./Modal";
import Modal from "react-modal";

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

  Modal.setAppElement("#root");

  const triggerModalData = () => {
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
        <li>{name}</li>
        <li>{dexNo}</li>
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
        />
      </Modal>
    </div>
  );
};

export default PokeCard;
