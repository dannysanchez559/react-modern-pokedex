import React, { useState, useEffect } from "react";
import { fetchPokemon } from "../util/fetchPokemonData";
import evolutionArrowImg from "../img/evolution-arrow.png";

const EvolutionTab = ({ evolutionChainUrl }) => {
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

  // get name strings of evolutions and save to hook
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
        const { name } = data;

        const url = data["sprites"]["other"]["official-artwork"].front_default;
        return {
          name,
          url,
        };
      });

      Promise.all(urlList).then((data) => {
        setSpriteUrls(data);
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

  const spritesList = spriteUrls.map((urlObj) => (
    <img
      src={urlObj.url}
      alt={`${urlObj.name}sprite`}
      key={urlObj.name}
      className="evolution-sprites"
    />
  ));

  const evolutionImg = () => {
    return (
      <img
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
        organizedArray.push(evolutionImg());
      }
    }
    return organizedArray;
  };

  return <div className="spriteContainer">{spritesWithEvolutionArrows()}</div>;
};

export default EvolutionTab;
