const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;

// the following function can accept either pokemon name or Id
export const fetchPokemonDataBySearchInput = async (name) => {
  try {
    const nameUrl = `${baseUrl}${name}`;
    return await fetch(nameUrl)
      .then((response) => response.json())
      .then((data) => data);
  } catch (error) {
    console.error(error);
  }
};
