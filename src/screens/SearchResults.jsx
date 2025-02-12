import React from "react";
import { useSearchParams } from "react-router";
import transition from "../transition";

const SearchResults = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <div className="h-screen text-4xl flex font-body justify-center pt-24">
            <div className="text-mercury-200 bg-woodsmoke-900 rounded-xl w-5/6 flex flex-col py-16 px-16 space-y-16">
                <div className="font-body font-bold pb-4">Search results for "{searchParams.get("q")}"</div>
                <div className="text-2xl">No results :(</div>
            </div>
        </div>
    );
};

export default transition(SearchResults);
