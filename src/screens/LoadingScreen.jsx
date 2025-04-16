import React from "react";
import transition from "../transition";
import { NinetyRingWithBg } from "react-svg-spinners";

const LoadingScreen = () => {
    return (
            <div className="flex justify-center items-center pb-48 space-x-10 min-h-screen font-head font-bold text-4xl text-mercury-200">
                <NinetyRingWithBg width="100" height="100" color="#FFFFFF" />
            </div>
    )
}

export default transition(LoadingScreen);