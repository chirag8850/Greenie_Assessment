const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: String,
    surname: String,
    username: String,
    email: String,
    password: String,
    phoneNumber: Number
},
{timestamps:true}
)

const UserModel = mongoose.model("users",UserSchema)

module.exports=UserModel