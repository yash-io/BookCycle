import mongoose from "mongoose";

const ConnectDB = async () =>{

    try{
        const connected  =await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongoose connected: ${connected.connection.host}`)
    }
    catch(error){
        console.log(`error: ${error.message}`);
        process.exit(1);
    }

}

export default ConnectDB;