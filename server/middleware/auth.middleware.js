import Auth from '../models/Auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const LoginAuth = async (req,res)=>{
    const {email,password} = req.body;
    try{
    const user = await Auth.findOne({email});
    // finding user with email
    if(!user){
        return res.status(400).json({ message: "user not found"});
    }    
    // verifying user credentials (password)
    const isMatching = await bcrypt.compare(password,user.password);
    if(!isMatching){
        return res.status(400).json({ message: "invalid credentials"})
    }
    // generating session token
    const token = jwt.sign({ id : user._id}, process.env.JWT_SECRET,
    {
        expiresIn: '1h',
    });
    res.status(200).json({ 
            success: true, 
            token, 
            user: { id: user._id, name: user.name, email: user.email } 
    });
    return {success:true,message:`hello ${user.name}`};
    }
    catch(error){
        res.status(500).json({message: "internal server error"});
    }
}

const SignupAuth = async (req,res) =>{
    const {name,email,password} = req.body;
    try{
        // checking user already exists
        const existingUser = await Auth.findOne({email});
        if(existingUser){
            return res.status(400).json({ message: "User already exists with this credentials"});
        }
            // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new Auth({
        name,
        email,
        password: hashedPassword,
        });

        await newUser.save();

        // Generating JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
        });
        res.status(200).json({ 
            success: true, 
            message: `Hello ${newUser.name}, signup successful!`,
            token,
            user: { id: newUser._id, name: newUser.name, email: newUser.email }
        });
        
    } 
        catch (error) {
            res.status(500).json({ message: 'Internal server error' });
    }
}

export  {LoginAuth,SignupAuth}