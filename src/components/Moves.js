import React from "react";
import { Bar } from "react-chartjs-2";
// import bug from "../img/typeIcons/bug.png";
// import normal from "../img/typeIcons/normal.png";
// import flying as Flying from '../img/typeIcons/images';
// import solution from stackoverflow
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
  console.log(`normal type check`, typeof Normal);

  const moveInfo = moveSet.map((moveObj) => {
    let { accuracy, name, power, pp, flavor_text_entries, type } = moveObj;
    // call function to loop through flavor_text_entries and find "en"
    const typeName = type.name;

    // if movetype has a null value, return 0
    {
      accuracy = accuracy ? accuracy : 0;
    }
    {
      power = power ? power : 0;
    }
    {
      pp = pp ? pp : 0;
    }
    const typeIcon = imageUrls[`${typeName}`];

    console.log(`typeicon url`, typeIcon);
    return (
      <>
        <div className="movesGraphContainer">
          <div>
            <p>{`${name.toUpperCase()}`}</p>{" "}
            <p>{getEngFlavorText(flavor_text_entries)}</p>
            <img src={`${typeIcon}`} alt="type icon" />
          </div>
          <Bar
            className="movesGraph"
            data={{
              labels: ["Power", "Accuracy", "PP"],
              datasets: [
                {
                  data: [power, accuracy, pp],
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
                // title: {
                //   display: true,
                //   text: name.toUpperCase(),
                //   // getEngFlavorText(flavor_text_entries),
                //   color: "#111",
                //   align: "start",
                //   font: {
                //     size: 18,
                //   },
                // },
                // subtitle: {
                //   display: true,
                //   text: getEngFlavorText(flavor_text_entries),
                //   align: "start",
                //   padding: {
                //     bottom: 15,
                //   },
                //   font: {
                //     size: 14,
                //   },
                // },
                tooltip: {
                  enabled: true,
                  backgroundColor: "rgb(0,0,0,0.6",
                  titleColor: "#fff",
                  bodyColor: "#fff",
                  displayColors: false,
                },
              },
            }}
          />
          {/* <ul key={name}>
        <li>{name.toUpperCase()}</li>
        <li>{type.name}</li>
        <li>{getEngFlavorText(flavor_text_entries)}</li>
        <li>Accuracy: {accuracy}</li>
        <li>Power: {power}</li>
        <li>PP: {pp}</li>
      </ul> */}
        </div>
      </>
    );
  });
  return <div className="moves-panel">{moveInfo}</div>;
};

export default Moves;
