import React, { useState, useEffect } from "react";
import PokeList from "./PokeList";
import Header from "./Header";
import {
  fetchPokemon,
  fetchAllPokemons,
} from "../util/fetchPokemonData";
import "../styles/pokeAppStyle.css";
import "../styles/main.scss";
import Loader from './Loader';

function PokeApp() {
  // Store search bar input value: could be dex number or pokemon name
  const [pokemonName, setPokemonName] = useState("");
  // fetchedData is a single Pokemon object the user searched for
  const [fetchedData, setFetchedData] = useState([]);
  const [allPokemons, setAllPokemon] = useState([]);
  // Hook below is used for conditional rendering 1 Pokemon card user searched, and search on keypress
  const [userDidSearch, setUserDidSearch] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  // search bar onChange function for searching pokemon & conditional rendering1
  const handleNameSearch = (e) => {
    const searchBarValue = e.target.value;
    setUserDidSearch(true);
    setPokemonName(searchBarValue);
  };

  const getSearchBarDataApi = async () => {
    try {
      // call fetch api function
      const pokemonData = await fetchPokemon(pokemonName);
      if (!pokemonData.length) {
        setFetchedData([pokemonData]);
      } else {
        setFetchedData(pokemonData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllPokemon = async (pokeUrls) => {
    try {
      const pokeList = await fetchAllPokemons();

      // need data["next"] & data["previous"] for pagination
      // loop over results and fetch
      const pokemonObjs = pokeList.map((obj) => {
        const name = obj["name"];
        return fetchPokemon(name);
      });

      Promise.all(pokemonObjs).then((data) => {
        setAllPokemon(data);
        setFetchedData(data);
      }).then(setIsLoading(false));

    } catch (error) {
      console.error(error);
    }
  };


   useEffect(()=>{
     getAllPokemon();
  },[]);

  return (
    <div className="pokeApp">
      <div className="backgroundContainer"></div>
      <Header
        handleNameSearch={handleNameSearch}
        getSearchBarDataApi={getSearchBarDataApi}
        setUserDidSearch={setUserDidSearch}
        setPokemonName={setPokemonName}
      />
      {isLoading === false && fetchedData.length> 0 ? (
        <PokeList
          fetchedData={fetchedData}
          allPokemons={allPokemons}
          userDidSearch={userDidSearch}
          setUserDidSearch={setUserDidSearch}
          isLoading={isLoading}
        />
      ) :
       <Loader/>
      }
    </div>
  );
}

export default PokeApp;
