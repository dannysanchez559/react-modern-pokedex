// import wrapper
const Pokedex = require("pokeapi-js-wrapper");

const customOptions = {
  protocol: "https",
  versionPath: "/api/v2/",
  cache: true,
  timeout: 10 * 1000, // 5s
  cacheImages: true,
};

const P = new Pokedex.Pokedex(customOptions); // initialization

export const fetchPokemons = async (queryParams) => {
  try {
    const pokeObjList = await P.getPokemonsList(queryParams).then(
      (data) => data.results
    );
    return pokeObjList;
  } catch (error) {
    console.error(error);
  }
};

// arg: string; returns pokemon object
export const fetchPokemon = async (name) => {
  try {
    const pokeObject = await P.getPokemonByName(name).then((data) => data);
    return pokeObject;
  } catch (error) {
    console.error(error);
  }
};

/**
Arg: string
make function for getting flavor text and pokemon color using speciesUrl
 */
export const fetchSpecies = async (name) => {
  try {
    const speciesObject = await P.getPokemonSpeciesByName(name).then(
      (data) => data
    );
    return speciesObject;
  } catch (error) {
    console.error(error);
  }
};

// fetchAllAbilities for ability filter
export const fetchAllAbilities = async () => {
  try {
    const abilitiesList = await P.getAbilitiesList({
      offset: 0,
      limit: 327,
    }).then((data) => data.results);

    return abilitiesList;
  } catch (error) {
    console.error(error);
  }
};

// Will map through pokemon.moves array in PokeCard
//fetchMove arg: each url of pokemon object.moves(array)
export const fetchMove = async (moveUrl) => {
  try {
    return await fetch(moveUrl)
      .then((response) => response.json())
      .then((data) => data);
  } catch (error) {
    console.error(error);
  }
};
