import React, { forwardRef } from "react";
import "./SimpleCard.css";
import { useFavorites } from "../../context/FavoritesContext";
import { TYPE_COLORS } from "../../constants/types";

export const SimpleCard = forwardRef(({ pokemon }, ref) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((p) => p.id === pokemon.id);
  const primaryType = pokemon.types[0]?.type.name || "normal";
  const bgColor = TYPE_COLORS[primaryType];

  return (
    <div
      className="simple_card_container"
      ref={ref}
      onClick={() => toggleFavorite(pokemon)}
    >
      <div className="card_inner">
        {/* Front */}
        <div className="card_front" style={{ backgroundColor: bgColor }}>
          <div className="card_header">
            <span className="poke-id">
              #{pokemon.id.toString().padStart(3, "0")}
            </span>
          </div>
          <div
            className="img-container"
            style={{ backgroundImage: 'url("/Images/Pokeball.svg")' }}
          >
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
          <h3 className="poke-name">{pokemon.name}</h3>
          <div className="types">
            {pokemon.types.map((t) => (
              <span key={t.type.name} className={`type-badge ${t.type.name}`}>
                {t.type.name}
              </span>
            ))}
          </div>
        </div>

        {/* Back */}
        <div className="card_back">
          <h4>Stats</h4>
          <div className="stats">
            {pokemon.stats.map((s) => (
              <div key={s.stat.name} className="stat">
                <div className="stat-name-wrapper">
                  <span className="stat-name">{s.stat.name}</span>
                  <span className="stat-value">{s.base_stat}</span>
                </div>
                <div className="stat-bar">
                  <div
                    className="stat-fill"
                    style={{
                      width: `${s.base_stat > 100 ? 100 : s.base_stat}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className={`fav-btn ${isFavorite ? "active" : ""}`}>
            {isFavorite ? "★" : "☆"}
          </div>
        </div>
      </div>
    </div>
  );
});
