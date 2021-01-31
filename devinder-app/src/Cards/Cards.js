import React, { useState, useEffect } from 'react';

import TinderCard from 'react-tinder-card';
import axios from '../axios';

import './Cards.css';

function Cards() {
    
    const [persons, setPersons] = useState([]);

    const fetchData = async () => {
        const req = await axios.get('/devinder/card');

        setPersons(req.data);
        console.log(' ** TEST persons ** ', req.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const swiped = (direction, nameToDelete) => {
        console.log(' ** removing ** ', nameToDelete)
    };

    const outOfFrame = (name) => {
        console.log(' ** ', name, ' left the screen ** ');
    };

    return (
        <div className="cards">
            <div className="cards__container">
            {persons.map(person => (
                <>
                <TinderCard 
                    className="swipe"
                    key={person._id}
                    preventSwipe={["up", "down"]}
                    onSwipe={(dir) => swiped(dir, person.name)}
                    onCardLeftScreen={() => outOfFrame(person.name)}
                >
                    <div
                        style={{ backgroundImage: `url(${person.imageUrl})` }}
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
