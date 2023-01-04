// const express = require('express');
import express from 'express';
import bodyParser from 'body-parser';
// const bodyParser = require('body-parser');
import jwt from 'jsonwebtoken';
// const userRoutes = require('./routes/userRoutes')
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv'

const router = express.Router();
import config from './config.js';
// const tokenList = {};


const app = express();

app.get('/', (req,res) => {
    res.json('Ok');
})
router.post('/token',(req,res)=>{
    const postData = req.body;
    console.log(req.body);
    if(postData.refreshToken && postData.refreshToken in config.tokenList){
        const data = {
            "email":req.body.email,
            "name":req.body.name
        }
        const token = jwt.sign(data,config.tokenSecret,{expiresIn:config.tokenLife})
        const response = {
            "token": token,
        }
        // update the token in the list
        console.log(config.tokenList[postData.refreshToken]);
        console.log(response);
        config.tokenList[postData.refreshToken].token = token
        res.status(200).send(response);  
    }else{
        res.status(401).send("Unauthorized");
    }
})

app.use(bodyParser.json());
app.use('/api/users',userRoutes);
app.use('/api',router);
app.listen(1804,() => console.log(`Server is Running on Port 1804`));