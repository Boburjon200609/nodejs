const { House } = require("../models/houseSchema");
const { Types } = require("mongoose");





const gethosepatch = async (req, res) => {
    let { id } = req.params;
    const updateData = req.body; 

    id = id.trim();

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid house ID" });
    }
    

    try {
        const updatedHouse = await House.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedHouse) {
            return res.status(404).json({ message: "House not found" });
        }

        return res.status(200).json(updatedHouse);

    } catch (error) {
        console.error("Error updating house:", error.message);
        return res.status(500).json({ message: "Error updating house", error: error.message });
    }
};


const posthouseregister = async (req, res)=>{
    const {region, city, house_number, street, family_members, location, url, urls} = req.body;

    try{
        const existinghouse = await House.findOne({ region });
        if(existinghouse){
            return res.status(400).json({ success: false, message: "house with this region already exists."});
        };


        const newhouse = new House({
            region,
            city,
            house_number,
            street,
            family_members,
            location,
            url,
            urls
        });
    
        await newhouse.save();
        res.status(201).json({ success: true, message: "house created successfully." });
    }catch (error){
        console.error(error);
        res.status(500).json({ success: false, message: "Error creating house", error: error.message });
    }

   

    
}

const gethouse = async (req, res) =>{
    try{
        const houses = await House.find({});
        res.json({ innerData: houses, success: true, message: "houses fetched successfully."});
    }catch (error){
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching houses", error: error.message });
    }
}
 

const gethouseByid = async (req, res) => {
    try {
        const houseId = req.params.id;
        const housess = await House.findById(houseId);

        if (!housess) {  
            return res.status(404).json({ success: false, message: "House not found" });
        }

        res.json({ message: "House found", success: true, House: housess });
    } catch (error) {
        console.log("Error fetching house by ID", error.message);
        res.status(500).json({ message: "Server error" });
    }
}


const gethousedelete = async (req, res) => {
    const { id } = req.params;

    const sanitizedId = id.trim();

    if (!Types.ObjectId.isValid(sanitizedId)) {
        return res.status(400).json({ success: false, message: "ID topilmadi (ID not found)" });
    }

    try {
        const deletedhouss = await House.findByIdAndDelete(sanitizedId);

        if (!deletedhouss) {
            return res.status(404).json({ success: false, message: "Uy topilmadi (House not found)" });
        }

        return res.status(200).json({ success: true, message: "Uy o'chirildi (House deleted successfully)" });
    } catch (error) {
        console.error("Error deleting house:", error);
        return res.status(500).json({ success: false, message: "Serverda xatolik yuzaga keldi (An error occurred on the server)", error: error.message });
    }
};


module.exports ={posthouseregister, gethouseByid,  gethousedelete, gethouse, gethosepatch};
