import React from "react";
import { Bar } from "react-chartjs-2";

import {
  Bug,
  Dark,
  Dragon,
  Electric,
  Fairy,
  Fighting,
  Fire,
  Flying,
  Ghost,
  Ground,
  Grass,
  Ice,
  Normal,
  Poison,
  Psychic,
  Rock,
  Water,
  Steel,
} from "../img/typeIcons/images";

const Moves = ({ moveSet }) => {
  const imageUrls = {
    bug: Bug,
    dark: Dark,
    dragon: Dragon,
    electric: Electric,
    fairy: Fairy,
    fighting: Fighting,
    fire: Fire,
    flying: Flying,
    ghost: Ghost,
    ground: Ground,
    grass: Grass,
    ice: Ice,
    normal: Normal,
    poison: Poison,
    psychic: Psychic,
    rock: Rock,
    water: Water,
    steel: Steel,
  };
  // function for finding English flavor text; returns a string
  const getEngFlavorText = (texts) => {
    for (let i = 0; i < texts.length; i += 1) {
      const textObj = texts[i];
      if (textObj.language.name === "en") {
        return textObj.flavor_text;
      }
    }
  };

  const movePower = (accuracy, power, pp) => {
    accuracy = accuracy ? accuracy : 0;
    power = power ? power : 0;
    pp = pp ? pp : 0;
    return [accuracy, power, pp];
  };

  const moveInfo = moveSet.map((moveObj) => {
    let { accuracy, name, power, pp, flavor_text_entries, type } = moveObj;
    // call function to loop through flavor_text_entries and find "en"
    const typeName = type.name;
    const result = movePower(accuracy, power, pp);

    //get movetype icon
    const typeIcon = imageUrls[`${typeName}`];

    return (
      <>
        <div className="movesGraphContainer">
          <div className="graphTitleContent">
            <div className="iconTitleContainer">
              <img src={`${typeIcon}`} alt="type icon" />
              <p> {`${name.toUpperCase()}`} </p>{" "}
            </div>
            <p className="moveDescription">
              {" "}
              {getEngFlavorText(flavor_text_entries)}{" "}
            </p>{" "}
          </div>{" "}
          <Bar
            className="movesGraph"
            data={{
              labels: ["Power", "Accuracy", "PP"],
              datasets: [
                {
                  data: [...result],
                  backgroundColor: ["#CE2121", "#419516", "#4986CF"],
                  hoverBackgroundColor: ["#CE2121", "#419516", "#4986CF"],
                  borderRadius: 50,
                  borderSkipped: false,
                  borderWidth: 1,
                  barThickness: 9,
                  minBarLength: 5,
                },
              ],
            }}
            height={100}
            width={100}
            options={{
              layout: {
                padding: {
                  bottom: 100,
                },
              },
              indexAxis: "y",
              elements: {
                bar: {
                  borderWidth: 2,
                },
              },
              responsive: true,
              scales: {
                x: {
                  grid: {
                    display: false,
                    drawBorder: false,
                  },
                  ticks: {
                    display: false,
                    beginAtZero: true,
                  },
                },
                y: {
                  grid: {
                    display: false,
                    drawBorder: false,
                  },
                },
              },
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  enabled: true,
                  backgroundColor: "rgb(0,0,0,0.6",
                  titleColor: "#fff",
                  bodyColor: "#fff",
                  displayColors: false,
                },
              },
            }}
          />{" "}
        </div>{" "}
      </>
    );
  });
  return <div className="moves-panel"> {moveInfo} </div>;
};

export default Moves;
