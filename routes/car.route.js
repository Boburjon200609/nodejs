const { Router } = require("express");

const car = Router();

const {
    getCar,
    getCarById,
    postRegister,
    deleteCar,
    patchCar

} = require("../controllers/car.controller");

car.post("/register", postRegister);

car.get("/cars", getCar);

car.get("/cars/:id", getCarById);

car.delete("/cars/:id", deleteCar);
car.patch("/cars/:id", patchCar);  



module.exports = { car };
