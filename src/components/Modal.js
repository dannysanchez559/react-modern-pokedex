import React from "react";

export const Modal = (props) => {
  return (
    <>
      <div className="modalContentWrapper">
        <h1>Title</h1>
        <p>Inside the Modal!!</p>

        <button
          onClick={() => {
            props.setIsOpen(false);
          }}>
          Close
        </button>
      </div>
    </>
  );
};
