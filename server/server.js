// filepath: /c:/Users/yaswa/OneDrive/Desktop/main-projects/Bookcycle/server/server.js

import express from 'express';
import ConnectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import authRouter from './routes/Auth.routes.js';
import materialRouter from './routes/material.routes.js'; 
dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["https://localhost:5173"],
    methods: ["GET", "POST", "PUT", "UPDATE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

const PORT = process.env.PORT || 5000;

//auth api Routes
app.use('/api/auth',authRouter);
app.use('/api/materials',materialRouter);

app.get('/', (req, res) => {
  res.send('Welcome to BookCycle API');
});

app.listen(PORT, () => {
  ConnectDB();
  console.log(`Server running on port ${PORT}`);
});