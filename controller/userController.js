import asyncHandler from 'express-async-handler';
import  jwt  from 'jsonwebtoken';
import config from '../config.js';


const login = asyncHandler(async(req,res)=>{
    const {email,password,isAdmin} = req.body;
    if(email && password){
        let data = {
            "email":email,
            "password":password,
            "isAdmin":isAdmin
        }

        let token = jwt.sign(data,config.tokenSecret,{expiresIn:config.tokenLife});
        let refreshToken = jwt.sign(data, config.refreshTokenSecret, {expiresIn:config.refreshTokenLife});
        const response = {
            "status": "Logged in",
            "token": token,
            "refreshToken": refreshToken,
        }
        config.tokenList[refreshToken] = response
        console.log("---------------");
        console.log(config.tokenList);
        console.log("---------------");
        res.status(200).json(response);
    }else{
        res.status(403).send("email and password required");
    }
})
const getData = asyncHandler(async(req,res)=>{
    console.log(req);
    const data = [
        {"name":"Ankit"},
        {"name":"Rana"},
        {"name":"Rashmita"},
        {"name":"Santosini"},
        {"name":"Kalyani"},
        {"name":"Satya"},
    ];
    res.send({
        "user":req.user,
        "data":data
    });
});

export default {login,getData};