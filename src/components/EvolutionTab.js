import React, { useState, useEffect } from "react";
import { fetchPokemon } from "../util/fetchPokemonData";
import evolutionArrowImg from "../img/evolution-arrow.png";

const EvolutionTab = ({ evolutionChainUrl, pokemonColor }) => {
  const [evolutionNamesObjects, setEvolutionNamesObjects] = useState([]);
  const [evolutionNameStrings, setEvolutionNameStrings] = useState([]);
  const [spriteUrls, setSpriteUrls] = useState([]);

  // Function to fetch chain object, save to state hook
  const fetchChain = async () => {
    try {
      const chainData = await fetch(evolutionChainUrl)
        .then((response) => response.json())
        .then((data) => data.chain);
      const evolutionNamesList = getEvolutionNames(chainData);
      setEvolutionNamesObjects(evolutionNamesList);
    } catch (error) {
      console.error(error);
    }
  };

  // search through each pokemon object and get all names of evolution into array
  const getEvolutionNames = (chainObj) => {
    let evoChain = [];
    let evoData = chainObj;
    if (chainObj) {
      do {
        let numberOfEvolutions = evoData["evolves_to"].length;
        evoChain.push({
          species_name: evoData.species.name,
        });

        if (numberOfEvolutions > 1) {
          for (let i = 1; i < numberOfEvolutions; i++) {
            evoChain.push({
              species_name: evoData.evolves_to[i].species.name,
            });
          }
        }

        evoData = evoData["evolves_to"][0];
      } while (!!evoData && evoData.hasOwnProperty("evolves_to"));
      return evoChain;
    }
  };

  /**
  @argument evolutionNamesObjects: array of objects with key('species_name') and value - pokemon name string
  1. Map through array(argument) and destructure Pokemon species name from nameObj
  2. Species name is pushed into tempArray, which is then store in state as evolutionNameStrings
 */

  // get name strings of evolutions chain and save to hook for fetching in getImgUrlFromStrings
  const getNameStrings = (namesObjArray) => {
    const nameList = namesObjArray.map((nameObj) => {
      return nameObj.species_name;
    });
    setEvolutionNameStrings(nameList);
  };

  // fetch array of name strings, and return array of promises, then promise.all to get sprites
  const getImgUrlFromStrings = (evolutionNameStrings) => {
    try {
      // array of Promises
      const urlList = evolutionNameStrings.map(async (string) => {

        const data = await fetchPokemon(string);
        if (data) {
          const { name } = data;

          const url = data["sprites"]["other"]["official-artwork"].front_default;
          return {
            name,
            url,
          };
        } else {
          return {
            name: 'Unavailable ',
            url: ''
          }
        }

      }); // end evolutionNameStrings map

      Promise.all(urlList).then((data) => {
        setSpriteUrls(data); // data: array of pokemon objects
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChain();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getNameStrings(evolutionNamesObjects);
  }, [evolutionNamesObjects]);

  useEffect(() => {
    getImgUrlFromStrings(evolutionNameStrings);
  }, [evolutionNameStrings]);

  // map and return an array of sprites of all evolutionary stages; urlObj has pokemon name and sprite url
  const spritesList = spriteUrls.map((urlObj) => (<div key={urlObj.name}>
    <img
      src={urlObj.url}
      alt={`${urlObj.name}sprite`}
      className="evolution-sprites"
    />
    <p className="evo-stage-names">{urlObj.name.toUpperCase()}</p>
  </div>));

  const evolutionImg = (index) => {
    return (
      <img
        key={index}
        className="evolutionImg"
        src={evolutionArrowImg}
        alt="next evolution arrow"></img>
    );
  };

  // return spritesList with evolution arrows added in between each image
  const spritesWithEvolutionArrows = () => {
    const organizedArray = [];

    for (let index = 0; index < spritesList.length; index++) {
      organizedArray.push(spritesList[index]);
      // if sprite is the last in list, then just return sprite without arrow
      if (index !== spritesList.length - 1) {
        organizedArray.push(evolutionImg(index));
      }
    }
    return organizedArray;
  };

  const evolutionWrapper = () => {
    return (
      <div
        style={{
          // custom scrollbar (firefox only)
          scrollbarColor: `${pokemonColor} rgba(235, 232, 232, 0.4)`,
          overflowX: "auto",
          // ** unknown solution for safari and chrome **
        }}
        className={"spriteContainer"}>
        {spritesWithEvolutionArrows()}
      </div>
    )
  }

  return (
    <>
      {spriteUrls ? evolutionWrapper() : <h3 style={{ margin: "50px auto" }}>Loading...</h3>}{" "}

    </>
  );
};

export default EvolutionTab;
