import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import RestaurantsFinder from '../APIs/RestaurantsFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import StarRating from './StarRating';

const RestaurantsList = (props) => {

    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    // browser history:
    let history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantsFinder.get('/');
                setRestaurants(response.data.data.restaurants);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    const handleDelete = async (e, id) => {
        // prevent from propagation the event (click) to parent component which is the table row and which has onclick functionality
        e.stopPropagation();
        try {
            // delete the restaurant:
            const response = await RestaurantsFinder.delete(`/${id}`);
            // update restaurant list & UI:
            setRestaurants(restaurants.filter(restaurant => restaurant.id !== id))
            console.log('deleted restaurant successfully',response)
        } catch (error) {
            console.log('error in deleting restaurant: ', error)
        }
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation();
        history.push(`/restaurants/${id}/update`)
    }

    const handleRestaurantSelect = (id) => {
        history.push(`/restaurants/${id}/detail`)
    }

    const renderRating = (restaurant) => {

        if (!restaurant.count) {
            return (
                <span className="text-warning ml-1">0 reviews</span>
            )
        }
        return (
            <>
            <StarRating rating={restaurant.average_rating} />
            <span className="text-warning ml-1">({restaurant.count})</span>
            </>
        )
    }

    return (
    <div className='list-group'>
        <table className='table table-hover table-dark'>
        <thead>
            <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Reviews</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>
            {restaurants &&
            restaurants.map(restaurant => {
                return (
                <tr
                onClick={() => handleRestaurantSelect(restaurant.id)}
                key={restaurant.id}>
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>{'$'.repeat(restaurant.price_range)}</td>
                <td>{renderRating(restaurant)}</td>
                <td><button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button></td>
                <td><button onClick={(e) => handleDelete(e, restaurant.id)} className='btn btn-danger'>Remove</button></td>
            </tr>
                )
            })}
        </tbody>
        </table>
    </div>)
}

export default RestaurantsList;
