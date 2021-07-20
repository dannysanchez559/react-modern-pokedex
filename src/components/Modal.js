import React, { useState, useRef } from "react";
import PokemonDetails from "./PokemonDetails";
import closeButton from "../img/closeButton.png";
import crySpeaker from "../img/speaker.png";
import speakerOff from "../img/speakerOff.png";

export const Modal = (props) => {
  const [cryUrlIsValid, setCryUrlIsValid] = useState(true);
  const speakerRef = useRef();
  const speakerButtonRef = useRef();

  // handle cry error
  const handleCryUrlError = () => {
    if (speakerRef.current) speakerRef.current.src = speakerOff;
    if (speakerButtonRef.current) speakerButtonRef.current.disabled = true;

    console.log(speakerRef);
  };

  // url for pokemon cry
  const cryUrl = `https://play.pokemonshowdown.com/audio/cries/${props.name}.mp3`;
  const cry = new Audio(cryUrl);
  cry.onerror = handleCryUrlError;

  const playPokemonCry = () => {
    cry.play();
  };

  return (
    <>
      <div className="backgroundModalWrapper">
        <div className="modalDetailsTop">
          <div className="dexNo">{props.dexNo}</div>

          <div className="spriteWrapper">
            <img src={props.sprite} alt={`${props.name} sprite`} />
          </div>

          <div className="modalCloseButton">
            <button
              onClick={() => {
                props.setIsOpen(false);
              }}>
              <img src={closeButton} />
            </button>
          </div>
        </div>
        <div className="modalDetailsBottom">
          <div className="nameContainer">
            <h1 className="modalPokeName">{props.name}</h1>
            <button onClick={playPokemonCry} ref={speakerButtonRef}>
              <img src={crySpeaker} ref={speakerRef} />
            </button>
          </div>

          <div className="modalTabBar">
            <ul>
              <li>About</li>
              <li>Base Stats</li>
              <li>Evolution</li>
              <li>Moves</li>
            </ul>
          </div>

          <div className="modalTabContent">
            <p>**Content goes in here **</p>
          </div>
        </div>
      </div>
    </>
  );
};
