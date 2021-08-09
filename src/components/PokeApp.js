import React, { useState, useEffect } from "react";
import PokeList from "./PokeList";
import Header from "./Header";
import {
  fetchPokemon,
  fetchPokemons
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
  const [queryParams, setQueryParams]=useState({offset: 0, limit: 12});
  // Hook below is used for conditional rendering 1 Pokemon card user searched, and search on keypress
  const [userDidSearch, setUserDidSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // search bar onChange function for searching pokemon & conditional rendering
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

  const getMorePokemons = async()=>{
   try {
     const results =  await fetchPokemons(queryParams);

      const pokemonPromises = results.map(async(obj) => {
        const name = obj["name"];
        const pokemonData = await fetchPokemon(name);
        return pokemonData;
      });
      Promise.all(pokemonPromises).then((data) => {
        // make copy previous state, add next 20 pokemon objects, then set state with more data
         setAllPokemon([...allPokemons, ...data]);
         setFetchedData([...allPokemons, ...data]);
      }).then(setIsLoading(false));

     setQueryParams({offset: queryParams.offset + 13, limit: queryParams.limit});
     setIsLoading(false);
   } catch(error) {
     console.error(error);
   }
  }

   useEffect(()=>{
    getMorePokemons();
   // eslint-disable-next-line
   },[]);

  return (
    <div className="pokeApp">
      <Header
        handleNameSearch={handleNameSearch}
        getSearchBarDataApi={getSearchBarDataApi}
        setUserDidSearch={setUserDidSearch}
        setPokemonName={setPokemonName}
      />
      {isLoading === false && fetchedData.length> 0 ? (
        <PokeList
          getMorePokemons={getMorePokemons}
          fetchedData={fetchedData}
          allPokemons={allPokemons}
          userDidSearch={userDidSearch}
          setUserDidSearch={setUserDidSearch}
        />
      ) :
       <Loader/>
      }
    </div>
  );
}

export default PokeApp;
