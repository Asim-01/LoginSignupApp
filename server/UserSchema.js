const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    speciality: String,
    degree: String,
    experience: String,
    password: String,
}, { 
    collection: "UserInfo"
});
mongoose.model("UserInfo",Schema)