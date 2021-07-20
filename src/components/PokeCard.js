import React, { useState } from "react";
import { Modal as CustomModal } from "./Modal";
import Modal from "react-modal";

const PokeCard = ({ name, dexNo, typeTags, sprite }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  Modal.setAppElement("#root");

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
          <button onClick={() => setModalIsOpen(true)}>Open</button>
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
        />
      </Modal>
    </div>
  );
};

export default PokeCard;
