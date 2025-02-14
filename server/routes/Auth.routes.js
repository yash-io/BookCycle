import express from "express";
import jwtAuth from "../middleware/jwt.auth.js";
import { LoginAuth, SignupAuth ,LogoutAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/login',LoginAuth);
router.post('/signup',SignupAuth);
router.post('/logout',LogoutAuth);

router.get('/user',jwtAuth,(req,res)=>{
    try{
        res.status(200).json({user:req.user});
    }
    catch{
        res.status(500).json({message:'Internal server error'});
    }

})
export default router;