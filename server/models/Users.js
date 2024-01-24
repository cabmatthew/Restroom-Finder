const mongoose = require("mongoose");

// mongoose schema, has object that defines fields and values 
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // wants every user to have name, so it's required
    },
    age: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
});

// creating model out of schema
// takes in name of collection, schema that represents the model
const UserModel = mongoose.model("users", UserSchema)
// export to outside of this file, can make changes to DB outside of this file
module.exports = UserModel;