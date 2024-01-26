// importing express library
const express = require("express");
// var app to represent stuff from express library (routes, middlewares, etc.)
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users')

const cors = require('cors');

// i tried to use POST before adding this line, didn't work
// json parsing automatically
app.use(express.json());
app.use(cors());


// takes in string, represents cluster from mongodb
mongoose.connect("mongodb+srv://cabmatthew:Password@cluster0.f47ibmr.mongodb.net/pedroDB?retryWrites=true&w=majority");

// route that determines what it is
// callback function takes in two functions
// req: get info
// res: send info from front end to back end

app.get("/getUsers", async (req, res) => {
    try {
        // get all users as a list from the MongoDB collection
        // going to use model we created to tell it to find the data requested
        
        // just the find function to get all the entries
        // empty object -> returns all data in the collection
        // Use async/await to wait for the result of UserModel.find()
        const result = await UserModel.find({});

        // Send the result as JSON
        res.json(result);
    } catch (err) {
        // If there was an error, send the error as JSON
        res.json(err);
    }
});

// post: input data

app.post("/createUser", async (req, res) => {
    try {
        // data we want to insert into DB
        // get it from the front end (form)
        // get object (body) from front end, exists in req
        // assume front end will send a body object

        // data to be inserted into DB, retrieved from front end
        const user = req.body
        // insert to DB, pass data into the Model
        const newUser = new UserModel(user)
        // save the data, using await
        await newUser.save();

        // send it back, but won't really be used
        res.json(user);
    } catch (err) {
        res.json(err);
    }
});


// tell api to start
// port number, callback function runs when server starts running
// when server starts up correctly, it'll run the code
app.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});
