import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import config from "../config.js";
const auth = asyncHandler(async(req,res,next)=>{
    if(req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')){
        // console.log(req.headers.authorization);
        try{
            let token = req.headers.authorization.split(' ')[1];
            console.log(token);
            const decoded = jwt.verify(token,config.tokenSecret);
            console.log(decoded);
            req.user = decoded;
            next();
        }catch(e){
            console.log(e);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }else{
        res.status(401).send("Unauthorized");
    }
})
export {auth}