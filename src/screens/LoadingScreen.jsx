import React from "react";
import transition from "../transition";

const LoadingScreen = () => {
    return (
            <div className="flex justify-center items-center space-x-10 h-screen font-head font-bold text-4xl text-mercury-200">
                Loading...
            </div>
    )
}

export default transition(LoadingScreen);