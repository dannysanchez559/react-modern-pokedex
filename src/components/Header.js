import React from "react";

function Header(props) {
  const onSubmit = () => {
    // invoke api search function in pokeapp
    props.setUserDidSearch(true);
    props.getSearchBarDataApi();
  };
  const enterSubmit = (e) => {
    if (e.key === "Enter") {
      props.getSearchBarDataApi();
    }
  };

  return (
    <div className="header">
      <img src="logo.svg" alt="pokeball" className="logo" />
      <nav>
        <ul className="nav-ul">
          <li className="nav-li">
            <a href="/" className="nav-link">
              <img
                src="allPokemonLogo.png"
                alt="pokeball logo"
                className="nav-icon"
              />
              All Pokemon
            </a>
          </li>
          <li className="nav-li">
            <a href="/" className="nav-link">
              <img
                src="topPicksLogo.png"
                alt="person logo"
                className="nav-icon"
              />
              Top Picks
            </a>
          </li>

          <li className="nav-li">
            <a href="/" className="nav-link">
              <img src="gamesLogo.png" alt="game logo" className="nav-icon" />
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
            onKeyPress={enterSubmit}
            className="searchbar-input"
          />
          <button className="searchBarButton" onClick={() => onSubmit()}>
            <img
              src="searchBarLogo.png"
              alt="searchbar magnifier logo"
              className="search-icon"
            />
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Header;
