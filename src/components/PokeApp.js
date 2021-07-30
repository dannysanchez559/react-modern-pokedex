import React, { useState, useEffect } from "react";
import PokeList from "./PokeList";
import Header from "./Header";
import {
  fetchPokemon,
  fetchAllPokemons,
  fetchSpecies,
} from "../util/fetchPokemonData";
import "../styles/pokeAppStyle.css";
import "../styles/main.scss";

function PokeApp() {
  // Store search bar input value: could be dex number or pokemon name
  const [pokemonName, setPokemonName] = useState("");
  // fetchedData is a single Pokemon object the user searched for
  const [fetchedData, setFetchedData] = useState([]);
  const [allPokemons, setAllPokemon] = useState([]);
  // Hook below is used for conditional rendering 1 Pokemon card user searched, and search on keypress
  const [userDidSearch, setUserDidSearch] = useState(false);
  const [modalData, setModalData] = useState([]);

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
      const data = await fetchAllPokemons();
      // need data["next"] & data["previous"] for pagination
      // loop over results and fetch
      const pokemonObjs = data["results"].map((obj) => {
        const name = obj["name"];
        return fetchPokemon(name);
      });

      Promise.all(pokemonObjs).then((data) => {
        setAllPokemon(data);
        setFetchedData(data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getPokemonModalAboutContent = async (nameOrId) => {
    // fetch call to pokemon-species url in here
    try {
      const data = await fetchSpecies(nameOrId);
      setModalData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // get all data: pagination/scroll, pokemon urls array
    getAllPokemon();
  }, []);

  return (
    <div className="pokeApp">
      <Header
        handleNameSearch={handleNameSearch}
        getSearchBarDataApi={getSearchBarDataApi}
        setUserDidSearch={setUserDidSearch}
        setPokemonName={setPokemonName}
      />

      {fetchedData.length && (
        <PokeList
          fetchedData={fetchedData}
          allPokemons={allPokemons}
          userDidSearch={userDidSearch}
          setUserDidSearch={setUserDidSearch}
          modalData={modalData}
          // pass function to trigger pokemon-species endpoint for onClick in pokecard
          getPokemonModalAboutContent={getPokemonModalAboutContent}
        />
      )}
    </div>
  );
}

export default PokeApp;
