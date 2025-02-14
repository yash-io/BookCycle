// filepath: /c:/Users/yaswa/OneDrive/Desktop/main-projects/Bookcycle/server/server.js

import express from 'express';
import ConnectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import authRouter from './routes/Auth.routes.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Allow only your frontend URL
  credentials: true, // Allow cookies, authorization headers
}));
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

const PORT = process.env.PORT || 5000;

//auth api Routes
app.use('/api/auth',authRouter);

app.get('/', (req, res) => {
  res.send('Welcome to BookCycle API');
});

app.listen(PORT, () => {
  ConnectDB();
  console.log(`Server running on port ${PORT}`);
});