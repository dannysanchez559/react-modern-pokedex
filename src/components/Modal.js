import React from "react";
import PokemonDetails from "./PokemonDetails";

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
              {/* <img src="closeButton.png" /> */}
            </button>
          </div>
        </div>
        <div className="modalDetailsBottom">
          <h1>{props.name}</h1>
        </div>
      </div>
    </>
  );
};
