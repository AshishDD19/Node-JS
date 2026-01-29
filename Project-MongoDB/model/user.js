const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type: String,
       
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    gender:{
        type: String,
        required:true
    },
    jobTitle:{
        type: String,
        required:true
    }
},{timestamps:true})  //auto generates created-at and updated-at fields



//model
const User = mongoose.model("user",userSchema); 

module.exports = User