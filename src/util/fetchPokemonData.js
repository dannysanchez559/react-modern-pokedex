// import
const Pokedex = require("pokeapi-js-wrapper");

const interval = {
  offset: 0,
  limit: 50,
  // Remove line above and uncomment the line below after adding lazy loading
  // limit: 1119
};

const customOptions = {
  protocol: "https",
  // hostName
  versionPath: "/api/v2/",
  cache: true,
  timeout: 5 * 1000, // 5s
  cacheImages: true,
};

const P = new Pokedex.Pokedex(customOptions);

// returns array of all pokemon objects within the interval
export const fetchAllPokemons = async () => {
  try {
    const pokeObjList = await P.getPokemonsList(interval).then(
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
    const speciesObject = await P.getPokemonSpeciesByName(name)
      .then(data => data);
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
