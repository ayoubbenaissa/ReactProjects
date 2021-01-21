const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const ProfileModel = require('../../models/Profile');
const UserModel = require('../../models/User');
const PostModel = require('../../models/Post');

// @route: api/profile/me
// @access: private

router.get('/me', auth, async (req, res) => {
    try {
        const profile = await ProfileModel.findOne({ user: req.user.id })
                                          .populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ msg: 'there is no profile for this user' });
        }
        return res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).send('server error!');
    }
})

// @route: api/profile
// @desc: create/update user profile
// @access: private

router.post('/',[auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'skills is required').not().isEmpty()
]], async (req, res) => {
    //validate request content w.r.t the defined rules
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    };
    // destruct request body:
    const { company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin } = req.body;

    // build profile object:
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        // skills come in comma-separated format => we will transfor it into an array:
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
        let existantProfile = await ProfileModel.findOne({ user: req.user.id });
        if (existantProfile) {
            // update profile:
            existantProfile = await ProfileModel.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
            console.log('*** UPDATED existantProfile *** ', existantProfile);
            return res.json(existantProfile);
        }
        const newProfile = new ProfileModel(profileFields);
        await newProfile.save();
        return res.json(newProfile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error!');
    }
});

// @route: api/profile => GET all profiles
// @qccess: public
router.get('/', async (req, res) => {
    try {
        const profiles = await ProfileModel.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error!');
    }
});

// @route: api/profile/user/:user_id => GET profile by user_id
router.get('/user/:user_id', async (req, res) => {
    const userId = req.params.user_id;
    try {
        const profile = await ProfileModel.findOne({ user: userId }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found '});
        }
        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found '});
        }
        return res.status(500).send('server error!');
    }
});

// @route: DELETE api/profile => DELETE user & profile & posts (if any)
// @access: Private
router.delete('/', auth, async (req, res) => {
    try {
        // remove user posts:
        await PostModel.deleteMany({ user: req.user.id });

        // remove profile:
        await ProfileModel.findOneAndRemove({ user: req.user.id });
        // remove user:
        await UserModel.findOneAndRemove({ _id: req.user.id });

        return res.json({ msg: 'user removed' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('server error!');
    }
});

// @route: PUT api/profile/experience => ADD experience
// @access: private
router.put('/experience', [auth, [
    check('title', 'title is required').not().isEmpty(),
    check('company', 'company is required').not().isEmpty(),
    check('from', 'from date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, company, from, to, current, description } = req.body;
    const newExp = { title, company, from, to, current, description };
    try {
        const profile = await ProfileModel.findOne({ user: req.user.id });
        // add experience to profile:
        profile.experience.unshift(newExp);
        await profile.save();
        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('server error');
    }
});

// @route: DELETE => delete one experience by id
// @access: private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await ProfileModel.findOne({ user: req.user.id });
        // get index of item to delete:
        const expIndex = profile.experience.map(item => item.id.toString()).indexOf(req.params.exp_id);
        profile.experience.splice(expIndex, 1);
        await profile.save();
        return res.json(profile);
    } catch(err) {
        console.error(err.message);
        return res.status(500).send('server error');
    }
});

// @route: PUT api/profile/experience => ADD education
// @access: private
router.put('/education', [auth, [
    check('school', 'school is required').not().isEmpty(),
    check('degree', 'degree is required').not().isEmpty(),
    check('fieldofstudy', 'field of study date is required').not().isEmpty(),
    check('description', 'description is required').not().isEmpty(),
    check('from', 'from date is required').not().isEmpty()
]], async (req, res) => {
    console.log('req ', req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { school, degree, fieldofstudy, description, from } = req.body;
    const newEducation = { school, degree, fieldofstudy, description, from };
    try {
        const profile = await ProfileModel.findOne({ user: req.user.id });
        // add education to profile:
        profile.education.unshift(newEducation);
        await profile.save();
        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('server error');
    }
});

// @route: DELETE => delete one education by id
// @access: private
router.delete('/education/:ed_id', auth, async (req, res) => {
    try {
        const profile = await ProfileModel.findOne({ user: req.user.id });
        // get index of item to delete:
        const expIndex = profile.education.map(item => item.id.toString()).indexOf(req.params.ed_id);
        profile.education.splice(expIndex, 1);
        await profile.save();
        return res.json(profile);
    } catch(err) {
        console.error(err.message);
        return res.status(500).send('server error');
    }
});


// @route: GET api/profile/github/:username => get user repos from Gitub
// @access: Public
router.get('/github/:username', (req, res) => {
    try {
        const userName = req.params.username;
        console.log('TEST ', userName)
        const githubClientId = config.get('githubClientId');
        const githubSecret = config.get('githubSecret');
        const options = {
            uri: `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubSecret}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        };
        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
                return res.status(500).send('server error');
            }
            // console.log(response)

            if (response.statusCode !== 200) {
                return res.status(400).json({ msg: 'no github profile found' });
            }

            return res.json(JSON.parse(body));
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('server error');
    }
});

module.exports = router;
