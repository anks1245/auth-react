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
const tokenList = {};


const app = express();

app.get('/', (req,res) => {
    res.json('Ok');
})


app.use(bodyParser.json());
app.use('/api/users',userRoutes);
app.listen(1804,() => console.log(`Server is Running on Port 1804`));