const { Router } = require("express");

const fronted = Router();

const {
    postfronted,
    getfronted,
    postlogin
} = require("../controllers/postfronted.controller");

fronted.post("/register", postfronted); 
fronted.get("/getfronted", getfronted); 
fronted.post("/login", postlogin); 

module.exports = { fronted };
