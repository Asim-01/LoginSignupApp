const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('./UserSchema')
const bcrypt = require('bcryptjs') 
const jwt = require('jsonwebtoken')
//mongo config
const url = 'mongodb+srv://Asim:Asim12@cluster0.ijjmdi1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
app.use(express.json())
mongoose.connect(url).then(() => {
    console.log("Database connected");
}).catch((e) => {
    console.log(e);
})
const User = mongoose.model('UserInfo')
//api for registration
app.post('/register', async (req, res) => {
    const { name, email, phone, speciality, degree, experience, password } = req.body;
    console.log(req.body)
    const oldUser = await User.findOne({ email })
    if (oldUser) {
        return res.send({ data: 'User already exists' })
    }
    // const ecncryptPass = await bcrypt.hash(password,10)
    try {
        await User.create({
            name,
            email,
            phone,
            speciality,
            degree,
            experience,
            password
            // ecncryptPass instead of password use this to store encrypt password
        })
        res.send({ status: 'ok', data: 'User created' })
    } catch (error) {
        res.send({ status: 'error', data: error })
    }

})
const JWT_SECRET = "asim"
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User doesn't exist" });
        }
        if (password !== user.password) {
            return res.status(401).json({ error: "Incorrect password" });
        }
        const token = jwt.sign({ email: user.email }, JWT_SECRET);
        res.status(200).json({ status: 'ok', data: token  });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post("/userdata",async(req,res)=>{
    const {token} = req.body;
    try {
        const user = jwt.verify(token,JWT_SECRET);
        const userEmail = user.email;

        User.findOne({email:userEmail}).then((data)=>{
            return res.send({staus:"Ok",data:data})
        })
    } catch (error) {
        return res.send({error:error})
        
    }

})


app.listen('8000', (req, res) => {
    console.log("nodeJs serer started successfully");
})