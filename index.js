const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("strictQuery",false);

const {connect} = require("./config/mongodb")
const {userRoutes} = require("./routes/user.routes")
const app = express();

 app.use(cors());
 app.use(express.json());
 app.use(userRoutes);

 app.listen(8080,async() => {
    try{
        await connect;
        console.log("App is connect with mongodb");
    }
    catch(err){
        console.log("App is not connect with mongodb");
        console.log(err);
    }
    console.log("App is listing 8080 port");
})