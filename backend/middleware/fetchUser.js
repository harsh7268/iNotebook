const jwt = require("jsonwebtoken");
const SCRT_KEY = "mynameisharshappearinginbtech"

const fetchUser = async (req,res,next) =>{
    const token = req.header('auth-token');

    if(token){
    const userVerify = jwt.verify(token,SCRT_KEY);
    req.user=userVerify.user;
    next();
    }
    else{
        res.status(401).send({error:'please authenticate using a valid token'})
    }
   
}

module.exports = fetchUser