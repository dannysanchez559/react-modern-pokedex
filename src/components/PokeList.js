import React, { useState, useEffect } from "react";
import PokeCard from "./PokeCard";
import FilterBar from "./FilterBar";
import getTypeColors from "../util/getTypeColor";
import "../styles/pokeAppStyle.css";
import SortTypes from "../util/SortTypes";
import Searched from "./Searched";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

const PokeList = ({
  userDidSearch,
  setUserDidSearch,
  singlePokemon,
  allPokemons,
  getMorePokemons,
}) => {
  const [selectTypeOption, setSelectTypeOption] = useState("");
  const [selectAbilityOption, setSelectAbilityOption] = useState("");
  // abilityOptions: array of sorted ability names for drop-down
  const [abilityOptions, setAbilityOptions] = useState([]);
  // Set sort type; by default, sort by Dex number
  const [sortType, setSortType] = useState(SortTypes.DEX_NO);
  const [filterType, setFilterType] = useState(null);
  // stores sorted/FilterBared Pokemon array returned by sortAndFilter() in useEffect
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [userDidSort, setUserDidSort] = useState(false);
  // Boolean for checking if user wants reverse sorted results
  const [reverse, setReverse] = useState(false);

  // called when
  const updateFilterType = (filter) => {
    setFilterType(filter);
    setUserDidSort(true);
  };

  // reverse sorting
  const setSortTypeFlags = (newSortFlag) => {
    if (newSortFlag === sortType) {
      setReverse(!reverse);
    } else {
      setSortType(newSortFlag);
      setReverse(false);
    }
    setUserDidSort(true);
  };

  // Filter for pokemon by selected type, returns pokemon obj that has type
  const filteredByType = (pokemonList, selectedType) => {
    return pokemonList.filter((pokemon) => {
      for (const typeObj of pokemon.types) {
        if (typeObj.type.name === selectedType) return true;
      }
      return false;
    });
  };

  const filteredByAbil = (pokemonList, selectedAbility) => {
    return pokemonList.filter((pokemon) => {
      for (const abiliObj of pokemon.abilities) {
        if (abiliObj.ability.name === selectedAbility) return true;
      }
      return false;
    });
  };
  // arrays of Pokemon objects sorted by keys: name, weight, height, dex no
  const sortByName = (pokemonList) => {
    return pokemonList.sort((a, b) => {
      const nameA = a["name"];
      const nameB = b["name"];
      if (nameA < nameB) return reverse ? 1 : -1;
      if (nameA > nameB) return reverse ? -1 : 1;
      return 0;
    });
  };

  const sortByWeight = (pokemonList) => {
    return pokemonList.sort((a, b) => {
      const weightA = a["weight"];
      const weightB = b["weight"];
      return reverse ? weightB - weightA : weightA - weightB;
    });
  };

  const sortByHeight = (pokemonList) => {
    return pokemonList.sort((a, b) => {
      const heightA = a["height"];
      const heightB = b["height"];
      return reverse ? heightB - heightA : heightA - heightB;
    });
  };

  const sortByDexNumber = (pokemonList) => {
    return pokemonList.sort((a, b) => {
      const id1 = a["id"];
      const id2 = b["id"];
      return reverse ? id2 - id1 : id1 - id2;
    });
  };

  // Makes copy of allPokemons array, determines sort type, and calls filterByType pokemons array to state variable
  const sortTypeCheck = () => {
    let allPokemonsFiltered = [...allPokemons];

    if (selectTypeOption !== "") {
      allPokemonsFiltered = filteredByType(
        allPokemonsFiltered,
        selectTypeOption
      );
    }
    if (selectAbilityOption !== "") {
      allPokemonsFiltered = filteredByAbil(
        allPokemonsFiltered,
        selectAbilityOption
      );
    }

    switch (sortType) {
      case SortTypes.DEX_NO:
        allPokemonsFiltered = sortByDexNumber(allPokemonsFiltered);
        break;
      case SortTypes.ABC:
        allPokemonsFiltered = sortByName(allPokemonsFiltered);
        break;
      case SortTypes.HEIGHT:
        allPokemonsFiltered = sortByHeight(allPokemonsFiltered);
        break;
      case SortTypes.WEIGHT:
        allPokemonsFiltered = sortByWeight(allPokemonsFiltered);
        break;
      default:
        console.error(`Invalid sort type: ${sortType}`);
    }

    setFilteredPokemons(allPokemonsFiltered);
  };

  useEffect(() => {
    sortTypeCheck();
    // eslint-disable-next-line
  }, [sortType, filterType, reverse, selectTypeOption, selectAbilityOption]);

  const capitalizeType = (typeString) => {
    const capitalize = typeString[0].toUpperCase() + typeString.slice(1);
    return capitalize;
  };

  // create list of all PokeCards
  const generateSortedCards = (pokemonList) => {
    return pokemonList.map((pokeObj) => {
      const { id, name, sprites, types, stats, abilities, height, weight } =
        pokeObj;
      // make type tags for card
      const typeTags = types.map((typeObj, i) => {
        const typeName = typeObj["type"]["name"];

        return (
          <span
            className="type-tag"
            style={{
              backgroundColor: getTypeColors[typeName],
            }}
            key={i}>
            {capitalizeType(typeName)}
          </span>
        );
      });
      const sprite = sprites["other"]["official-artwork"]["front_default"];
      // return PokeCards for home page
      return (
        <PokeCard
          dexNo={id}
          key={id}
          name={name}
          sprite={sprite}
          typeTags={typeTags}
          height={height}
          weight={weight}
          abilities={abilities}
          stats={stats}
          types={types}
        />
      );
    });
  };

  return (
    <div className="pokeList">
      {!userDidSearch ? (
        !allPokemons.length && !filteredPokemons.length ? null : (
          <>
            <FilterBar
              selectTypeOption={selectTypeOption}
              setSelectTypeOption={setSelectTypeOption}
              selectAbilityOption={selectAbilityOption}
              setSelectAbilityOption={setSelectAbilityOption}
              abilityOptions={abilityOptions}
              setAbilityOptions={setAbilityOptions}
              setSortType={setSortTypeFlags}
              setFilterType={updateFilterType}
            />
            {/* end Filter */}
            <InfiniteScroll
              className="card-container"
              dataLength={
                userDidSort ? filteredPokemons.length : allPokemons.length
              }
              hasMore={true}
              scrollThreshold={0.8}
              next={getMorePokemons}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }>
              {/* By default, display all Pokemon cards, else show  FilterBared/sorted cards. */}
              {generateSortedCards(
                userDidSort ? filteredPokemons : allPokemons
              )}
            </InfiniteScroll>
          </>
        ) // end react fragment
      ) : // show single user search
      singlePokemon ? (
        <Searched
          singlePokemon={singlePokemon}
          capitalizeType={capitalizeType}
          userDidSearch={userDidSearch}
        />
      ) : (
        <div style={{ textAlign: "center" }}>
          <h3>Unavailable. Please search valid pokemon.</h3>
        </div>
      )}
    </div>
  );
};
export default PokeList;
