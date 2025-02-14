import express from "express";

import { LoginAuth, SignupAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/login',LoginAuth);
router.post('/signup',SignupAuth);
export default router;