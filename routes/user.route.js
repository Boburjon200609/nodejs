const{ Router} = require("express");

const users = Router();


const{
    postRegister,
    getUsers,
    getpatchusers,
    getUsersdelete,
    getUsersById,
} = require("../controllers/uzers.controller")


users.post("/register", postRegister);
users.get("/usersByid/:id", getUsersById)
users.get("/getUsers", getUsers);;
users.get("/getUsers/:id", getUsers);
users.patch("/updateUser/:id", getpatchusers)
users.delete("/deleteUser/:id", getUsersdelete);
module.exports = { users } ;





