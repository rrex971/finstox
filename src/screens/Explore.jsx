import React from "react";
import transition from "../transition";
import ExploreStock from "../components/ExploreStock";
import { Link } from "react-router";

const Explore = () => {
    return (
        <div className="h-screen text-4xl flex justify-center font-body pt-24">
            <div className="text-mercury-200 bg-woodsmoke-900 border-t border-x border-woodsmoke-700 rounded-xl w-5/6 flex flex-col py-16 px-16 space-y-16">
                <div className="font-bold pb-4">Trending Stocks</div>
                <div className="h-1/5 bg-woodsmoke-850">
                    <Link to={"/stock?n=Zomato"}><ExploreStock /></Link>
                </div>
                <div className="w-1/5 h-1/5 bg-woodsmoke-850">
                    Stock 2
                </div>
                <div className="w-1/5 h-1/5 bg-woodsmoke-850">
                    Stock 3
                </div>
                <div className="w-1/5 h-1/5 bg-woodsmoke-850">
                    Stock 4
                </div>
            </div>
        </div>
    )
}

export default transition(Explore);
