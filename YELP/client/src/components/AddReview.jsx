import React, { useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';

import RestaurantsFinder from '../APIs/RestaurantsFinder';

const AddReview = () => {

    const { id } = useParams();
    const location = useLocation();
    const history = useHistory();

    const [name, setName] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState('Rating');

    const handleAddReview = async (e) => {
        console.log('handleAddReview');
        e.preventDefault();
        try {
            const response = await RestaurantsFinder.post(`/${id}/reviews`, {
                name,
                review: reviewText,
                rating
            });
            console.log('response add review: ', response);
            history.push('/');
            history.push(location.pathname);
        } catch (error) {
            console.log('error in adding reciew: ', error);
        }
    }

    return (
        <div className="mb-2">
            <form>
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input value={name} id="name" placeholder="Name" type="text" className="form-control"
                               onChange={(e) => setName(e.target.value)}></input>
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select
                        value={rating} id="rating" className="custom-select"
                        onChange={e => setRating(e.target.value)}>
                            <option disabled>Rating</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="Review">Review</label>
                    <textarea value={reviewText} id="Review" cols="30" rows="10" className="form-control"
                              onChange={(e) => setReviewText(e.target.value)}></textarea>
                </div>
                <button
                type="submit"
                onClick={handleAddReview}
                className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default AddReview;