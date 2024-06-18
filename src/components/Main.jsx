import React from "react";
import HomePage from "../pages/HomePage";

function Main({ selected }) {
  return (
    <div>{selected === "home" ? <HomePage/> : <div>Favorites</div>}</div>
  );
}

export default Main;
