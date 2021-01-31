const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
    name: String,
    imageUrl: String,
});

module.exports = mongoose.model("card", cardSchema);
