import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import { SimpleCard } from "../components/SimpleCard/SimpleCard";
import "../styles/HomePage.css";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="homepageWrapper">
      <h2>Favorites</h2>
      <div className="pokemonsContainer">
        {favorites.length ? (
          favorites.map((pokemon) => <SimpleCard key={pokemon.id} pokemon={pokemon} />)
        ) : (
          <p>No favorites yet!</p>
        )}
      </div>
    </div>
  );
}
