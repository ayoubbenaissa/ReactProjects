const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const connectDB = require('./config/db');

const authRouter = require('./routes/api/auth');
const postsRouter = require('./routes/api/posts');
const profileRouter = require('./routes/api/profile');
const usersRouter = require('./routes/api/user');

connectDB();

// cors:
app.use(cors());
// body-parser middleware:
app.use(express.json({ extended: false }));


// define routes:
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/profile', profileRouter);
app.use('/api/users', usersRouter);

// serve static assests in PROD
if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000 ;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
