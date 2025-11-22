import { useState, useCallback } from "react";
import { fetchPokemonDetails } from "../api/pokemonApi";

export const usePokemon = (
  initialUrl = "https://pokeapi.co/api/v2/pokemon?limit=20"
) => {
  const [pokemons, setPokemons] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState(initialUrl);

  const loadPokemons = useCallback(async () => {
    if (!nextUrl || loading) return;
    setLoading(true);
    try {
      const res = await fetch(nextUrl);
      const data = await res.json();

      // Fetch full Pokémon details
      const details = await Promise.all(
        data.results.map((p) => fetchPokemonDetails(p.url))
      );

      setPokemons((prev) => [...prev, ...details]);
      setNextUrl(data.next);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [nextUrl, loading]);

  const filterByName = (query) => {
    setFiltered(
      pokemons.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    );
  };

  return { pokemons, filtered, loading, loadPokemons, filterByName, nextUrl };
};
