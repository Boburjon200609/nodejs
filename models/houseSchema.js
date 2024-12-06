const { Schema, model} = require("mongoose")
const houseSchena = new Schema({
    region: {type: String, required: true},
    city: {type: String, required: true},
    house_number: {type: Number, required: true},
    street: { type: String, required: true},
    family_members: {type: Number, required: true},
    location: {type: String, required: true},
    url: {type: String, required: true},
    urls: {type: String, required: true},
});

const House = model("house", houseSchena);
module.exports = { House };