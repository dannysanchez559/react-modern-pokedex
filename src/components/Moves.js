import React from "react";

const Moves = ({ moveSet }) => {
  // map over moveSet [{}]
  const moveStyles = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap'
  }

  const getEngFlavorText = (texts) => {
    for (let i = 0; i < texts.length; i += 1) {
      const textObj = texts[i];
      if (textObj.language.name === "en") {
        return textObj.flavor_text;
      }
    }
  };

  const moveInfo = moveSet.map((moveObj) => {
    const { accuracy, name, power, pp, flavor_text_entries } = moveObj;
    // call function to loop through flavor_text_entries and find "en"
    return (
      <ul>
        <li>{name.toUpperCase()}</li>
         <li>{getEngFlavorText(flavor_text_entries)}</li>
        <li>Accuracy: {accuracy}</li>
        <li>Power: {power}</li>
        <li>PP: {pp}</li>
      </ul>
    );
  });
  return <div className="moves-panel" style={moveStyles}>{moveInfo}</div>;
};

export default Moves;