const jwt=require("jsonwebtoken");
const { client } = require("../controller/redis");

const auth=async (req,res,next)=>{
    try {
        let token = await client.get('token');
    //console.log(token)
    if(!token){
        return res.status(400).send({"msg":"please login first147"})
    }

    let decoded=jwt.verify(token,"rajesh")
    //console.log(decoded)
    if(!decoded){
        return res.status(400).send({"msg":"something went wrong please login"})
    }
    req.body.userid=decoded.id
    // console.log("auth",req.body.userid)
    
    // console.log(req.body)
    next()
    } catch (error) {
        res.send(error)
    }
}

module.exports={
    auth
}