import React, { useState } from "react";
import Header from "./Header";
import { fetchPokemonDataBySearchInput } from "../util/fetchPokemonData";
import "../styles/pokeAppStyle.css";

function PokeApp() {
  const [pokemonName, setPokemonName] = useState("");

  const handleNameSearch = (e) => {
    const searchBarValue = e.target.value;

    setPokemonName(searchBarValue);
  };

  const getSearchBarDataApi = async () => {
    try {
      // call fetch api function
      const pokemonData = await fetchPokemonDataBySearchInput(pokemonName);

      console.log(pokemonData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pokeApp">
      <Header
        handleNameSearch={handleNameSearch}
        getSearchBarDataApi={getSearchBarDataApi}
      />
    </div>
  );
}

export default PokeApp;
