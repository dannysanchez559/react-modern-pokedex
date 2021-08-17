import React, { useState, useEffect } from "react";
import PokeList from "./PokeList";
import Header from "./Header";
import Spinner from "./Spinner";
import { fetchPokemon, fetchPokemons } from "../util/fetchPokemonData";
import "../styles/pokeAppStyle.css";
import "../styles/main.scss";

const PokeApp = () => {
  // Store search bar input value: could be dex number or pokemon name
  const [pokemonName, setPokemonName] = useState("");
  // singlePokemon is a single Pokemon object the user searched for
  const [singlePokemon, setSinglePokemon] = useState(null);
  const [allPokemons, setAllPokemon] = useState([]);
  const [queryParams, setQueryParams] = useState({ offset: 0, limit: 20 });
  // Hook below is used for conditional rendering 1 Pokemon card user searched(Searched component), and search on keypress
  const [userDidSearch, setUserDidSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // search bar onChange function for searching pokemon & conditional rendering
  const handleNameSearch = (e) => {
    const searchBarValue = e.target.value.toLowerCase().trim();
    setPokemonName(searchBarValue);
  };

  // Function for single pokemon fetch(by name or dex number), invoked in Header
  const getSinglePokemon = async (name) => {
    try {
      // call fetch api function
      const pokemonData = await fetchPokemon(name);
      if (pokemonData) {
        setSinglePokemon(pokemonData);
      } else {
        setSinglePokemon(pokemonData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getMorePokemons = async () => {
    try {
      const results = await fetchPokemons(queryParams);
      const pokemonPromises = results.map(async (obj) => {
        const name = obj["name"];
        const pokemonData = await fetchPokemon(name);
        return pokemonData;
      });
      Promise.all(pokemonPromises)
        .then((data) => {
          // make copy previous state, add more pokemon objects, then set state with more data
          setAllPokemon([...allPokemons, ...data]);
        })
        .then(setIsLoading(false));

      setQueryParams({
        offset: queryParams.offset + 20,
        limit: queryParams.limit,
      });
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getMorePokemons();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="pokeApp">
      <div className="backgroundContainer"></div>
      <Header
        pokemonName={pokemonName}
        handleNameSearch={handleNameSearch}
        getSinglePokemon={getSinglePokemon}
        setUserDidSearch={setUserDidSearch}
        setPokemonName={setPokemonName}
      />
      {/* end header */}
      {isLoading === false ? (
        <PokeList
          getMorePokemons={getMorePokemons}
          singlePokemon={singlePokemon}
          allPokemons={allPokemons}
          userDidSearch={userDidSearch}
          setUserDidSearch={setUserDidSearch}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default PokeApp;
