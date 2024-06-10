const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const{createUser, getUserByUsername} = require('../models/userModel');
require('dotenv').config();

const register = async (req, res) => {
    const { username, password, email, phoneNumber, profilePicture, role } = req.body;

    // Validate role
    const validRoles = ['user', 'admin'];
    if (!validRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(username, hashedPassword, email, phoneNumber, profilePicture, role);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await getUserByUsername(username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "Login Successful", token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
module.exports = {
    register,
    login
}