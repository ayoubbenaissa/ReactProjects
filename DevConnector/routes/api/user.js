const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const UserModel = require('../../models/User');
const jwtSecret = config.get('jwtSecret');

// @route: api/users
// @desc: TEST endpoint
// @access: public

router.get('/', (req, res) => {
    res.send('user route ....');
});

// @route: api/users/register || @desc: register user endpoint
router.post('/register/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Please provide a password of more than 6 characters').isLength({ min: 6 }),
], async (req, res) => {
    //validate request content w.r.t the defined rules (for name, email, password):
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    };
    const { name, email, password } = req.body;
    try {
        // test if the email is already used
        let user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ message: 'user already exists' }]});
        }
        const userAvatar = gravatar.url(email, { protocol: 'https', s: '200', r: 'pg', d: 'mm'});
        user = new UserModel({ name, email, avatar: userAvatar, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
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
