const { Car } = require("../models/carSchema");
const { Types } = require("mongoose");

const patchCar = async (req, res) => {
    let { id } = req.params;
    const updateData = req.body;

    id = id.trim();

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "id topilmadi" });
    }

    try {
        const updatedCar = await Car.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedCar) {
            return res.status(404).json({ message: "Car malumot topilmadi" });
        }

        return res.status(200).json(updatedCar);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "yangilanishda xato yuzaga keldi", error: error.message });
    }
};

const postRegister = async (req, res) => {
    const { title, model, description, color, horsePower, carType, weight, price, url } = req.body;

    try {
        const existingCar = await Car.findOne({ title });

        if (existingCar) {
            return res.status(400).json({
                success: false,
                message: "bu foydalanuvchi royxatda bor."
            });
        }

        const newCar = new Car({
            title,
            model,
            description,
            color,
            horsePower,
            carType,
            weight,
            price,
            url,
        });

        await newCar.save();

        res.status(201).json({
            success: true,
            message: "Car foydalanuvchilar royxati olindi."
        });
    } catch (error) {
        console.error("royhatga olishda muomo yuzaga keldi:", error.message);
        res.status(500).json({
            success: false,
            message: "Server bilan ulanishda muomo yuzaga keldi."
        });
    }
};

const getCar = async (req, res) => {
    try {
        const cars = await Car.find({});
        res.json({
            success: true,
            message: "All cars royhatga olindi.",
            innerData: cars,
        });
    } catch (error) {
        console.error("fetch qilishda muomo yuzaga keldi:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error: Unable to fetch cars."
        });
    }
};

const getCarById = async (req, res) => {
    try {
        const carId = req.params.id;
        const carDetails = await Car.findById(carId);

        if (!carDetails) {
            return res.status(404).json({
                success: false,
                message: "Car topilmadi."
            });
        }

        res.json({
            success: true,
            message: "Car topilmadi.",
            car: carDetails
        });
    } catch (error) {
        console.error("Error fetching  ID topilmadi:", error.message);
        res.status(500).json({ message: "serverda ulanishda muomo bor" });
    }
};

const deleteCar = async (req, res) => {
    const { id } = req.params;

    const sanitizedId = id.trim();

    if (!Types.ObjectId.isValid(sanitizedId)) {
        return res.status(400).json({ success: false, message: "id topilmadi fetching" });
    }

    try {
        const deletedCar = await Car.findByIdAndDelete(sanitizedId);

        if (!deletedCar) {
            return res.status(404).json({ success: false, message: "Car topilmadi " });
        }

        return res.status(200).json({ success: true, message: "Car o'chirish yakulandi" });
    } catch (error) {
        console.error("Error deleting car:", error);
        return res.status(500).json({ success: false, message: "Server o'chirishda serverda xatolik yuzaga keldi", error: error.message });
    }
};



module.exports = { postRegister, getCarById, patchCar, getCar, deleteCar };
