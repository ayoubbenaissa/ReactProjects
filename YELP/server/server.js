require('dotenv').config();
// cors:
const cors = require('cors');
// middleware:
const morgan = require('morgan');
// db pool:
const db = require('./db');
const express = require('express');
const app = express();

app.use(cors());
// middleware:
app.use((req, res ,next) => {
    next();
})

// use express-json middlware:
app.use(express.json());

// get all restaurants:
app.get('/api/v1/restaurants', async(req, res) => {
    try {
        const restaurants =
        await db.
        query('SELECT * FROM restaurants left join (select restaurant_id, COUNT(*), trunc(AVG(rating),2) as average_rating from reviews group by restaurant_id) reviews on restaurants.id=reviews.restaurant_id');

        res.status(200).json({
            status: 'success',
            results: restaurants.rows.length,
            data: {
                restaurants: restaurants.rows,
            }
        });
    } catch(err) {
        console.log('error: ', err);

        res.status(500).json({
            status: 'failure',
            error: err
        })
    }
});

// get a single restaurant:
app.get('/api/v1/restaurants/:id', async (req, res) => {
    try {
        // use parametrized query:
        const results = await db.
        query('SELECT * FROM restaurants left join (select restaurant_id, COUNT(*), trunc(AVG(rating),2) as average_rating from reviews group by restaurant_id) reviews on restaurants.id=reviews.restaurant_id WHERE id= $1',
        [req.params.id]);

        const reviews = await db.query('SELECT * FROM reviews WHERE restaurant_id= $1', [req.params.id]);

        res.status(200).json({
            status: 'success',
            data: {
                restaurant: results.rows[0],
                reviews: reviews.rows
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'failure',
            error: err
        })
    }

});

// create restaurant:
app.post('/api/v1/restaurants', async (req, res) => {
    console.log(req.body);
    try {
        const createdRestaurant =
        await db.query('INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *',
        [req.body.name, req.body.location, req.body.price_range]);

        console.log('createdRestaurant: ', createdRestaurant);
        res.status(200).json({
            status: 'success',
            data: {
                restaurant: createdRestaurant.rows[0],
            }
        });
    } catch (err) {
        console.log('err: ', err);
        res.status(500).json({
            status: 'failure',
            error: err
        })
    }
});

// update a restaurant:
app.put('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const updatedRestaurant = await db.query('UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *',
        [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        console.log('updatedRestaurant: ', updatedRestaurant);

        res.status(200).json({
            status: 'success',
            data: {
                restaurant: updatedRestaurant.rows[0],
            }
        });
    } catch (err) {
        console.log('err: ', err);
        res.status(500).json({
            status: 'failure',
            error: err
        })
    }
});

// add review to a restaurant:
app.post('/api/v1/restaurants/:id/reviews', async(req, res) => {
    try {
        console.log('add review server')
        const newReview = await db.query('INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *;',
        [req.params.id, req.body.name, req.body.review, req.body.rating]);
        console.log(newReview);
        res.status(201).json({
            status: 'success',
            data: {
                review: newReview.rows[0]
            }
        });
    } catch (err) {
        console.log('error in adding review: ', err);
    }
});

// delete a restaurant
app.delete('/api/v1/restaurants/:id', async (req, res) => {
    try {
        deletedRestaurant = await db.query('DELETE FROM restaurants WHERE id = $1', [req.params.id]);

        res.status(200).json({
            status: 'success',
            data: {
                message: 'restaurant deleted successfully !',
            }
        });
    } catch (err) {
        console.log('err: ', err);
        res.status(500).json({
            status: 'failure',
            error: err
        })
    }
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
})