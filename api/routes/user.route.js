import express from 'express';
import { test, updateUser, deleteUser } from '../controllers/use.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const userRouter = express.Router();
userRouter.get('/test', test);
userRouter.put('/update/:userId', verifyToken, updateUser);
userRouter.delete('/delete/:userId', verifyToken, deleteUser);

export default userRouter;
