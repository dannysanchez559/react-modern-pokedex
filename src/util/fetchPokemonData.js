const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;
const abiliUrl = `https://pokeapi.co/api/v2/ability/?offset=0&limit=327`;
const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/`;

// the following function can accept either pokemon name or Id and search individual pokemon
export const fetchPokemon = async (nameOrId) => {
  try {
    const nameUrl = `${baseUrl}${nameOrId}`;
    return await fetch(nameUrl)
      .then((response) => response.json())
      .then((data) => data);
  } catch (error) {
    console.error(error);
  }
};

// make function for getting flavor text and pokemon color using speciesUrl
export const fetchSpecies = async (nameOrId) => {
  try {
    return await fetch(`${speciesUrl}${nameOrId}`)
      .then((response) => response.json())
      .then((data) => data);
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllPokemons = async () => {
  try {
    return await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`)
      .then((response) => response.json())
      .then((data) => data);
  } catch (error) {
    console.error(error);
  }
};

// fetchAllAbilities for ability filter
export const fetchAllAbilities = async () => {
  try {
    return await fetch(abiliUrl)
      .then((response) => response.json())
      .then((data) => data["results"]);
  } catch (error) {
    console.error(error);
  }
};
