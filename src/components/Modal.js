import React, { useState, useRef, useEffect } from "react";
import PokemonDetails from "./PokemonDetails";
import closeButton from "../img/closeButton.png";
import crySpeaker from "../img/speaker.png";
import speakerOff from "../img/speakerOff.png";
import TabBar from "./TabBar";

export const Modal = ({
  setIsOpen,
  name,
  dexNo,
  sprite,
  typeTags,
  modalData,
  getPokemonModalAboutContent,
  height,
  weight,
  abilities,
}) => {
  const [cryUrlIsValid, setCryUrlIsValid] = useState(true);
  const speakerRef = useRef();
  const speakerButtonRef = useRef();

  // handle cry error
  const handleCryUrlError = () => {
    if (speakerRef.current) speakerRef.current.src = speakerOff;
    if (speakerButtonRef.current) speakerButtonRef.current.disabled = true;
  };

  // url for pokemon cry
  const cryUrl = `https://play.pokemonshowdown.com/audio/cries/${name}.mp3`;
  const cry = new Audio(cryUrl);
  cry.onerror = handleCryUrlError;

  const playPokemonCry = () => {
    cry.play();
  };

  return (
    <>
      <div className="backgroundModalWrapper">
        <div className="modalDetailsTop">
          <div className="dexNo">{dexNo}</div>

          <div className="spriteWrapper">
            <img src={sprite} alt={`${name} sprite`} />
          </div>

          <div className="modalCloseButton">
            <button
              onClick={() => {
                setIsOpen(false);
              }}>
              <img src={closeButton} />
            </button>
          </div>
        </div>
        <div className="modalDetailsBottom">
          <div className="nameContainer">
            <h1 className="modalPokeName">{name}</h1>
            <button onClick={playPokemonCry} ref={speakerButtonRef}>
              <img src={crySpeaker} ref={speakerRef} />
            </button>
            <span>{typeTags}</span>
          </div>

          <TabBar
            modalData={modalData}
            height={height}
            weight={weight}
            abilities={abilities}
          />
        </div>
      </div>
    </>
  );
};
