import React from "react";
import PokemonDetails from "./PokemonDetails";
import closeButton from "../img/closeButton.png";
import crySpeaker from "../img/speaker.png";

export const Modal = (props) => {
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
            <button>
              <img src={crySpeaker} />
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
