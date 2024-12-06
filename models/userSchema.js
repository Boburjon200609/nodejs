const {Schema, model, Types} = require("mongoose");
const { Car } = require("./carSchema");

const userSchema = new Schema({
    username: {type: String, required:true, unique:true, trim:true},
    password: {type: String, required:true},
    firstname: {type: String, default:""},
    lastname: {type: String, default:""},
    birthday: {type: String, },
    gender:{type: String, },
    address: {type: String, default:""},
    phone: {type: Number, default:""},
    car_id: {type: Schema.Types.ObjectId, ref:Car },
    // house_id: {type: String},
    // edu_id: {type: String},
});

const User = model("user", userSchema);
module.exports = { User };