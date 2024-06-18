import React from 'react'
import './Modal.css'

export default function Modal({ closeModal, pokedata }) {
    
    let sum = 0;
    pokedata.stats.forEach(element => {
        sum += element.base_stat;
    })
    const sumStats = sum;
    const typeColor={
        normal:   '#A8A77A',
        fire:   '#EE8130',
        water:   '#6390F0',
        electric:   '#F7D02C',
        grass:   '#7AC74C',
        ice:   '#96D9D6',
        fighting:   '#C22E28',
        poison:   '#A33EA1',
        ground:   '#E2BF65',
        flying:   '#A98FF3',
        psychic:   '#F95587',
        bug:   '#A6B91A',
        rock:   '#B6A136',
        ghost:   '#735797',
        dragon:   '#6F35FC',
        dark:   '#705746',
        steel:   '#B7B7CE',
        fairy:   '#D685AD',
    }
    return (
        <div className='modalBackground'>
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button className='exitBtn' onClick={() => { closeModal(false) }}>X</button>
                </div>
                <div className='mordalBody'>
                    <div className="idImg">
                        <div className="numberPoke">#{(pokedata.id).toLocaleString('en-US', {
                            minimumIntegerDigits: 3,
                            useGrouping: false,
                        })}</div>
                        <div className="imgPoke" ><img src={pokedata.sprites.other.dream_world.front_default} alt="" /></div>
                        <div className="namePoke">{pokedata.name}</div>
                        <div className="typePoke">
                            {pokedata.types.map((data, key) =>
                                <button style={{
                                    background:typeColor[data.type.name],
                                }} className='typeBtn' key={key}>{data.type.name}</button>)}
                        </div>
                    </div>
                    <div className="line">
                    </div>

                    <div className="idInfo">
                        <h1 className='descriptionTitle'>Description</h1>
                        <div className="descriptionPoke">
                            <p>A strange seed was planted on its back at birth.The plant sprouts and grows with this POKéMON.</p>
                        </div>
                        <h1 className='statsTitle'>Stats</h1>
                        <div className="statcontainer">
                                {pokedata.stats.map((data, key) =>
                                    <div className="statsPoke" key={key}>{data.stat.name}: {data.base_stat} </div>
                                )}
                                <div className='statsPoke' >Total: {sumStats}</div>

                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
