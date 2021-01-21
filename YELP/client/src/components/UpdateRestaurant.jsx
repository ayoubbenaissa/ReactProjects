import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import RestaurantsFinder from '../APIs/RestaurantsFinder';

const UpdateRestaurant = (props) => {
    const {id} = useParams();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('');

    const history = useHistory();

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await RestaurantsFinder.get(`/${id}`);
                const fetchedRestaurant = response.data.data.restaurant;
                console.log('fetchedRestaurant: ', fetchedRestaurant);
                setName(fetchedRestaurant.name);
                setLocation(fetchedRestaurant.location);
                setPriceRange(fetchedRestaurant.price_range);
            } catch (error) {
                console.log('error while fetching restaurant for update');
            }
        }
        fetchData();
    }, [])

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await RestaurantsFinder.put(`/${id}`, {
                name,
                location,
                price_range: priceRange
            });

            // redirect user back to home page:
            history.push('/');
            console.log(response);
        } catch (error) {
            console.log('error in adding restaurant!',error);
        }
    }

    const handleCancel = () => {
        // redirect user back to home page:
        history.push('/');
    }

    return (
    <div className='ab-4'>
        <form action="">
            <div className='form-group'>

                <label htmlFor='name'>Name</label>
                <input
                value={name}
                onChange={e => setName(e.target.value)}
                id='name' className='form-control' type='text'/>

                <label htmlFor='location'>Location</label>
                <input
                value={location}
                onChange={e => setLocation(e.target.value)}
                id='location' className='form-control' type='text'/>

                <label htmlFor='price_range'>Price Range</label>
                <input
                value={priceRange}
                onChange={e => setPriceRange(e.target.value)}
                min='1' max='5'
                id='price_range' className='form-control' type='number'/>
            </div>
            <button
            type='submit'
            onClick={handleUpdate}
            className='btn btn-primary'>Update</button>
            <button
            onClick={handleCancel}
            className='btn btn-danger'
            style={{marginLeft: 20 + 'px'}}
            >Cancel & Return</button>
        </form>
    </div>)
}

export default UpdateRestaurant;