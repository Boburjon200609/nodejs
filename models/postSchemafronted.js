const {Schema, model} = require("mongoose");

const userpostFrontedSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],  
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const Userfronted = model("userfronted", userpostFrontedSchema);
module.exports = { Userfronted };