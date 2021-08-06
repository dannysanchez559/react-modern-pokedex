import React, { useState, useEffect} from "react";
import {fetchMove, fetchPokemon} from '../util/fetchPokemonData';
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

const Moves = ({ dexNo }) => {
  const [moveSet, setMoveSet] = useState([]);

  const getMoveset = async (movesArray, n) => {
    const nMoves = [];
    for (let i = 0; i < n; i += 1) {
      const moveUrl = movesArray[i].move.url;
      try {
        const moveData = await fetchMove(moveUrl);
        if (moveData) nMoves.push(moveData);
      } catch (error) {
        console.error(error);
      }
    }
    return nMoves;
  };

  const getMovesByPokemon = async (id) => {
    const pokemon = await fetchPokemon(id);
    try {
      const moves = pokemon.moves;
      const someMoves = await getMoveset(moves, 4);

      setMoveSet(someMoves);
    } catch (error) {
      console.error(error);
    }
  };

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

  useEffect(()=>{
    getMovesByPokemon(dexNo);
    // eslint-disable-next-line
  },[dexNo]);

  const movePower = (accuracy, power, pp) => {
    accuracy = accuracy ? accuracy : 0;
    power = power ? power : 0;
    pp = pp ? pp : 0;
    return [accuracy, power, pp];
  };

  const moveInfo = moveSet.map((moveObj) => {
    const { accuracy, name, power, pp, flavor_text_entries, type } = moveObj;
    const typeName = type.name;
    // returns [accuracy, power, pp] with 0s intead of null values.
    const result = movePower(accuracy, power, pp);

    //get movetype icon
    const typeIcon = imageUrls[`${typeName}`];

    return (
      <React.Fragment key={name} >
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
      </React.Fragment>
    );
  });
  return <div className="moves-panel"> {moveInfo} </div>;
};

export default Moves;
