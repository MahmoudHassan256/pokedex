import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './HomePage.css'
import Modal from './Modal'
import Pokeimg from './Pokeimg.png'


export default function HomePage() {

    const [openModal, setOpenModal] = useState(false);
    const [choosenPoke, updateChoosenPoke] = useState([]);
    const [pokemonArray, updateArray] = useState([]);
    const [toShowArray, updateFilterArray] = useState([]);
    const [url, updateUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
    const [shouldFetch, updateFetchable] = useState('true');
    const [message, setMessage] = useState('');
    const handleChange = event => {setMessage(event.target.value); }
    const handleSubmit = event =>{
        updateFilterArray(pokemonArray)
        updateFilterArray(toShowArray => [...toShowArray.filter(element => (element.name.toLowerCase().includes(message)))])
        setMessage('')
        event.preventDefault();
    }
    const fetchData = async () => {
        try {
            const response = await (await fetch(url)).json();
            updateUrl(response.next);
            const resultarray = response.results;
            resultarray.forEach(element => {
                const getpokedata = async () => {
                    try {
                        const resp = await (await fetch(element.url)).json();
                        updateArray(pokemonArray => [...pokemonArray, resp]);
                        updateFilterArray(toShowArray => [...toShowArray,resp]);
                    }
                    catch (error) {

                    }
                };
                getpokedata();
            });
            updateFetchable(!shouldFetch);
        }
        catch (error) {

        }
    }
    useEffect(() => {
        if (shouldFetch) {
            fetchData();
        };
    });
    return (
        <div className='body'>
            <img className='pokeImg' src={Pokeimg} alt="pokeDex" />
            <form className="searchBar" onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} value={message} />
                <button type='submit' className='searchBtn' >Search</button>
            </form>


            <div className="pokeContainer">
                {toShowArray.map((data, key) =>
                    <div className='pokemon' key={key} onClick={() => {
                        updateChoosenPoke(data);
                        setOpenModal(true);
                    }}>
                        <div className="numberPoke">#{(data.id).toLocaleString('en-US', {
                            minimumIntegerDigits: 3,
                            useGrouping: false,
                        })}</div>
                        <div className="imgPoke"><img src={data.sprites.front_default} alt="Not-Found" /></div>
                        <div className="namePoke">{data.name}</div>
                    </div>
                )}
            </div>
            {openModal && <Modal closeModal={setOpenModal} pokedata={choosenPoke}/>}
            <div className="loadBar">
                <button className='loadBtn' onClick={() => { updateFetchable(!shouldFetch); }} >Load More</button>
            </div>
        </div>
    )
}
