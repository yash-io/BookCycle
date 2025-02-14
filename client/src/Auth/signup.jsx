import React from "react";
import { useState } from "react";
import useAuthDetails from "../store/auth-details";

const SignUpPage = () =>{
    const [details,setDetails] = useState({
            name:'',
            email:'',
            password:''
        });
        const {createUser} = useAuthDetails();
        const handleDetails = (e) =>{
          setDetails({...details, [e.target.name]: e.target.value});

        };

        const handleSignUp = async () =>{
          console.log(details);
          
          const data = await createUser(details.email,details.name,details.password);
          if(data.success){
            console.log(data.message);
          }
          else{
            console.log(data.message);
          }
        }


    return(
        <div className=" flex justify-center items-center min-h-screen bg-gray-800">
            <div className="sm:w-1/3 w-full mx-4 border-2 border-white p-8 rounded-sm bg-white shadow-lg">
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-xl font-mono"> UserName</label>
                <input 
                  type="text" 
                  name="name"
                  value={details.name}
                  onChange={handleDetails} 
                  className="bg-white rounded-xl shadow-lg p-4 overflow-hidden transform transition duration-300 hover:scale-105 w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-xl font-mono"> Email address</label>
                <input 
                  type="email" 
                  name="email"
                  value={details.email}
                  onChange={handleDetails} 
                  className="bg-white rounded-xl shadow-lg p-4 overflow-hidden transform transition duration-300 hover:scale-105 w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-2 text-xl font-mono"> Password</label>
                <input 
                  type="password" 
                  name="password"
                  value={details.password}
                  onChange={handleDetails} 
                  className="bg-white rounded-xl shadow-lg p-4 overflow-hidden transform transition duration-300 hover:scale-105 w-full" />
              </div>
                <div className="flex justify-center">
                <button 
                onClick={handleSignUp}
                className=" justify-center px-4 py-2 mt-4 bg-blue-400 text-white text-lg font-medium rounded-md overflow-hidden transform transition duration-300 hover:scale-105">signup</button>
                </div>
            </div>           
        </div>
    );
}

export default SignUpPage;