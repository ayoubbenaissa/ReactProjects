import React, { useState, useContext } from 'react';

import RestaurantsFinder from '../APIs/RestaurantsFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('Price Range');
    const {addRestaurant} = useContext(RestaurantsContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await RestaurantsFinder.post('/', {
                name,
                location,
                price_range: priceRange
            });
            addRestaurant(response.data.data.restaurant);
            console.log(response);
        } catch (error) {
            console.log('error in adding restaurant!',error);
        }
    }
    return (
    <div className='ab-4'>
        <form action=''>
            <div className='form-row'>
                <div className='col'>
                    <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type='text' className='form-control' placeholder='name'/>
                </div>
                <div className='col'>
                <input
                value={location}
                onChange={e => setLocation(e.target.value)}
                type='text' className='form-control' placeholder='location'/>
                </div>
                <div className='col'>
                    <select
                    value={priceRange}
                    onChange={e => setPriceRange(e.target.value)}
                    className='custom-select my-1 mr-sm-2'>
                        <option disabled>Price Range</option>
                        <option value='1'>$</option>
                        <option value='2'>$$</option>
                        <option value='3'>$$$</option>
                        <option value='4'>$$$$</option>
                        <option value='4'>$$$$$</option>
                    </select>
                </div>
                <button
                type='submit'
                onClick={handleSubmit}
                className='btn btn-primary'>Add Restaurant</button>
            </div>
        </form>
    </div>
    )
}

export default AddRestaurant;
