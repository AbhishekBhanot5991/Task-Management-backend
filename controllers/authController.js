const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const{createUser, getUserByUsername} = require('../models/userModel');
require('dotenv').config();

const register =  async (req, res) =>{
    const{username, password, email, phoneNumber, profilePicture} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username,hashedPassword, email, phoneNumber,profilePicture,'user')
    res.status(201).json({message:'User registered successfully', user})
}

const login = async (req, res)=> {
    const {username, password} = req.body;
    const user = await getUserByUsername(username);
    if(!user || !(await bcrypt.compare(password,user.password))){
        return res.status(401).json({message: 'Invalid Credentials'});
    }

    const token = jwt.sign({userId : user.id, role:user.role}, process.env.JWT_SECRET, {expiresIn:'1h'})

    res.status(201).json({message:"Login Successful ", token})
}

module.exports = {
    register,
    login
}