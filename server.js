import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
   
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error connecting to MongoDB:", error);
});
const User = mongoose.model("User", new mongoose.Schema({
   id: Number,
    name: String,
    email: String,
    password: String,
    phone: String,
    website: String,
}));

app.get("/api/users", async (req, res) => {
    const {email, password} = req.query;
    const users = await User.find(email && password ? {email, password} : {});
    res.send(users);
});

app.get("/api/seed", async (req, res) => {
    await User.deleteMany();
    await User.insertMany([{
        id: 1,
        name: "Leanne Graham",
        email: "Sincere@april.biz",
        password: "123",
        phone: "1-770-736-8031 x56442",
        website: "https://mywebsite.com"
    }, 

    ]);
    res.send({message: "Seed is successful"});
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server started at http://localhost:5000");
});
