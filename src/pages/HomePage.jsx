import React, { useState, useEffect } from "react";
import { SimpleCard } from "../components/SimpleCard/SimpleCard";
import { usePokemon } from "../hooks/usePokemon";
import "../styles/HomePage.css";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { pokemons, filtered, loading, loadPokemons, filterByName, nextUrl } =
    usePokemon();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    filterByName(value);
  };

  const visibleList = searchQuery ? filtered : pokemons;
  useEffect(() => {
    loadPokemons();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="homepageWrapper">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchQuery}
        onChange={handleSearch}
        className="searchInput"
      />

      <div className="pokemonsContainer">
        {visibleList.map((pokemon, key) => (
          <SimpleCard key={key} pokemon={pokemon} />
        ))}
      </div>

      {loading && <p>Loading...</p>}

      {nextUrl && !loading && (
        <button className="loadBtn" onClick={loadPokemons}>
          Load More Pokémon
        </button>
      )}
      {!nextUrl && <p>All Pokémon loaded!</p>}
    </div>
  );
}
