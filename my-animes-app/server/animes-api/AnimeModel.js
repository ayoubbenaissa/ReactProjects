const mongoose = require("mongoose");

const AnimeSchema = new mongoose.Schema({
    name: String,
    description: String,
    mainThumbnail: String,
    isFromFavorite: Boolean,
    mainCaracters: [{
        name: String,
        description: String,
        mainThumbnail: String,
    }]
});

const AnimeModel = mongoose.model("anime", AnimeSchema);

module.exports = AnimeModel;
