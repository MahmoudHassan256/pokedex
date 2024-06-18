import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";
import { SimpleCard } from "../components/SimpleCard";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=12"
  );
  const [pokemons, setPokemons] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredPokemons, setFilteredPokemons] = useState();

  const fetchPokemons = async () => {
    try {
      const data = await fetch(url).then((Response) => Response.json());
      const allPokemons = [...pokemons, ...data.results];
      setPokemons(allPokemons);

      if (filtered) {
        applyFilter(searchQuery, allPokemons);
      }
      if (data.next !== "") {
        setUrl(data.next);
      } else {
        setUrl("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPokemons();
  }, []);

  const handelLoadMore = async () => {
    setLoading(true);
    await fetchPokemons();
    setLoading(false);
  };
  const applyFilter = (searchQuery, pokemons) => {
    setFilteredPokemons(
      pokemons.filter((element) =>
        element.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };
  const handelSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      setFiltered(false);
      setFilteredPokemons([]);
    } else {
      applyFilter(searchQuery, pokemons);
      setFiltered(true);
    }
  };
  const handelSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setFiltered(false);
    }
  };
  return (
    <div className="homepageWrapper">
      <form onSubmit={handelSearchSubmit}>
        <input type="text" value={searchQuery} onChange={handelSearch} />
        <button type="submit">Search</button>
      </form>

      <div className="pokemonsContainer">
        {!filtered
          ? pokemons.map((pokemon, key) => (
              <SimpleCard key={pokemon.name} pokemon={pokemon} />
            ))
          : filteredPokemons.map((pokemon, key) => (
              <SimpleCard key={pokemon.name} pokemon={pokemon} />
            ))}
      </div>
      <div className="btnContainer">
        <button
          className={`loadBtn ${loading ? "disabled" : ""}`}
          onClick={handelLoadMore}
        >
          Load More
        </button>
      </div>
    </div>
  );
}
