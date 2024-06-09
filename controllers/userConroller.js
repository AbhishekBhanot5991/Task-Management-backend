const{getUsers} = require('../models/userModel');

const getAllUsers = async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (error) {
        // Handle errors appropriately
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports = {
    getAllUsers,
}