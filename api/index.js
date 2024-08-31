import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.DB_HOST_WITH_DRIVER)
    .then(() => {
        console.log(">>> Connected to Mongodb");
    })
    .catch(err => {
        console.log(">>> Cannot connect to database");
    })
    
const app = express();
app.use(express.json());
app.use(express.text());
app.use(cookieParser());


app.listen(3000, () => {
    console.log(">>> Server is running on port 3000");
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});




