var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

const cors = require('cors');

const dbCards = require('./dbCards');

const app = express();
const PORT = process.env.PORT || 8001;

const connectionURL = 'mongodb+srv://ayoub123:ayoub123@cluster0.2639e.mongodb.net/db?retryWrites=true&w=majority';

//MIDDLEWARE:
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());

// DB config:
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => console.log( 'Database Connected' ))
.catch(err => console.log( 'cnx erro :', err ));

app.get('/', (req, res) => {
    res.status(200).send('Hello World !');
});

app.post('/devinder/card', (req, res) => {
    const card = req.body;

    dbCards.create(card, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

app.get('/devinder/card', (req, res) => {

    dbCards.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

app.listen(PORT, () => console.log(`listening on localhost: ${PORT}`));
