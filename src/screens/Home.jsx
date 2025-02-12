import React from "react";
import transition from "../transition";
const Home = () => {
    return (<div className="text-mercury-200 font-body text-4xl min-h-screen">
        <div className="text-8xl flex justify-between items-center mx-48 py-48">
            <div className="w-1/2 flex-col font-head space-y-8">
                <div className="font-bold">Trade smart, grow fast.</div>
                <div className="font-extralight font-body text-5xl">Finstox is the leading platform for trading securities.</div>
            </div>
            <img src="grow.svg" className="max-w-96" alt="image" />
        </div>
    </div>);
};

export default transition(Home);
