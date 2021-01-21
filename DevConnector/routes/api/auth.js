const express = require('express');
const router = express.Router();
const UserModel = require('../../models/User');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const authMiddleware = require('../../middleware/auth');
const jwtSecret = config.get('jwtSecret');

// @route: api/auth
// @access: public

router.get('/', authMiddleware, async(req, res) => {
    try {
        // get the user WITHOUT the password
        const user = await UserModel.findById(req.user.id).select('-password');

        if (!user) res.status(400).send('user not found !');
        res.json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error!');
    }
});

// @route: api/auth || @desc: rauth user
router.post('/', [
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Password must be not empty').exists(),
], async (req, res) => {
    //validate request content w.r.t the defined rules (for name, email, password):
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    };
    const { email, password } = req.body;
    try {
        // test if the email is already used
        let user = await UserModel.findOne({ email });
        // if user not found => invalid credentials
        if (!user) {
            return res.status(400).json({ errors: [{ message: 'invalid credentials' }]});
        }
        // compare given password and saved password:
        const isMatch = await bcrypt.compare(password, user.password);
        // if passwords dont match => not authenticated
        if (!isMatch) {
            return res.status(400).json({ errors: [{ message: 'invalid credentials' }]});
        }
        const payload = { user: { id: user.id }};

        jwt.sign(payload, jwtSecret, { expiresIn: 7200 }, (err, token) => {
            if (err) throw err;
            return res.send({ token });
        });

    } catch(err) {
        console.error(err.message);
        return res.status(500).send('server error!');
    }
});

module.exports = router;
