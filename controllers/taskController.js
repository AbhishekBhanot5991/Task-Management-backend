const {createTask, getTaskByUserId} = require('../models/taskModel');

const addTask = async(req,res)=>{
    const{userId} = req.user;
    const{name, title} =req.body;
    const task = await createTask(userId,name, time);
    res.status(201).json({message:'Task Created Successfully', task});
}

const getTasks = async (req, res) =>{
    const {userId} = req.user;
    const tasks = await getTaskByUserId(userId);
    res.json(tasks);
}

module.exports= {
    addTask,
    getTasks
}