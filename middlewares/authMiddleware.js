const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req,res,next) =>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({Message:'Authenticate token required'})
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        res.status(401).json({message: 'Invalid Token'})
    }
}

const isAdmin = (req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(401).json({message:'Admin access required'})
    }
    next();
}

module.exports = {
    authenticate,
    isAdmin
}