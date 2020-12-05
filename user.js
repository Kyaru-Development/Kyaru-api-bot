const mongoose = require("mongoose");

const schema = mongoose.Schema({
    userID: String,
    api_key: String,
});

module.exports = mongoose.model("User", schema)
