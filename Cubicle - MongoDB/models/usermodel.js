const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        match:[/^[A-Za-z0-9]+$/,"User name is nod valid"],
        minlength:5
    },
    password:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model("Users",UserSchema)