import React, { useState } from "react";
import { Modal as CustomModal } from "./Modal";
import Modal from "react-modal";
import { fetchSpecies } from "../util/fetchPokemonData";
import { useSpring, animated } from "react-spring";

const PokeCard = ({
  name,
  dexNo,
  typeTags,
  sprite,
  height,
  weight,
  abilities,
  stats,
  types,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [generaString, setGeneraString] = useState("");
  const [flavorText, setFlavorText] = useState("");
  const [modalData, setModalData] = useState({});

  Modal.setAppElement("#root");

  const getPokemonModalAboutContent = async (nameOrId) => {
    // fetch call to pokemon-species url in here
    try {
      const data = await fetchSpecies(nameOrId);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // takes in array, target key to return, and target language
  const findDescriptionByLanguage = (array, targetKey, lang) => {
    if (array && Array.isArray(array)) {
      const englishObject = array.find((obj) => obj["language"].name === lang);
      // returns English text string
      return englishObject[`${targetKey}`];
    }
  };

  // get modal content: pokemon species info and moveset
  const triggerModalData = async () => {
    const modalContent = await getPokemonModalAboutContent(dexNo);
    // check for undefined modalContent
    if(modalContent){
        const { flavor_text_entries, genera } = modalContent;
        const generaText = findDescriptionByLanguage(genera, "genus", "en");
        const description = findDescriptionByLanguage(
          flavor_text_entries,
          "flavor_text",
          "en"
        );
        setGeneraString(generaText);
        setFlavorText(description);
        setModalData(modalContent);
    } else {
      setGeneraString('Unavailable');
      setFlavorText('Unavailable');
      setModalData({})
    }
  };

  const prepareModal = () => {
    triggerModalData();
    setModalIsOpen(true);
  };

  const modalOpenAnimation = useSpring({
    config: {
      duration: 350,
    },
    opacity: modalIsOpen ? 1 : 0,
    transform: modalIsOpen ? `translateY(0%)` : `translateY(50px)`,
  });

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
          <li className="typeTags">{typeTags}</li>
        </ul>
      </div>
      {/* react modal */}
      <Modal
        onAfterOpen={triggerModalData}
        className="modalWindow"
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
        }}>
        {/* modal content */}
        <animated.div style={modalOpenAnimation}>
          <CustomModal
            genera={generaString}
            flavorText={flavorText}
            setIsOpen={setModalIsOpen}
            name={name}
            dexNo={dexNo}
            sprite={sprite}
            typeTags={typeTags}
            getPokemonModalAboutContent={getPokemonModalAboutContent}
            height={height}
            weight={weight}
            abilities={abilities}
            stats={stats}
            types={types}
            modalData={modalData}
          />
        </animated.div>
      </Modal>
    </>
  );
};

export default PokeCard;
