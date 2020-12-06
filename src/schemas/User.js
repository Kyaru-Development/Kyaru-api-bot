const {Schema,model} = require("mongoose");

const schema = Schema({
    userID: String,
    api_key: String,
});

module.exports = model("User", schema)
