import express from 'express';
import { DefaultDeserializer } from 'v8';
import { test } from '../controllers/user,controller.js';

const userRouter = express.Router();
userRouter.get('/test', test)

export default userRouter;
