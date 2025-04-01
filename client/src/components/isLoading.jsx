import React from "react";


const Loading = ({message}) =>{
    return(
        <div className="flex min-h-screen justify-center items-center" >
            <h1 className="text-white text-2xl font-medium font-mono " >
                {message} .....

            </h1>
        </div>
    );
} 

export default Loading;