const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('./config');


const authMiddleware = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(404).json({"Msg" : "Check your details"});
    }
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        if(decoded.user_id){
            req.userId = decoded.user_id
            next()
        }else{
            return res.status(403).json({"Msg" : "Invalid user"})
        }
    }catch(e){
        
        res.status(403).json({
            "Msg" : "Invalid User"
        })
    }
}

module.exports = {
    authMiddleware
}