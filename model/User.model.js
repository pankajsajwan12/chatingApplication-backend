const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id : {type : Number, required : true},
    email : {type: String, required : true},
    password : {type: String, required: true},
    name : {type : String, required : true},  
})

const UserModel = mongoose.model("User",userSchema)

module.exports = {UserModel}
