import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import config from "../config.js";

const admin = asyncHandler(async(req,res,next)=>{
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            let token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,config.tokenSecret);
            console.log(decoded)
            if(decoded.isAdmin){
                req.user = decoded
                next();
            }else{
                res.status(403).send("you are not admin");
            }
        }catch(e){
            res.status(403).send(e)
        }
    }else{
        res.status(401).send("unauthorized");
    }
})

export {admin}