const { User } = require("../models/userSchema");
const { Types } = require("mongoose")
    
const getUsersdelete = async (req, res)=>{
    const { id } = req.params;

    const deleteUsers = id.trim();

    if(!Types.ObjectId.isValid(deleteUsers)){
        return res.status(400).json({message:"uzersni idsi topilmadi"})
    }

    try{
        const deletedUser = await User.findByIdAndDelete(deleteUsers);

        if(!deletedUser){
            return res.status(404).json({message:"User yo'q"})
        }
        return res.status(200).json({message:"User O'chirildi"})
    }catch(error) {
        console.error(error);
        res.status(500).json({message:"o'chirishda muomo yuzaga keldi users", error: error.message});
    }


}

const  getpatchusers =async (req, res) =>{
    let {id} = req.params;
    const updateusers = req.body;
    id = id.trim();

    if(!Types.ObjectId.isValid(id)){
        return res.status(400).json({message:"uzersni idsi topilmadi"})
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(id, updateusers, {new: true});

        if(!updatedUser){
            return res.status(404).json({message:"uzers topilmadi"})
        }
        return res.status(200).json({updatedUser})

    }catch(error){
        console.error(error);
        res.status(500).json({message:" Error updating users", error: error.message});
        
    }
};

const postRegister = async (req, res) => {
    const { username, password, firstname, lastname, birthday, gender, address, phone,car_id } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "bu users royxatda bor."
            });
        }

        const newUser = new User({
            username,
            firstname,
            lastname,
            birthday,
            gender,
            address,
            phone,
            password,
            car_id,
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "foydalanuvchilar royxati olindi."
        });
    } catch (error) {
        console.error("Error royxatga olishda muomo yuzaga keldi:", error.message);
        res.status(500).json({
            success: false,
            message: "serverda xato yuzaga keldi uzers olib bolmadi."
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});  
        res.json({
            success: true,
            message: "Barcha foydalanuvchilar royxati olingan",
            innerData: users,
        });
    } catch (error) {
        console.error("fetch qilishda xato yuzaga keldi:", error);
        res.status(500).json({
            success: false,
            message: "Server error: foydalanuvchini olishda xato yuz berdi."
        });
    }
};

const getUsersById = async (req, res) => {
    try{
        const userid = req.params.id;
        const user = await User.findById(userid).populate("car_id");


        if(!user){
            return res.status(404).json({
                success: false,
                message: "Foydalanuvchi topilmadi."
            });
        }

        res.json({message:"User topilmadi", user});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"serverda xato yuzaga keldi"})
        
    }
};

module.exports = { postRegister, getUsersById, getpatchusers, getUsersdelete,  getUsers };
