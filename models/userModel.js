const pool = require('../config');

const createUser = async (username, password, email, phoneNumber, profilePicture, role)=>{
    const result = await pool.query(
        'INSERT INTO users (username, password, email, phone_number, profile_picture, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [username, password, email, phoneNumber, profilePicture, role]
    );
    return result.rows[0];
}


const getUserByUsername = async(username)=>{
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
}

const getUsers = async () => {
    const result = await pool.query('SELECT id, username, email, phone_number, profile_picture, role FROM users');
    return result.rows;
}

module.exports = {
    createUser,
    getUserByUsername,
    getUsers,
}