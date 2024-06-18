import { useEffect, useState } from "react";
import "../styles/SimpleCard.css"

export const SimpleCard = ({ pokemon }) => {
  
  const [currentPokemon, setPokemon] = useState({
    name: "",
    url: "",
    descriptionURL: "",
    id:"",
    imgURL:""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const API = pokemon.url;
    fetchNewPokemon(API);
  }, []);
  
  const fetchNewPokemon = async (url) => {
    
    try {
        setLoading(true);
      const data = await fetch(url).then(Response=>Response.json())
      console.log(data);
      const new_pokemon = {
        name: data.name,
        url: data.url,
        id: data.id,
        imgURL: data.sprites.front_default,
        type: data.types,
        stats: data.stats,
        descriptionURL: data.species.url,
      };
      setPokemon(new_pokemon);
      setLoading(false);

    } catch (error) {
      console.log("error", error);
    }
  };
  
  return (
      <div className="simple_card">
        <label className="id-num-s">{"#" + currentPokemon.id}</label>
        <div className="img-div-s">
          <img
            className="poke-img-s"
            src={`${loading? "/LoadingSvg.svg": currentPokemon.imgURL}`}
            alt={"pokemon"}
          />
        </div>
        <div className="name-sec">
          <p className="name-s">{currentPokemon.name}</p>
        </div>
      </div>
  );
  
};