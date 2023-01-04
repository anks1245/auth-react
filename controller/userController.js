import asyncHandler from 'express-async-handler';
import  jwt  from 'jsonwebtoken';
import config from '../config.js';

const tokenList = {};

const login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(email && password){
        let data = {
            "email":email,
            "password":password
        }

        let token = jwt.sign(data,config.tokenSecret,{expiresIn:config.tokenLife});
        let refreshToken = jwt.sign(data, config.refreshTokenSecret, {expiresIn:config.refreshTokenLife});
        const response = {
            "status": "Logged in",
            "token": token,
            "refreshToken": refreshToken,
        }
        tokenList[refreshToken] = response
        res.status(200).json(response);
    }else{
        res.status(403).send("email and password required");
    }
})


export default {login};