
import express from 'express';
import userController from '../controller/userController.js';
import { auth } from '../middleware/auth.js';
import { admin } from '../middleware/isAdmin.js';

const router = express.Router();

router.post('/login',userController.login);
router.get('/get-data',auth,admin,userController.getData);

export default router;