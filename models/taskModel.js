const pool = require('../config');

const createTask = async(userId, name, time) => {
    const result = await pool.query(
        'INSERT INTO tasks (user_id, name, time) VALUES ($1, $2, $3) RETURNING *'
        [userId, name, time]
    )
    return result.rows[0]
}

const getTaskByUserId = async (userId)=>{
    const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
    return result.rows;
}

module.exports = {
     createTask,
     getTaskByUserId,
}