const { Userfronted } = require("../models/postSchemafronted");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const postfronted = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        
        const existingfronted = await Userfronted.findOne({ username });

        if (existingfronted) {
            return res.status(400).json({
                success: false,
                message: "Bu foydalanuvchi ro'yxatda bor..."
            });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newfronted = new Userfronted({
            username,
            password: hashedPassword,
            email,
        });

        await newfronted.save();

        
        const token = jwt.sign(
            { userId: newfronted._id, username: newfronted.username }, 
            'your_jwt_secret_key', 
            { expiresIn: '1h' } 
        );

        res.status(201).json({
            success: true,
            message: "Ro'yxatga olindi va tizimga kiring!",
            token: token, 
        });
    } catch (error) {
        console.error("Ro'yxatga olishda muammo yuzaga keldi", error.message);
        res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi"
        });
    }
};

const getfronted = async (req, res) => {
    try {
        const fronteds = await Userfronted.find({});
        res.json({
            success: true,
            message: "Ro'yxatga olingan",
            data: fronteds
        });
    } catch (error) {
        console.error("Ro'yxatni olishda muammo yuzaga keldi", error.message);
        res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi"
        });
    }
};

const postlogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Userfronted.findOne({ username });
        console.log(user);
        

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Foydalanuvchi topilmadi!"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Parol noto'g'ri!"
            });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username }, 
            "secret", 
            { expiresIn: '1h' } 
          );
          

        res.status(200).json({
            success: true,
            message: "Kirish muvaffaqiyatli!",
            token: token, 
        });
    } catch (error) {
        console.error("Kirishda muammo yuzaga keldi", error.message);
        res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi"
        });
    }
};
module.exports = { postfronted, postlogin, getfronted };
