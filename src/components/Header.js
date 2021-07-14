import React from "react";

function Header(props) {
  const onSubmit = () => {
    // invoke api search function in pokeapp
    props.getSearchBarDataApi();
  };

  return (
    <div className="header">
      <img src="logo.svg" alt="pokeball"></img>

      <nav>
        <ul>
          <li>
            <a href="">
              <img src="allPokemonLogo.png" alt="pokeball logo" />
              All Pokemon
            </a>
          </li>

          <li>
            <a href="">
              <img src="topPicksLogo.png" alt="person logo" />
              Top Picks
            </a>
          </li>

          <li>
            <a href="">
              <img src="gamesLogo.png" alt="game logo" />
              Games
            </a>
          </li>
        </ul>

        <div className="searchBarContainer">
          <input
            id="input"
            type="text"
            placeholder="Enter Pokemon Name..."
            onChange={props.handleNameSearch}
          />
          <button className="searchBarButton" onClick={() => onSubmit()}>
            <img src="searchBarLogo.png" alt="searchbar magnifier logo" />
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Header;
