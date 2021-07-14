const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;

export const fetchPokemonDataByName = async (name) => {
  try {
    const nameUrl = `${baseUrl}${name}`;
    return await fetch(nameUrl)
      .then((response) => response.json())
      .then((data) => data);
  } catch (error) {
    console.error(error);
  }
};
