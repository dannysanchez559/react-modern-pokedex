import React from 'react'

const PokeCard = ({name, dexNo, typeTags, sprite})=>{

    return (<div className="card">
        <ul>
            <li>{name}</li>
            <li>{dexNo}</li>
            <li>
            {typeTags}
            </li>
                <img src={sprite} alt={`${name} sprite`} className="sprite"/>
        </ul>
    </div>)
}

export default PokeCard;