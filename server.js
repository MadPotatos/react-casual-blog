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
// USER
app.get("/api/users", async (req, res) => {
    const {email, password} = req.query;
    const users = await User.find(email && password ? {email, password} : {});
    res.send(users);
});
app.get("/api/users/:id", async (req, res)=>{
    const {id} = req.params;
    const user = await User.findOne({id});
    if (user) {
        res.send(user);
    }
    else {
        res.status(404).send({message: "user not found"});
    };
    
});

app.post("/api/users", async (req, res) => {
    if(!req.body.name || !req.body.email || !req.body.password ){
        res.status(400).send({message: "Name, email and password are required"});
        return;
    }
    const user = new User(req.body);
    const createdUser = await user.save();
    res.send(createdUser);
});

app.put("/api/users/:id", async (req, res) => {
    const {id} = req.params;
    const {name, email, password, phone, website} = req.body;
    const user = await User.findOne({id});
    if (user) {
        user.name = name;
        user.email = email;
        user.password = password;
        user.phone = phone;
        user.website = website;
        const updatedUser = await user.save();
        res.send(updatedUser);
    } else {
        res.status(404).send({message: "User not found"});
    }
    
});
//POST
const Post = mongoose.model("posts", new mongoose.Schema({
    id: Number,
    title: String,
    body: String,
    userId: Number,
},{
    timestamps: true,
}

));

app.get("/api/posts", async (req, res) => {
    const {userId} = req.query;
    const posts = await Post.find(userId ? {userId} : {});
    res.send(posts);
});
app.get("/api/posts/:id", async (req, res)=>{
    const {id} = req.params;
    const post = await Post.findOne({id});
    if (post) {
        res.send(post);
    }
    else {
        res.status(404).send({message: "Post not found"});
    };
    
});
app.post("/api/posts", async (req, res) => {
    if(!req.body.title || !req.body.body ){
        res.status(400).send({message: "Title and body are required"});
        return;
    }
    const post = new Post(req.body);
    const createdPost = await post.save();
    res.send(createdPost);
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
    await Post.deleteMany();
    await Post.insertMany([{
        id: 1,
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
        userId: 1,
    },
]);
    res.send({message: "Seed is successful"});
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server started at http://localhost:5000");
});
