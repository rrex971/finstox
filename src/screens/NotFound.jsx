import React from "react";
import transition from "../transition";

const NotFound = () => {
    return (
        <div className='h-screen text-4xl'>
            <div className="flex flex-col justify-center font-head items-center h-1/2 pt-24 space-y-10">
                <h1 className="text-8xl font-bold text-mercury-200">404</h1>
                <h2 className="text-4xl text-mercury-200">Page Not Found</h2>
            </div>
        </div>
    );
};

export default transition(NotFound);