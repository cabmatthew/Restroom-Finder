const mongoose = require("mongoose");

// mongoose schema, has object that defines fields and values 
const CoordinateSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        enum: ["double"],
        required: true,
    },
    longitude: {
        type: Number,
        enum: ["double"],
        required: true,
    },
    description: {
        type: String,
    },
    access: {
        type: String,
    }
});

// creating model out of schema
// takes in name of collection, schema that represents the model
const CoordinateModel = mongoose.model("coordinates", CoordinateSchema)
// export to outside of this file, can make changes to DB outside of this file
module.exports = CoordinateModel;