import React, { useRef } from "react";
import closeButton from "../img/closeButton.png";
import crySpeaker from "../img/speaker.png";
import speakerOff from "../img/speakerOff.png";
import TabBar from "./TabBar";
import getTypeColors from "../util/getTypeColor";

export const Modal = ({
  genera,
  flavorText,
  setIsOpen,
  name,
  dexNo,
  sprite,
  typeTags,
  modalData,
  getPokemonModalAboutContent,
  height,
  weight,
  moveSet,
  abilities,
  stats,
  types,
  isLoading,
}) => {
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

  // get pokemon type name, ex: "grass"
  const pokemonNameType = types[0]["type"].name;

  // get pokemon type color, ex: "grass" = "green"
  const pokemonColor = getTypeColors[pokemonNameType];

  return (
    <>
      <div
        className="backgroundModalWrapper"
        style={{ backgroundColor: pokemonColor }}>
        <div className="modalDetailsTop">
          <div className="dexNo">{dexNo}</div>
          <div className="spriteWrapper">
            <img src={sprite} alt={`${name} sprite`} />
          </div>
          <div className="modalCloseButton">
            {/* close button */}
            <button
              onClick={() => {
                setIsOpen(false);
              }}>
              <img src={closeButton} alt="close modal button" />
            </button>
          </div>
        </div>

        <div className="modalDetailsBottom">
          <div className="nameContainer">
            <div className="nameSpeakerContainer">
              <h1 className="modalPokeName">{name}</h1>
              <button onClick={playPokemonCry} ref={speakerButtonRef}>
                <img src={crySpeaker} ref={speakerRef} alt="speaker" />
              </button>
            </div>
            <span className="type-tag">{typeTags}</span>
          </div>

          <TabBar
            dexNo={dexNo}
            genera={genera}
            flavorText={flavorText}
            modalData={modalData}
            height={height}
            weight={weight}
            abilities={abilities}
            stats={stats}
            types={types}
            moveSet={moveSet}
            pokemonColor={pokemonColor}
          />
        </div>
      </div>
    </>
  );
};
