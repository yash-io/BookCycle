import express from 'express';
import ConnectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import authRouter from './routes/Auth.routes.js';
import materialRouter from './routes/material.routes.js';

dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["https://bookcycle-frontend.onrender.com", "https://localhost:5173"],
    methods: ["GET", "POST", "PUT", "UPDATE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization","Set-Cookie"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

// Auth API Routes
app.use('/api/auth', authRouter);
app.use('/api/materials', materialRouter);

// Serve static files from the React app
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't match one above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  ConnectDB();
  console.log(`Server running on port ${PORT}`);
});