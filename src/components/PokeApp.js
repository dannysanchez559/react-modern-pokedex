import React, { useState, useEffect } from "react";
import PokeList from "./PokeList";
import Header from "./Header";
import {
  fetchPokemon,
  fetchAllPokemons
} from "../util/fetchPokemonData";
import "../styles/pokeAppStyle.css";

function PokeApp() {
  const [pokemonName, setPokemonName] = useState("");
  const [fetchedData, setFetchedData] = useState([]);
  const [allPokemons, setAllPokemon] = useState([]);
  const [userDidSearch, setUserDidSearch] = useState(false);

  const handleNameSearch = (e) => {
    const searchBarValue = e.target.value;
    setUserDidSearch(true)
    setPokemonName(searchBarValue);
  };

  const getSearchBarDataApi = async () => {
    try {
      // call fetch api function
      const pokemonData = await fetchPokemon(pokemonName);
      setFetchedData(pokemonData);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllPokemon = async (pokeUrls)=>{
    try {
      const data = await fetchAllPokemons();
      // need data["next"] & data["previous"]
      // loop over results and fetch
      const pokemonObjs = data["results"].map((obj)=>{
        const name = obj["name"];
        return fetchPokemon(name);
      })

      Promise.all(pokemonObjs).then(data=>setAllPokemon(data));
    } catch(error){
      console.error(error)
    }
  }

  useEffect(() => {
    // get all data: pagination/scroll, pokemon urls array
    getAllPokemon();
  }, []);

  return (
    <div className="pokeApp">
      <Header
        handleNameSearch={handleNameSearch}
        getSearchBarDataApi={getSearchBarDataApi}
      />

      <PokeList
        fetchedData={fetchedData}
        allPokemons={allPokemons}
        userDidSearch={userDidSearch}
        setUserDidSearch={setUserDidSearch}
        />
    </div>
  );
}

export default PokeApp;
