import React from "react";
import "../Header/Header.css";

function Header({ selected, setSelected, theme, toggleTheme }) {
  return (
    <div className="headerWrapper">
      <img src="Images/HeaderTitle.svg" alt="pokedex" className="logo" />
      <div className="headerButtons">
        <button
          className={`headerButton ${selected === "home" ? "active" : ""}`}
          onClick={() => setSelected("home")}
        >
          Home
        </button>
        <button
          className={`headerButton ${selected === "favorites" ? "active" : ""}`}
          onClick={() => setSelected("favorites")}
        >
          Favorites
        </button>
      </div>
    </div>
  );
}

export default Header;
