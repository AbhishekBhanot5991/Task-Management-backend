const express = require('express');
const {getAllUsers} = require('../controllers/userConroller');
const {authenticate, isAdmin} = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/',authenticate, isAdmin,getAllUsers);

module.exports = router;