const express = require('express');
const router = express.Router();
const { addTask, getTasks} = require('../controllers/taskController');
const {authenticate} = require('../middlewares/authMiddleware');

router.post('/',authenticate,addTask);
router.get('/',authenticate, getTasks);

module.exports = router;