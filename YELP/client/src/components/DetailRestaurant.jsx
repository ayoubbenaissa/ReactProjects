import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import RestaurantsFinder from '../APIs/RestaurantsFinder';
//styling:
import '../styles/DetailRestaurant.scss';
import AddReview from './AddReview';
import Reviews from './Reviews';

const DetailRestaurant = (props) => {
    const {id} = useParams();
    const history = useHistory();

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [restaurantReviews, setRestaurantReviews] = useState('');

    const handleReturn = () => {
        history.push('/');
    }

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await RestaurantsFinder.get(`/${id}`);
                const fetchedRestaurant = response.data.data.restaurant;
                setRestaurantReviews(response.data.data.reviews);
                console.log('fetched reviews: ', response.data.data.reviews);
                setName(fetchedRestaurant.name);
                setLocation(fetchedRestaurant.location);
                setPriceRange(fetchedRestaurant.price_range);
            } catch (error) {
                console.log('error while fetching restaurant for update');
            }
        }
        fetchData();
    }, [])

    return (
    <div>
        <div className="column">
            <div className='form-column'>
                <div className='col'>
                <small>Name: </small>
                <label htmlFor='name' className='label'>{name}</label>
                </div>
                <div className='col'>
                <small>Location: </small>
                <label htmlFor='location' className='label'>{location}</label>
                </div>
                <div className='col'>
                <small>Price Range: </small>
                <label htmlFor='priceRange' className='label'>{priceRange}</label>
                </div>
            </div>
            <div className="mt-3">
                <Reviews reviews={restaurantReviews}/>
            </div>
            <h3>Add Rating:</h3>
            <AddReview />
        </div>
        <button
        className='btn btn-primary'
        onClick={handleReturn}>Back to Home Page</button>
    </div>)
}

export default DetailRestaurant;
