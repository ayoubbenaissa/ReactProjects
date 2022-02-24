let express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

const cors = require('cors'),
      app = express(),
      const PORT = process.env.PORT || 8001;

/**
 * endpoints should list animes, get specific anime, modify anime, delete anime
 */

app.get('/', (req, res) => {
    res.status(200).send('Hello World !');
});

app.listen(PORT, () => console.log(`listening on localhost: ${PORT}`));
