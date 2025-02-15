import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuthDetails from "../store/auth-details";
const Defaultpage = () => {

    const {user,fetchUser} = useAuthDetails();

    useEffect(()=>{
        fetchUser();    
    },[])   
    const navigate = useNavigate();
    useEffect(()=>{
        if(user){
            navigate('/home');
        }
    },[user,fetchUser]);
    return (
        <div className=" w-full flex items-center justify-center">
            <h1>seems like you are not logged in</h1>
        </div>
    )
};

export default Defaultpage;