import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';


dotenv.config();

mongoose.connect(process.env.DB_HOST_WITH_DRIVER)
    .then(() => {
        console.log(">>> Connected to Mongodb");
    })
    .catch(error => {
        console.log(">>> Cannot connect to database");
    })
    
const app = express();

app.listen(3000, () => {
    console.log(">>> Server is running on port 3000");
});

app.use('/api/user', userRouter);


