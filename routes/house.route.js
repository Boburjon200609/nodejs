const {  Router } = require("express");

const house = Router();


const {
    gethosepatch,
    gethouse,
    gethousedelete,
    gethouseByid,
    posthouseregister,
    
} = require("../controllers/house.controller");

house.post("/register", posthouseregister);
house.get('/gethouse', gethouse);
house.delete('/deletehouse/:id', gethousedelete);
house.get('/gethousebyid/:id', gethouseByid);
house.patch('/patchhouse/:id', gethosepatch);

module.exports = { house } ;