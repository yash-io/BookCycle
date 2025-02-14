import mongoose from "mongoose";
//Authentication schema structure
const AuthenticationSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        }
        
    },
    {
        timestamps: true,
    }
);

const Auth = mongoose.model('Auth',AuthenticationSchema);

export default Auth;