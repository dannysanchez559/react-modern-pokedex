import React, { useState, useEffect } from "react";
import PokeCard from "./PokeCard";
import Filter from "./Filter";

const PokeList = ({
  userDidSearch,
  setUserDidSearch,
  fetchedData,
  allPokemons,
}) => {
  const { id, name, sprites, types } = fetchedData;
  const [selectTypeOption, setSelectTypeOption] = useState("");
  const [selectAbilityOption, setSelectAbilityOption] = useState("");
  // abilityOptions: array of sorted ability names for drop-down
  const [abilityOptions, setAbilityOptions] = useState([]);
  // state for sorting toggle
  const [abcSort, setAbcSort] = useState(false);
  const [heightSort, setHeightSort] = useState(false);
  const [weightSort, setWeightSort] = useState(false);
  const [dexNoSort, setDexNoSort] = useState(false);
  // stores filtered Pokemon array returned by sortAndFilter()
  const [filteredPokemons, setFilteredPokemons] = useState([...allPokemons]);
  // Define filter button click toggle handlers
  const abcSortClick = () => {
    setAbcSort(!abcSort);
  };
  const heightSortClick = () => {
    setHeightSort(!heightSort);
  };
  const weightSortClick = () => {
    setWeightSort(!weightSort);
  };
  const dexNoSortClick = () => {
    setDexNoSort(!dexNoSort);
  };
  // generate tags, check for tags and types
  let typeTags, sprite;
  if (types && sprites) {
    sprite = sprites["other"]["official-artwork"]["front_default"];
    typeTags = types.map((obj, i) => {
      return <span key={i}>{obj["type"]["name"]} </span>;
    });
  }
  // array of Pokemon objects sorted by keys: name, weight, height, dex no
  const sortByName = (pokemonList) => {
    return pokemonList.sort((a, b) => {
      const nameA = a["name"];
      const nameB = b["name"];
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  };

  const sortByWeight = (pokemonList) => {
    return pokemonList.sort((a, b) => {
      const weightA = a["weight"];
      const weightB = b["weight"];
      return weightA-weightB;
    });
  };

  const sortByHeight = (pokemonList) => {
    return pokemonList.sort((a, b) => {
      const heightA = a["height"];
      const heightB = b["height"];
      return heightA-heightB;
    });
  };
  const sortByDexNumber = (pokemonList) => {
    return pokemonList.sort((a, b) => {
      const id1 = a["id"];
      const id2 = b["id"];
      return id1-id2;
    });
  };

  //
  const sortAndFilter = () => {
    let allPokemonsFiltered = [...allPokemons];
    if (abcSort) {
      allPokemonsFiltered = sortByName(allPokemonsFiltered);
    }
    if (heightSort) {
      allPokemonsFiltered = sortByHeight(allPokemonsFiltered);
    }
    if (weightSort) {
      allPokemonsFiltered = sortByWeight(allPokemonsFiltered);
    }
    if (dexNoSort) {
      allPokemonsFiltered = sortByDexNumber(allPokemonsFiltered);
    }
    setFilteredPokemons(allPokemonsFiltered);
  };

  useEffect(() => {
    console.log("filteredPokemons",filteredPokemons)
    sortAndFilter();
  }, [abcSort, heightSort,weightSort,dexNoSort]);


  // takes in sorted arrays(by name, height, weight), and returns sorted cards
  const generateSortedCards = () => {
    const sortedCards = filteredPokemons.map((pokeObj) => {
      const { id, name, sprites, types } = pokeObj;
      let typeTags = types.map((obj, i) => {
        return <span key={i}>{obj["type"]["name"]} </span>;
      });
      let sprite = sprites["other"]["official-artwork"]["front_default"];
      return (
        <PokeCard
          dexNo={id}
          name={name}
          sprite={sprite}
          typeTags={typeTags}
          key={id}
        />
      );
    });
    return sortedCards;
  };

  return (
    <div>
      {!userDidSearch ? (
        <div>
          <Filter
            selectTypeOption={selectTypeOption}
            setSelectTypeOption={setSelectTypeOption}
            selectAbilityOption={selectAbilityOption}
            setSelectAbilityOption={setSelectAbilityOption}
            abilityOptions={abilityOptions}
            setAbilityOptions={setAbilityOptions}
            // click handlers
            abcSortClick={abcSortClick}
            heightSortClick={heightSortClick}
            dexNoSortClick={dexNoSortClick}
            weightSortClick={weightSortClick}
          />
          {generateSortedCards()}
        </div>
      ) : fetchedData.length < 1 ? (
        <h1>Please search pokemon.</h1>
      ) : (
        <PokeCard dexNo={id} name={name} sprite={sprite} typeTags={typeTags} />
      )}
    </div>
  );
};
export default PokeList;
