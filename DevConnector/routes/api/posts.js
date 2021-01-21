const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const UserModel = require('../../models/User');
const PostModel = require('../../models/Post');
const ProfileModel = require('../../models/Profile');
const auth = require('../../middleware/auth');

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
    '/',
    auth,
    check('text', 'Text is required').not().isEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const user = await UserModel.findById(req.user.id).select('-password');
  
        const newPost = new PostModel({
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id
        });
  
        const post = await newPost.save();
  
        res.json(post);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

// @ route: GET api/posts => get all posts
// @access: private

router.get('/', auth, async (req, res) => {
    try {
        console.log(' ** getPosts ** ');
        // get all posts & sort them by date:
        const posts = await PostModel.find().sort({ date: -1 });
        return res.json(posts);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

// @route: GET api/posts/:post_id

router.get('/:post_id', auth, async (req, res) => {
    try {
        const postId = req.params.post_id;
        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(400).send('no post with this ID');
        }
        return res.json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).send('no post with this ID');
        }
        return res.status(500).send('Server Error');
    }
});

// @route: DELETE api/posts/:post_id

router.delete('/:post_id', auth, async (req, res) => {
    try {
        const postId = req.params.post_id;
        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(400).send('no post with this ID');
        }
        // check if user owns the post:
        if (post.user.toString() !== req.user.id) {
            return res.status(401).send('You can NOT delete a post that is not yours!');
        }
        // remove post if user owns the post:
        await post.remove();
        return res.json({ msg: 'post removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).send('no post with this ID');
        }
        return res.status(500).send('Server Error');
    }
});

// @routes PUT api/posts/like/post_id => ADD likes

router.put('/like/:post_id', auth, async (req, res) => {
    try {
        const postId = req.params.post_id;
        const userId = req.user.id;
        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(500).send('post not found!');
        }
        // see if user already liked the post:
        const userLikedPost = post.likes.filter(like => like.user.toString() == userId).length > 0;
        if (userLikedPost) {
            return res.status(400).json({ msg: 'post already liked!' });
        }
        post.likes.unshift({ user: userId });
        await post.save();
        return res.json(post.likes);
    } catch (err) {
        if (err.kind == 'ObjectId') {
            return res.status(500).send('no post found');
        }
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

// @routes PUT api/unlike/posts/post_id => ADD likes

router.put('/unlike/:post_id', auth, async (req, res) => {
    try {
        const postId = req.params.post_id;
        const userId = req.user.id;
        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(500).send('post not found!');
        }
        // see if user already liked the post:
        const userLikedPost = post.likes.filter(like => like.user.toString() == userId).length == 0;
        if (userLikedPost) {
            return res.status(400).json({ msg: 'post not yet liked!' });
        }
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(userId);
        post.likes.splice(removeIndex, 1);
        await post.save();
        return res.json(post.likes);
    } catch (err) {
        if (err.kind == 'ObjectId') {
            return res.status(500).send('no post found');
        }
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

// @route: POST api/post/comment/post_id

router.post('/comment/:post_id', [auth, [
    check('text', 'comment text can NOT be empty').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    // if we have validation issues => send error response:
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    const { text } = req.body;
    const postId = req.params.post_id;
    try {
        const user = await UserModel.findById(req.user.id).select('-password');
        const post = await PostModel.findById(postId).populate('user', ['name', 'avatar']);
        if (!post) {
            return res.status(500).send('post not found');
        }
        const newComment = { text: text, user: req.user.id, name: user.name, avatar: user.avatar };
        post.comments.unshift(newComment);
        await post.save();
        return res.json(post.comments);
    } catch (err) {
        if (err.kind == 'ObjectId') {
            return res.status(500).send('post not found');
        }
        console.error(err.message);
        return res.status(500).send('server error');
    }
});

// @route DELETE api/post/comment/:post_id/:comment_id

router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
    try {
        const postId = String(req.params.post_id);
        const commentId = String(req.params.comment_id);
        const userId = req.user.id;
        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(500).send('post not found');
        }
        const comment = post.comments.find(comment => comment.id.toString() == commentId);
        if (!comment) {
            return res.status(404).json({ msg: 'comment not found' });
        }
        // only comment owner can delete comment:
        if (comment.user.toString() !== userId) {
            return res.status(401).json({ msg: 'user not authorised' });
        }
        const commentIndex = post.comments.map(comment => comment.id.toString()).indexOf(commentId);
        if (commentIndex < 0) {
            return res.status(404).json({ msg: 'comment not found' });
        }
        post.comments.splice(commentIndex, 1);
        await post.save();
        return res.json(post.comments);
    } catch (err) {
        if (err.kind == 'ObjectId') {
            return res.status(500).send('content not found');
        }
        console.error(err.message);
        return res.status(500).send('server error');
    }
});

module.exports = router;
