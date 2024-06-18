import React from "react";
import "../styles/Header.css";
function Header({selected,setSelected}) {
  return (
    <div className="headerWrapper">
      <img src="Images/HeaderTitle.png" alt="pokedex"/>
      <div className="headerButtons">
        <div
          className={`headerButton ${selected === "home" ? "active" : ""}`}
          onClick={() => setSelected("home")}
        >
          Home
        </div>
        <div
          className={`headerButton ${selected === "favorite" ? "active" : ""}`}
          onClick={() => setSelected("favorite")}
        >
          Favorites
        </div>
      </div>
    </div>
  );
}

export default Header;
