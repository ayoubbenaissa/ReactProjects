import React, { useState } from 'react';

import TinderCard from 'react-tinder-card';

import './Cards.css';

function Cards() {
    
    const [persons, setPersons] = useState([
        {
            name: "Saitama",
            url: "https://i.pinimg.com/originals/87/86/73/878673f78c223afdfe76e62b26bb76d1.png"
        },
        {
            name: "Tanjiro",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVxRfyAFo23Rd65JxPCSf3I2GVnSGe4YNAiQ&usqp=CAU"
        }
    ]);

    const swiped = (direction, nameToDelete) => {
        console.log(' ** removing ** ', nameToDelete)
    };

    const outOfFrame = (name) => {
        console.log(' ** ', name, ' left the screen ** ');
    };

    return (
        <div className="cards">
            <div className="cards__container">
            {persons.map((person, index) => (
                <>
                <TinderCard 
                    className="swipe"
                    key={index}
                    preventSwipe={["up", "down"]}
                    onSwipe={(dir) => swiped(dir, person.name)}
                    onCardLeftScreen={() => outOfFrame(person.name)}
                >
                    <div
                        style={{ backgroundImage: `url(${person.url})` }}
                        className="card"
                    >
                        <h3>{person.name}</h3>
                    </div>
                </TinderCard>
                </>
            ))}
            </div>
        </div>
    )
}

export default Cards;
