// use env vars:
require("dotenv").config();

let express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

const cors = require("cors"),
  app = express(),
  PORT = process.env.PORT || 8001,
  connectionURI = process.env.CONNECTION_URI,
  AnimeModel = require("./animes-api/AnimeModel");

// classical middlewares:
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// DB connection & config:
mongoose
  .connect(connectionURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" ** Database connected ** "))
  .catch((err) => console.log(" *** Cnx ERR ** ", err));

/**
 * endpoints should list animes, get specific anime, modify anime, delete anime
 */

app.get("/", (req, res) => {
  res.status(200).send("Hello World !");
});

app.get("/animes", async (req, res) => {
  try {
    const myAnimes = await AnimeModel.find();
    res.json(myAnimes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error!");
  }
});

app.post("/animes", async (req, res) => {
  try {
    let anime = new AnimeModel(req.body);
    await anime.save();
    res.json(anime);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

app.post('/animes/:id', async (req, res) => {
    
});

app.listen(PORT, () => console.log(`listening on localhost: ${PORT}`));
