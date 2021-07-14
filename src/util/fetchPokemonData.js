const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;

// the following function can accept either pokemon name or Id
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


export const fetchAllPokemons = async () => {
  try {
    return await fetch(baseUrl)
      .then((response) => response.json())
      .then(data=>data);
  } catch (error) {
    console.error(error);
  }
};

