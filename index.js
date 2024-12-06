const express = require("express");
const cors = require("cors");
require("dotenv").config();  // .env faylini yuklash
const { connect } = require("mongoose");


const app = express();

app.use(express.json());  
app.use(cors());  

async function ConnectToDB() {
    try {
        await connect(process.env.MONGODB_URL); 
        console.log("MongoDB ulandi");
    } catch (err) {
        console.error("MongoDB ulanishda xatolik yuz berdi:", err);
    }
}

ConnectToDB();  

const { users } = require("./routes/user.route");  
app.use("/users", users);  

const { car } = require("./routes/car.route");  
app.use("/car", car); 
app.use(express.json());
app.use(cors());

const { house } = require("./routes/house.route");  
app.use('/house', house); 

const { fronted } = require("./routes/postfronted.router");  
app.use("/fronted", fronted);  
app.use(cors());


const PORT = process.env.PORT || 5000;  

app.listen(PORT, () => {
    console.log(`Server ishlayapti: http://localhost:${PORT}`);
});
