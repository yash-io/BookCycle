import React from "react";

const Loading = ({ message }) => {
  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-900 px-4">
      <h1 className="text-white text-3xl font-semibold font-mono select-none flex items-center">
        {message}
        <span className="ml-2">
          <span className="animate-pulse">.</span>
          <span className="animate-pulse delay-200">.</span>
          <span className="animate-pulse delay-400">.</span>
        </span>
      </h1>
    </div>
  );
};

export default Loading;
